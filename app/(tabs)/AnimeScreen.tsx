import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface FormData {
  favoriteAnimes: string[];
}

const AnimeScreen: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    favoriteAnimes: [],
  });

  const navigation= useNavigation();
  const [animeInput, setAnimeInput] = useState<string>('');
  const animeSuggestions = ['Anime One', 'Anime Two', 'Anime Three'];

  const handleAddAnime = () => {
    if (formData.favoriteAnimes.length < 5 && animeInput && !formData.favoriteAnimes.includes(animeInput)) {
      setFormData({
        ...formData,
        favoriteAnimes: [...formData.favoriteAnimes, animeInput],
      });
      setAnimeInput('');
    }
  };

  const renderSuggestions = (suggestions: string[], setInput: React.Dispatch<React.SetStateAction<string>>) => {
    return (
      <View style={styles.suggestionsContainer}>
        {suggestions
          .filter((item) => item.toLowerCase().includes(animeInput.toLowerCase()))
          .map((suggestion, index) => (
            <TouchableOpacity
              key={index}
              style={styles.suggestion}
              onPress={() => setInput(suggestion)}
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
        <Text style={styles.label}>Top 5 Animes:</Text>
        <TextInput
          style={styles.input}
          value={animeInput}
          onChangeText={setAnimeInput}
          placeholder="Type to search animes..."
        />
        {animeInput.length > 0 && renderSuggestions(animeSuggestions, setAnimeInput)}
        <Button title="Add Anime" onPress={handleAddAnime} />
      </View>
      <View style={styles.tileContainer}>
        {formData.favoriteAnimes.map((anime, index) => (
          <View key={index} style={styles.tile}>
            <Image source={require('../../assets/movieposter/poster.png')} style={styles.posterImage} resizeMode="cover" />
            <Text style={styles.tileText}>{anime}</Text>
          </View>
        ))}
      </View>
      <Button title="Next" onPress={() => navigation.navigate('ProfileScreen')} />
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
  tileContainer: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tile: {
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
  },
  tileText: {
    fontSize: 20,
    textAlign: 'center',
    flex: 1, // Ensure text takes remaining space
    color: 'white'
  },
});

export default AnimeScreen;
