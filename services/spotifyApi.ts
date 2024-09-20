import SpotifyWebApi from 'spotify-web-api-node';
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT_URI } from '../constants/ApiKeys';

class SpotifyService {
  private api: SpotifyWebApi;

  constructor() {
    this.api = new SpotifyWebApi({
      clientId: SPOTIFY_CLIENT_ID,
      clientSecret: SPOTIFY_CLIENT_SECRET,
      redirectUri: SPOTIFY_REDIRECT_URI,
    });
  }

  getAuthorizationUrl() {
    const scopes = ['user-read-private', 'user-read-email', 'user-top-read', 'playlist-modify-public', 'playlist-modify-private'];
    return this.api.createAuthorizeURL(scopes, 'state');
  }

  async authenticateUser(code: string) {
    const data = await this.api.authorizationCodeGrant(code);
    this.api.setAccessToken(data.body['access_token']);
    this.api.setRefreshToken(data.body['refresh_token']);
    return {
      accessToken: data.body['access_token'],
      refreshToken: data.body['refresh_token'],
      expiresIn: data.body['expires_in'],
    };
  }

  async refreshAccessToken(refreshToken: string) {
    this.api.setRefreshToken(refreshToken);
    const data = await this.api.refreshAccessToken();
    this.api.setAccessToken(data.body['access_token']);
    return {
      accessToken: data.body['access_token'],
      expiresIn: data.body['expires_in'],
    };
  }

  setAccessToken(accessToken: string) {
    this.api.setAccessToken(accessToken);
  }
  async getCurrentUserProfile() {
    const response = await this.api.getMe();
    return response.body;
  }

  async getUserTopTracks(timeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term', limit: number = 20) {
    const response = await this.api.getMyTopTracks({ time_range: timeRange, limit });
    return response.body.items;
  }

  async getUserTopArtists(timeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term', limit: number = 20) {
    const response = await this.api.getMyTopArtists({ time_range: timeRange, limit });
    return response.body.items;
  }
  #searching on onboarding
  async searchTracks(query: string, limit: number = 20) {   
    const response = await this.api.searchTracks(query, { limit });
    return response.body.tracks?.items;
  }

  async searchArtists(query: string, limit: number = 20) {
    const response = await this.api.searchArtists(query, { limit });
    return response.body.artists?.items;
  }

  async searchPlaylists(query: string, limit: number = 20) {
    const response = await this.api.searchPlaylists(query, { limit });
    return response.body.playlists?.items;
  }

  async getTrack(trackId: string) {
    const response = await this.api.getTrack(trackId);
    return response.body;
  }

  async getAudioFeaturesForTrack(trackId: string) {
    const response = await this.api.getAudioFeaturesForTrack(trackId);
    return response.body;
  }
  
  async getArtist(artistId: string) {
    const response = await this.api.getArtist(artistId);
    return response.body;
  }

  async getArtistTopTracks(artistId: string, country: string = 'US') {
    const response = await this.api.getArtistTopTracks(artistId, country);
    return response.body.tracks;
  }

  async getUserPlaylists(limit: number = 50) {
    const response = await this.api.getUserPlaylists({ limit });
    return response.body.items;
  }

  async getPlaylist(playlistId: string) {
    const response = await this.api.getPlaylist(playlistId);
    return response.body;
  }

  async createPlaylist(userId: string, name: string, description: string = '', isPublic: boolean = true) {
    const response = await this.api.createPlaylist(userId, {
      name,
      description,
      public: isPublic,
    });
    return response.body;
  }

  async addTracksToPlaylist(playlistId: string, trackUris: string[]) {
    const response = await this.api.addTracksToPlaylist(playlistId, trackUris);
    return response.body;
  }

  async removeTracksFromPlaylist(playlistId: string, trackUris: string[]) {
    const response = await this.api.removeTracksFromPlaylist(playlistId, trackUris);
    return response.body;
  }
  
  async getRecommendations(seedTracks: string[], seedArtists: string[], seedGenres: string[], limit: number = 20) {
    const response = await this.api.getRecommendations({
      seed_tracks: seedTracks,
      seed_artists: seedArtists,
      seed_genres: seedGenres,
      limit,
    });
    return response.body.tracks;
  }

  async callApi(apiMethod: () => Promise<any>) {
    try {
      return await apiMethod();
    } catch (error) {
      console.error('Spotify API Error:', error);
      if (error.statusCode === 401) {
        throw new Error('Token expired');
      }
      throw error;
    }
  }
}

export const spotifyService = new SpotifyService();
