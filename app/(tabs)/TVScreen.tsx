import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Dimensions, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Movie } from '../types';
import { TVShow, TVFormData } from '../types';

const screen = Dimensions.get('window');

const TVShowScreen: React.FC = () => {
  const route = useRoute<RouteProp<{ params: { moviesProfile: Movie[] } }, 'params'>>();
  const navigation = useNavigation();

  const { moviesProfile = [] } = route.params || {}; // Added default value and safe access
  const [formData, setFormData] = useState<TVFormData>({
    favoriteTVShows: [],
  });

  const [tvShowInput, setTVShowInput] = useState<string>('');
  const [tvShowSuggestions, setTVShowSuggestions] = useState<TVShow[]>([]);

  const handleAddTVShow = (tvShow: TVShow) => {
    if (
      formData.favoriteTVShows.length < 5 &&
      !formData.favoriteTVShows.find((m) => m.id === tvShow.id)
    ) {
      setFormData({
        ...formData,
        favoriteTVShows: [...formData.favoriteTVShows, tvShow],
      });
      setTVShowInput('');
    }
  };

  const getTVShows = async () => {
    try {
      let apiUrl = `https://powerful-distinctly-bat.ngrok-free.app/search/shows?query=${tvShowInput}&type=tv`;
      const response = await fetch(apiUrl);
      const json = await response.json();
      const top5TVShows: TVShow[] = json.slice(0, 5);
      setTVShowSuggestions(top5TVShows);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (tvShowInput.length > 0) {
      getTVShows();
    }
  }, [tvShowInput]);

  const renderTVShowSuggestions = () => {
    return (
      <FlatList
        data={tvShowSuggestions.filter(tvShow => tvShow.name.toLowerCase().includes(tvShowInput.toLowerCase()) && tvShow.poster_path !== null)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.suggestion}
            onPress={() => handleAddTVShow(item)}
          >
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
              style={styles.posterImage}
              resizeMode="cover"
            />
            <Text style={styles.suggestionText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        style={styles.suggestionsContainer}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  const renderFavoriteTVShows = () => {
    return (
      <FlatList
        data={formData.favoriteTVShows}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.movieTile}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
              style={styles.posterImage}
              resizeMode="cover"
            />
            <Text style={styles.movieText}>{item.name}</Text>
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
        <Text style={styles.label}>Top 5 TV Shows:</Text>
        <TextInput
          style={styles.input}
          value={tvShowInput}
          onChangeText={(text) => setTVShowInput(text)}
          placeholder="Type to search TV shows..."
        />
        {tvShowInput.length > 0 && renderTVShowSuggestions()}
      </View>
      {formData.favoriteTVShows.length > 0 && (
        <View style={styles.favoriteMoviesContainer}>
          {renderFavoriteTVShows()}
        </View>
      )}
      <Button title="Next" onPress={() => { console.log(formData.favoriteTVShows); navigation.navigate('SongScreen', { moviesProfile, tvProfile: formData.favoriteTVShows }); }} />
    </View>
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

export default TVShowScreen;
