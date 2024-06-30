import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface FormData {
  favoriteChannels: string[];
  favoritePlaylists: string[];
}

const YouTubeScreen: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    favoriteChannels: [],
    favoritePlaylists: [],
  });

  const navigation = useNavigation();

  const [channelInput, setChannelInput] = useState<string>('');
  const [playlistInput, setPlaylistInput] = useState<string>('');

  const channelSuggestions = ['Channel One', 'Channel Two', 'Channel Three'];
  const playlistSuggestions = ['Playlist One', 'Playlist Two', 'Playlist Three'];

  const handleAddChannel = () => {
    if (formData.favoriteChannels.length < 5 && channelInput && !formData.favoriteChannels.includes(channelInput)) {
      setFormData({
        ...formData,
        favoriteChannels: [...formData.favoriteChannels, channelInput],
      });
      setChannelInput('');
    }
  };

  const handleAddPlaylist = () => {
    if (formData.favoritePlaylists.length < 5 && playlistInput && !formData.favoritePlaylists.includes(playlistInput)) {
      setFormData({
        ...formData,
        favoritePlaylists: [...formData.favoritePlaylists, playlistInput],
      });
      setPlaylistInput('');
    }
  };

  const renderSuggestions = (suggestions: string[], setInput: React.Dispatch<React.SetStateAction<string>>) => {
    return (
      <View style={styles.suggestionsContainer}>
        {suggestions
          .filter((item) => item.toLowerCase().includes((setInput === setChannelInput ? channelInput : playlistInput).toLowerCase()))
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
        <Text style={styles.label}>Top 5 YouTube Channels:</Text>
        <TextInput
          style={styles.input}
          value={channelInput}
          onChangeText={setChannelInput}
          placeholder="Type to search channels..."
        />
        {channelInput.length > 0 && renderSuggestions(channelSuggestions, setChannelInput)}
        <Button title="Add Channel" onPress={handleAddChannel} />
      </View>
      <View style={styles.tileContainer}>
        {formData.favoriteChannels.map((channel, index) => (
          <View key={index} style={styles.tile}>
            <Image source={require('../../assets/movieposter/poster.png')} style={styles.posterImage} resizeMode="cover" />
            <Text style={styles.tileText}>{channel}</Text>
          </View>
        ))}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Top 5 YouTube Playlists:</Text>
        <TextInput
          style={styles.input}
          value={playlistInput}
          onChangeText={setPlaylistInput}
          placeholder="Type to search playlists..."
        />
        {playlistInput.length > 0 && renderSuggestions(playlistSuggestions, setPlaylistInput)}
        <Button title="Add Playlist" onPress={handleAddPlaylist} />
      </View>
      <View style={styles.tileContainer}>
        {formData.favoritePlaylists.map((playlist, index) => (
          <View key={index} style={styles.tile}>
            <Image source={require('../../assets/movieposter/poster.png')} style={styles.posterImage} resizeMode="cover" />
            <Text style={styles.tileText}>{playlist}</Text>
          </View>
        ))}
      </View>
      <Button title="Next" onPress={() => navigation.navigate('GamesScreen')} />
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
    marginTop: 10,
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
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
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

export default YouTubeScreen;
