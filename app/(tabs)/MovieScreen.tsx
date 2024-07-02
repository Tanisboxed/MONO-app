// app/screens/MovieScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
}

interface FormData {
  favoriteMovies: Movie[];
  favoriteSongs: any[];
  favoriteArtists: any[];
}

const MovieScreen: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    favoriteMovies: [],
    favoriteSongs: [],
    favoriteArtists: [],
  });

  const navigation = useNavigation();

  const [movieInput, setMovieInput] = useState<string>('');
  const [movieSuggestions, setMovieSuggestions] = useState<Movie[]>([]);

  const handleAddMovie = (movie: Movie) => {
    if (
      formData.favoriteMovies.length < 5 &&
      !formData.favoriteMovies.find((m) => m.id === movie.id)
    ) {
      setFormData({
        ...formData,
        favoriteMovies: [...formData.favoriteMovies, movie],
      });
      setMovieInput('');
    }
  };

  const getMovies = async () => {
    try {
      let apiUrl = `http://localhost:4000/search/movies?query=${movieInput}&type=movie`;
      const response = await fetch(apiUrl);
      const json = await response.json();
      const top5Movies: Movie[] = json.results.slice(0, 5);
      setMovieSuggestions(top5Movies);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (movieInput.length > 0) {
      getMovies();
    }
  }, [movieInput]);

  const renderMovieSuggestions = () => {
    return (
      <View style={styles.suggestionsContainer}>
        {movieSuggestions
          .filter((movie) => movie.title.toLowerCase().includes(movieInput.toLowerCase()) && movie.poster_path !== null)
          .map((suggestion, index) => (
            <TouchableOpacity
              key={index}
              style={styles.suggestion}
              onPress={() => handleAddMovie(suggestion)}
            >
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${suggestion.poster_path}` }}
                style={styles.posterImage}
                resizeMode="cover"
              />
              <Text style={styles.suggestionText}>{suggestion.title}</Text>
            </TouchableOpacity>
          ))}
      </View>
    );
  };

  const renderFavoriteMovies = () => {
    return (
      <ScrollView style={styles.movieContainer}>
        {formData.favoriteMovies.map((movie, index) => (
          <View key={index} style={styles.movieTile}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
              style={styles.posterImage}
              resizeMode="cover"
            />
            <Text style={styles.movieText}>{movie.title}</Text>
          </View>
        ))}
      </ScrollView>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Top 5 Movies:</Text>
        <TextInput
          style={styles.input}
          value={movieInput}
          onChangeText={(text) => setMovieInput(text)}
          placeholder="Type to search movies..."
        />
        {movieInput.length > 0 && renderMovieSuggestions()}
      </View>
      {formData.favoriteMovies.length > 0 && renderFavoriteMovies()}
      <Button
        title="Next"
        onPress={() => {
          navigation.navigate('SongScreen', { formData });
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'black',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  suggestionsContainer: {
    marginTop: 5,
    maxHeight: 150,
    overflow: 'scroll',
  },
  suggestion: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  suggestionText: {
    fontSize: 16,
    marginLeft: 10,
    color: 'white',
  },
  movieContainer: {
    marginTop: 20,
  },
  movieTile: {
    width: '100%',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  posterImage: {
    width: 80,
    height: 120,
    borderRadius: 5,
    marginRight: 10,
  },
  movieText: {
    fontSize: 16,
    color: 'white',
  },
});

export default MovieScreen;
