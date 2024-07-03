import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Dimensions, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Movie, MoviesFormData } from '../types';

<<<<<<< HEAD
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
=======
const screen = Dimensions.get('window');
>>>>>>> 63bdcc718265f9db99a02d3efd28a72599c05089

const MovieScreen: React.FC = () => {
  const [formData, setFormData] = useState<MoviesFormData>({
    favoriteMovies: [],
    favoriteSongs: [],
    favoriteArtists: [],
  });

  const navigation = useNavigation();

  const handleSubmit = () => {
    console.log(formData.favoriteMovies); 
    navigation.navigate('TVScreen', { moviesProfile: formData.favoriteMovies });
  };

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
      let apiUrl = `https://b353-122-177-101-132.ngrok-free.app/search/movies?query=${movieInput}&type=movie`;
      const response = await fetch(apiUrl);
      const json = await response.json();
      const top5Movies: Movie[] = json.slice(0, 5);
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
      <FlatList
        data={movieSuggestions.filter(movie => movie.title.toLowerCase().includes(movieInput.toLowerCase()) && movie.poster_path !== null)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.suggestion}
            onPress={() => handleAddMovie(item)}
          >
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
              style={styles.posterImage}
              resizeMode="cover"
            />
            <Text style={styles.suggestionText}>{item.title}</Text>
          </TouchableOpacity>
        )}
        style={styles.suggestionsContainer}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  const renderFavoriteMovies = () => {
    return (
      <FlatList
        data={formData.favoriteMovies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.movieTile}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
              style={styles.posterImage}
              resizeMode="cover"
            />
            <Text style={styles.movieText}>{item.title}</Text>
          </View>
        )}
        style={styles.suggestionsContainer}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <View style={styles.container}>
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
        {formData.favoriteMovies.length > 0 && (
          <View style={styles.favoriteMoviesContainer}>
            {renderFavoriteMovies()}
          </View>
        )}
        <Button title="Next" onPress={handleSubmit} />
      </View>
<<<<<<< HEAD
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
=======
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
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
      maxHeight: screen.height / 2,
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
    favoriteMoviesContainer: {
      flex: 1,
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
  
>>>>>>> 63bdcc718265f9db99a02d3efd28a72599c05089
