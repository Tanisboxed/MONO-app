import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

interface FormData {
  favoriteMovies: any[];
  favoriteSongs: string[];
  favoriteAlbums: string[];
  favoriteArtists: string[];
  favoriteTVShows: string[];
}

const TVShowsScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const initialFormData = (route.params as { formData: FormData }).formData;

  const [formData, setFormData] = useState<FormData>({
    ...initialFormData,
    favoriteTVShows: initialFormData.favoriteTVShows || [],
  });

  const [tvShowInput, setTVShowInput] = useState<string>('');
  const tvShowSuggestions = ['TV Show One', 'TV Show Two', 'TV Show Three'];

  const handleAddTVShow = () => {
    if (formData.favoriteTVShows.length < 5 && tvShowInput && !formData.favoriteTVShows.includes(tvShowInput)) {
      setFormData({
        ...formData,
        favoriteTVShows: [...formData.favoriteTVShows, tvShowInput],
      });
      setTVShowInput('');
    }
  };

  const renderSuggestions = (inputValue: string, suggestions: string[], setInput: React.Dispatch<React.SetStateAction<string>>) => {
    return (
      <View style={styles.suggestionsContainer}>
        {suggestions
          .filter((item) => item.toLowerCase().includes(inputValue.toLowerCase()))
          .map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.suggestion}
              onPress={() => setInput(item)}
            >
              <Text style={styles.suggestionText}>{item}</Text>
            </TouchableOpacity>
          ))}
      </View>
    );
  };

  const renderTiles = (items: string[], renderItem: (item: string, index: number) => React.ReactNode) => {
    return (
      <View style={styles.tileContainer}>
        {items.map((item, index) => (
          <View key={index} style={styles.tile}>
            <Image source={require('../../assets/movieposter/poster.png')} style={styles.posterImage} resizeMode="cover" />
            {renderItem(item, index)}
          </View>
        ))}
      </View>
    );
  };

  const renderTVShowTiles = () => {
    return renderTiles(formData.favoriteTVShows, (tvShow, index) => (
      <Text key={index} style={styles.tileText}>{tvShow}</Text>
    ));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Top 5 TV Shows:</Text>
        <TextInput
          style={styles.input}
          value={tvShowInput}
          onChangeText={(text) => setTVShowInput(text)}
          placeholder="Type to search TV shows..."
        />
        {tvShowInput.length > 0 && renderSuggestions(tvShowInput, tvShowSuggestions, setTVShowInput)}
        <Button title="Add TV Show" onPress={handleAddTVShow} />
      </View>

      <View><Text style={{ color: 'grey', paddingTop: 10 }}>Top TV Shows</Text></View>
      {formData.favoriteTVShows.length > 0 && renderTVShowTiles()}

      <Button title="Next" onPress={() => {
        console.log(formData);
        navigation.navigate('YoutubeScreen', { formData });
      }} />
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

export default TVShowsScreen;
