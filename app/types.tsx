// types.ts
export interface Movie {
    id: number;
    title: string;
    poster_path: string | null;
  }
  
export interface MoviesFormData {
    favoriteMovies: Movie[];
  }

export interface MusicItem {
    id: string;
    name: string;
    images?: { url: string }[];
    album?: { images: { url: string }[] };
  }
  
export interface MusicFormData {
    favoriteTracks: MusicItem[];
    favoriteAlbums: MusicItem[];
    favoriteArtists: MusicItem[];
  }

export interface TVShow {
    id: number;
    name: string;
    poster_path: string | null;
  }
  
export interface TVFormData {
    favoriteTVShows: TVShow[];
  }
  
