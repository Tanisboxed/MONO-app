import { useState, useEffect } from 'react';
import { recommendationService } from '../services/recommendationService';
import { TrackInfo } from '../types'; 

interface UseRecommendationsProps {
  userId: string;
  timeRange?: 'short_term' | 'medium_term' | 'long_term';
  limit?: number;
}

export const useRecommendations = ({ userId, timeRange = 'medium_term', limit = 10 }: UseRecommendationsProps) => {
  const [recommendations, setRecommendations] = useState<TrackInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        setError(null);
        const recs = await recommendationService.getPersonalizedRecommendations({ userId, timeRange, limit });
        setRecommendations(recs);
      } catch (err) {
        setError('Failed to fetch recommendations. Please try again later.');
        console.error('Error fetching recommendations:', err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchRecommendations();
    }
  }, [userId, timeRange, limit]);

  const refreshRecommendations = () => {
    setLoading(true);
    setError(null);
    recommendationService.getPersonalizedRecommendations({ userId, timeRange, limit })
      .then(recs => {
        setRecommendations(recs);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to refresh recommendations. Please try again later.');
        console.error('Error refreshing recommendations:', err);
        setLoading(false);
      });
  };

  const createPlaylist = async () => {
    try {
      setLoading(true);
      const playlistId = await recommendationService.createRecommendationPlaylist(userId, recommendations);
      setLoading(false);
      return playlistId;
    } catch (err) {
      setError('Failed to create playlist. Please try again later.');
      console.error('Error creating playlist:', err);
      setLoading(false);
      throw err;
    }
  };

  return { recommendations, loading, error, refreshRecommendations, createPlaylist };
};
