import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Dimensions, Button, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MusicItem, MusicFormData } from '../types';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Movie } from '../types';
import { TVShow } from '../types';

const screen = Dimensions.get('window');



const SongScreen: React.FC = () => {
  const route = useRoute<RouteProp<{ params: { moviesProfile: Movie[], tvProfile: TVShow[] } }, 'params'>>();
  const { moviesProfile, tvProfile } = route.params;
  const [formData, setFormData] = useState<MusicFormData>({
    favoriteTracks: [],
    favoriteAlbums: [],
    favoriteArtists: [],
  });

  const navigation = useNavigation();

  const [trackInput, setTrackInput] = useState<string>('');
  const [albumInput, setAlbumInput] = useState<string>('');
  const [artistInput, setArtistInput] = useState<string>('');

  const [trackSuggestions, setTrackSuggestions] = useState<MusicItem[]>([]);
  const [albumSuggestions, setAlbumSuggestions] = useState<MusicItem[]>([]);
  const [artistSuggestions, setArtistSuggestions] = useState<MusicItem[]>([]);

  const handleAddFavorite = (type: keyof FormData, item: MusicItem) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [type]: [...prevFormData[type], item],
    }));
  };

  const getSuggestions = async (type: string, query: string) => {
    try {
      const apiUrl = `https://powerful-distinctly-bat.ngrok-free.app/search/music?query=${query}&type=${type}`;
      const response = await fetch(apiUrl);
      const json = await response.json();
      const top5Suggestions = json.items.slice(0, 5);
      if (type === 'track') setTrackSuggestions(top5Suggestions);
      if (type === 'album') setAlbumSuggestions(top5Suggestions);
      if (type === 'artist') setArtistSuggestions(top5Suggestions);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (trackInput.length > 2) getSuggestions('track', trackInput);
    else setTrackSuggestions([]);
  }, [trackInput]);

  useEffect(() => {
    if (albumInput.length > 2) getSuggestions('album', albumInput);
    else setAlbumSuggestions([]);
  }, [albumInput]);

  useEffect(() => {
    if (artistInput.length > 2) getSuggestions('artist', artistInput);
    else setArtistSuggestions([]);
  }, [artistInput]);

  const renderSuggestions = (type: string, suggestions: MusicItem[]) => {
    return (
      <FlatList
        data={suggestions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.suggestion}
            onPress={() => {
              if (type === 'track') {
                setTrackInput('');
                handleAddFavorite('favoriteTracks', item);
              }
              if (type === 'album') {
                setAlbumInput('');
                handleAddFavorite('favoriteAlbums', item);
              }
              if (type === 'artist') {
                setArtistInput('');
                handleAddFavorite('favoriteArtists', item);
              }
            }}
          >
            <Image
              source={{ uri: item.album?.images?.[0]?.url || item.images?.[0]?.url }}
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

  const renderHorizontalList = (title: string, items: MusicItem[]) => {
    return (
      <View style={styles.horizontalContainer}>
        <Text style={styles.label}>{title}</Text>
        <FlatList
          horizontal
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.movieTile}>
              <Image
                source={{ uri: item.album?.images?.[0]?.url || item.images?.[0]?.url }}
                style={styles.posterImage}
                resizeMode="cover"
              />
              <Text style={styles.movieText}>{item.name}</Text>
            </View>
          )}
          contentContainerStyle={styles.horizontalList}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Top 5 Tracks:</Text>
        <TextInput
          style={styles.input}
          value={trackInput}
          onChangeText={(text) => setTrackInput(text)}
          placeholder="Type to search tracks..."
        />
        {trackInput.length > 2 && renderSuggestions('track', trackSuggestions)}
        {formData.favoriteTracks.length > 0 && renderHorizontalList('Favorite Tracks', formData.favoriteTracks)}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Top 5 Albums:</Text>
        <TextInput
          style={styles.input}
          value={albumInput}
          onChangeText={(text) => setAlbumInput(text)}
          placeholder="Type to search albums..."
        />
        {albumInput.length > 2 && renderSuggestions('album', albumSuggestions)}
        {formData.favoriteAlbums.length > 0 && renderHorizontalList('Favorite Albums', formData.favoriteAlbums)}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Top 5 Artists:</Text>
        <TextInput
          style={styles.input}
          value={artistInput}
          onChangeText={(text) => setArtistInput(text)}
          placeholder="Type to search artists..."
        />
        {artistInput.length > 2 && renderSuggestions('artist', artistSuggestions)}
        {formData.favoriteArtists.length > 0 && renderHorizontalList('Favorite Artists', formData.favoriteArtists)}
      </View>

      <Button title="Next" onPress={() => { console.log(formData); navigation.navigate('books', { moviesProfile, tvProfile, tracksProfile: formData.favoriteTracks, albumsProfile: formData.favoriteAlbums, artistsProfile: formData.favoriteArtists }); }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'black',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
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
  horizontalContainer: {
    marginBottom: 20,
  },
  horizontalList: {
    paddingHorizontal: 10,
  },
  movieTile: {
    marginRight: 10,
    alignItems: 'center',
  },
  posterImage: {
    width: 120,
    height: 120,
    borderRadius: 5,
    marginBottom: 5,
  },
  movieText: {
    fontSize: 16,
    color: 'white',
  },
});

export default SongScreen;
