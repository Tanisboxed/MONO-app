import OpenAI from 'openai';
import { spotifyService } from './spotifyApi';
import { OPENAI_API_KEY } from '../constants/ApiKeys';

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});
interface RecommendationInput {
  userId: string;
  timeRange?: 'short_term' | 'medium_term' | 'long_term';
  limit?: number;
}

interface TrackInfo {
  name: string;
  artist: string;
  id: string;
}

class RecommendationService {
  private async getUserTopTracks({ userId, timeRange = 'medium_term', limit = 10 }: RecommendationInput): Promise<TrackInfo[]> {
    const topTracks = await spotifyService.getUserTopTracks(timeRange, limit);
    return topTracks.map(track => ({
      name: track.name,
      artist: track.artists[0].name,
      id: track.id
    }));
  }
  private async getUserTopArtists({ userId, timeRange = 'medium_term', limit = 5 }: RecommendationInput): Promise<string[]> {
    const topArtists = await spotifyService.getUserTopArtists(timeRange, limit);
    return topArtists.map(artist => artist.name);
  }
  private async generateLLMRecommendations(topTracks: TrackInfo[], topArtists: string[]): Promise<string[]> {
    const prompt = `Based on the user's top tracks:
${topTracks.map(track => `- ${track.name} by ${track.artist}`).join('\n')}

And top artists:
${topArtists.join(', ')}

each object has 'name' and 'artist' properties. `;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0613",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 500
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("No recommendations generated");
    }

    try {
      return JSON.parse(content);
    } catch (error) {
      console.error("Error parsing LLM response:", error);
      throw new Error("Invalid recommendation format received");
    }
  }

  private async fetchSpotifyTracks(recommendations: { name: string; artist: string }[]): Promise<TrackInfo[]> {
    const spotifyTracks: TrackInfo[] = [];

    for (const rec of recommendations) {
      try {
        const searchResults = await spotifyService.searchTracks(`track:${rec.name} artist:${rec.artist}`, 1);
        if (searchResults && searchResults.length > 0) {
          spotifyTracks.push({
            name: searchResults[0].name,
            artist: searchResults[0].artists[0].name,
            id: searchResults[0].id
          });
        }
      } catch (error) {
        console.error(`Error fetching Spotify track for ${rec.name} by ${rec.artist}:`, error);
      }
    }

    return spotifyTracks;
  }

  async getPersonalizedRecommendations(input: RecommendationInput): Promise<TrackInfo[]> {
    try {
      const [topTracks, topArtists] = await Promise.all([
        this.getUserTopTracks(input),
        this.getUserTopArtists(input)
      ]);

      const llmRecommendations = await this.generateLLMRecommendations(topTracks, topArtists);
      const spotifyTracks = await this.fetchSpotifyTracks(llmRecommendations);

      return spotifyTracks;
    } catch (error) {
      console.error("Error in getPersonalizedRecommendations:", error);
      throw error;
    }
  }

  async createRecommendationPlaylist(userId: string, recommendations: TrackInfo[]): Promise<string> {
    try {
      const playlist = await spotifyService.createPlaylist(userId, "Mono Personalized Recommendations", "Personalized recommendations generated by Mono");
      const trackUris = recommendations.map(track => `spotify:track:${track.id}`);
      await spotifyService.addTracksToPlaylist(playlist.id, trackUris);
      return playlist.id;
    } catch (error) {
      console.error("Error creating recommendation playlist:", error);
      throw error;
    }
  }
}

export const recommendationService = new RecommendationService();
