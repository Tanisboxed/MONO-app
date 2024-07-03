<<<<<<< HEAD
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

=======
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Dimensions, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Movie, TVShow, TVFormData } from '../types';

const screen = Dimensions.get('window');

const TVShowScreen: React.FC = () => {
  const route = useRoute<RouteProp<{ params: { moviesProfile: Movie[] } }, 'params'>>();
  const navigation = useNavigation();

  const { moviesProfile = [] } = route.params || {};
  const [formData, setFormData] = useState<TVFormData>({
    favoriteTVShows: [],
  });

>>>>>>> 63bdcc718265f9db99a02d3efd28a72599c05089
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

<<<<<<< HEAD
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
=======
  const getTVShows = async () => {
    try {
      let apiUrl = `https://b353-122-177-101-132.ngrok-free.app/search/shows?query=${tvShowInput}&type=tv`;
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
>>>>>>> 63bdcc718265f9db99a02d3efd28a72599c05089
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
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Top 5 TV Shows:</Text>
        <TextInput
          style={styles.input}
          value={tvShowInput}
          onChangeText={(text) => setTVShowInput(text)}
          placeholder="Type to search TV shows..."
        />
<<<<<<< HEAD
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
=======
        {tvShowInput.length > 0 && renderTVShowSuggestions()}
      </View>
      {formData.favoriteTVShows.length > 0 && (
        <View style={styles.favoriteMoviesContainer}>
          {renderFavoriteTVShows()}
        </View>
      )}
      <Button title="Next" onPress={() => { console.log(formData.favoriteTVShows); navigation.navigate('SongScreen', { moviesProfile, tvProfile: formData.favoriteTVShows }); }} />
    </View>
>>>>>>> 63bdcc718265f9db99a02d3efd28a72599c05089
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

<<<<<<< HEAD
export default TVShowsScreen;
=======
export default TVShowScreen;
>>>>>>> 63bdcc718265f9db99a02d3efd28a72599c05089
