// app/screens/OnboardingMoviesScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface FormData {
  favoriteMovies: string[];
}



const MovieScreen: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    favoriteMovies: [],
  });

  const navigation = useNavigation();

  const [movieInput, setMovieInput] = useState<string>('');
  const movieSuggestions = ['Inception', 'The Dark Knight', 'Interstellar', 'Pulp Fiction', 'The Matrix'];

  const handleAddMovie = () => {
    if (formData.favoriteMovies.length < 5 && movieInput && !formData.favoriteMovies.includes(movieInput)) {
      setFormData({
        ...formData,
        favoriteMovies: [...formData.favoriteMovies, movieInput],
      });
      setMovieInput('');
    }
  };

  const renderMovieSuggestions = () => {
    return (
      <View style={styles.suggestionsContainer}>
        {movieSuggestions
          .filter((movie) => movie.toLowerCase().includes(movieInput.toLowerCase()))
          .map((suggestion, index) => (
            <TouchableOpacity
              key={index}
              style={styles.suggestion}
              onPress={() => setMovieInput(suggestion)}
            >
              <Text style={styles.suggestionText}>{suggestion}</Text>
            </TouchableOpacity>
          ))}
      </View>
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
        <Button title="Add Movie" onPress={handleAddMovie} />
      </View>
      <View style={styles.movieContainer}>
        {formData.favoriteMovies.map((movie, index) => (
          <View key={index} style={styles.movieTile}>
            <Image source={require('../../assets/movieposter/poster.png')} style={styles.posterImage} resizeMode="cover" />
            <Text style={styles.movieText}>{movie}</Text>
          </View>
        ))}
      </View>
      <Button title="Next" onPress={() => {console.log(formData);navigation.navigate('SongScreen');}} />
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
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 5,
    maxHeight: 150,
    overflow: 'scroll',
  },
  suggestion: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  suggestionText: {
    fontSize: 16,
  },
  movieContainer: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  movieTile: {
    width: '45%',
    margin: 9,
    height: 200,
    backgroundColor: 'grey',
    borderRadius: 15,
    alignItems: 'center',
    flexDirection: 'column', // Ensure items are aligned horizontally
    
  },
  posterImage: {
    width: '100%', // Adjust as needed
    height: '80%', // Adjust as needed
    borderRadius: 5,
    marginBottom: 7,
     // Adjust spacing between image and text
  },
  movieText: {
    fontSize: 20,
    textAlign: 'center',
    flex: 1, // Ensure text takes remaining space
    color: 'white'
  },
});

export default MovieScreen;
