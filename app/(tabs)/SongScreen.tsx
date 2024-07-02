import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

interface FormData {
  favoriteMovies: any[];
  favoriteSongs: string[];
  favoriteAlbums: string[];
  favoriteArtists: string[];
}

const SongScreen: React.FC = () => {
  const route = useRoute();
  const initialFormData = (route.params as { formData: FormData }).formData;

  const [formData, setFormData] = useState<FormData>({
    ...initialFormData,
    favoriteSongs: initialFormData.favoriteSongs || [],
    favoriteAlbums: initialFormData.favoriteAlbums || [],
    favoriteArtists: initialFormData.favoriteArtists || [],
  });

  const navigation = useNavigation();

  const [songInput, setSongInput] = useState<string>('');
  const [albumInput, setAlbumInput] = useState<string>('');
  const [artistInput, setArtistInput] = useState<string>('');

  const songSuggestions = ['Bohemian Rhapsody', 'Hotel California', 'Stairway to Heaven', 'Imagine', 'Hey Jude'];
  const albumSuggestions = ['Album 1', 'Album 2', 'Album 3'];
  const artistSuggestions = ['Artist 1', 'Artist 2', 'Artist 3'];

  const handleAddSong = () => {
    if (formData.favoriteSongs.length < 5 && songInput && !formData.favoriteSongs.includes(songInput)) {
      setFormData({
        ...formData,
        favoriteSongs: [...formData.favoriteSongs, songInput],
      });
      setSongInput('');
    }
  };

  const handleAddAlbum = () => {
    if (formData.favoriteAlbums.length < 5 && albumInput && !formData.favoriteAlbums.includes(albumInput)) {
      setFormData({
        ...formData,
        favoriteAlbums: [...formData.favoriteAlbums, albumInput],
      });
      setAlbumInput('');
    }
  };

  const handleAddArtist = () => {
    if (formData.favoriteArtists.length < 5 && artistInput && !formData.favoriteArtists.includes(artistInput)) {
      setFormData({
        ...formData,
        favoriteArtists: [...formData.favoriteArtists, artistInput],
      });
      setArtistInput('');
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

  const renderSongTiles = () => {
    return renderTiles(formData.favoriteSongs, (song, index) => (
      <Text key={index} style={styles.tileText}>{song}</Text>
    ));
  };

  const renderAlbumTiles = () => {
    return renderTiles(formData.favoriteAlbums, (album, index) => (
      <Text key={index} style={styles.tileText}>{album}</Text>
    ));
  };

  const renderArtistTiles = () => {
    return renderTiles(formData.favoriteArtists, (artist, index) => (
      <Text key={index} style={styles.tileText}>{artist}</Text>
    ));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Top 5 Songs:</Text>
        <TextInput
          style={styles.input}
          value={songInput}
          onChangeText={(text) => setSongInput(text)}
          placeholder="Type to search songs..."
        />
        {songInput.length > 0 && renderSuggestions(songInput, songSuggestions, setSongInput)}
        <Button title="Add Song" onPress={handleAddSong} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Top 5 Albums:</Text>
        <TextInput
          style={styles.input}
          value={albumInput}
          onChangeText={(text) => setAlbumInput(text)}
          placeholder="Type to search albums..."
        />
        {albumInput.length > 0 && renderSuggestions(albumInput, albumSuggestions, setAlbumInput)}
        <Button title="Add Album" onPress={handleAddAlbum} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Top 5 Artists:</Text>
        <TextInput
          style={styles.input}
          value={artistInput}
          onChangeText={(text) => setArtistInput(text)}
          placeholder="Type to search artists..."
        />
        {artistInput.length > 0 && renderSuggestions(artistInput, artistSuggestions, setArtistInput)}
        <Button title="Add Artist" onPress={handleAddArtist} />
      </View>

      <View><Text style={{ color: 'grey' }}>Top Songs</Text></View>
      {formData.favoriteSongs.length > 0 && renderSongTiles()}
      <View><Text style={{ color: 'grey', paddingTop: 10 }}>Top Artists</Text></View>
      {formData.favoriteAlbums.length > 0 && renderAlbumTiles()}
      <View><Text style={{ color: 'grey', paddingTop: 10 }}>Top Albums</Text></View>
      {formData.favoriteArtists.length > 0 && renderArtistTiles()}

      <Button title="Next" onPress={() => {
        console.log(formData);
        navigation.navigate('TVScreen', { formData });
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

export default SongScreen;
