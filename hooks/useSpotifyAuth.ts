import { useState, useEffect } from 'react';
import { spotifyService } from '../services/spotifyApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
}

export const useSpotifyAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authState, setAuthState] = useState<AuthState>({
    accessToken: null,
    refreshToken: null,
    expiresAt: null,
  });

  useEffect(() => {
    loadAuthState();
  }, []);

  const loadAuthState = async () => {
    try {
      const storedAuthState = await AsyncStorage.getItem('spotifyAuthState');
      if (storedAuthState) {
        const parsedAuthState: AuthState = JSON.parse(storedAuthState);
        setAuthState(parsedAuthState);
        setIsAuthenticated(!!parsedAuthState.accessToken);
        
        if (parsedAuthState.expiresAt && parsedAuthState.expiresAt < Date.now()) {
          refreshAccessToken();
        }
      }
    } catch (error) {
      console.error('Error loading auth state:', error);
    }
  };

  const saveAuthState = async (state: AuthState) => {
    try {
      await AsyncStorage.setItem('spotifyAuthState', JSON.stringify(state));
    } catch (error) {
      console.error('Error saving auth state:', error);
    }
  };

  const login = async () => {
    try {
      const authUrl = spotifyService.getAuthorizationUrl();
      console.log('Open this URL to login:', authUrl);
    } catch (error) {
      console.error('Error initiating login:', error);
    }
  };

  const handleAuthCallback = async (code: string) => {
    try {
      const { accessToken, refreshToken, expiresIn } = await spotifyService.authenticateUser(code);
      const expiresAt = Date.now() + expiresIn * 1000;
      const newAuthState = { accessToken, refreshToken, expiresAt };
      setAuthState(newAuthState);
      setIsAuthenticated(true);
      saveAuthState(newAuthState);
      spotifyService.setAccessToken(accessToken);
    } catch (error) {
      console.error('Error handling auth callback:', error);
    }
  };

  const refreshAccessToken = async () => {
    if (!authState.refreshToken) {
      console.error('No refresh token available');
      return;
    }

    try {
      const { accessToken, expiresIn } = await spotifyService.refreshAccessToken(authState.refreshToken);
      const expiresAt = Date.now() + expiresIn * 1000;
      const newAuthState = { ...authState, accessToken, expiresAt };
      setAuthState(newAuthState);
      setIsAuthenticated(true);
      saveAuthState(newAuthState);
      spotifyService.setAccessToken(accessToken);
    } catch (error) {
      console.error('Error refreshing access token:', error);
      setIsAuthenticated(false);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('spotifyAuthState');
      setAuthState({ accessToken: null, refreshToken: null, expiresAt: null });
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return {
    isAuthenticated,
    login,
    handleAuthCallback,
    logout,
    accessToken: authState.accessToken,
  };
};
