import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, ScrollView } from 'react-native';

const favoriteMovies = ['Movie One', 'Movie Two', 'Movie Three', 'Movie Four', 'Movie Five'];
const favoriteSongs = ['Song One', 'Song Two', 'Song Three', 'Song Four', 'Song Five'];
const favoriteChannels = ['Channel One', 'Channel Two', 'Channel Three', 'Channel Four', 'Channel Five'];
const favoritePlaylists = ['Playlist One', 'Playlist Two', 'Playlist Three', 'Playlist Four', 'Playlist Five'];
const favoriteGames = ['Game One', 'Game Two', 'Game Three', 'Game Four', 'Game Five'];
const favoriteAnimes = ['Anime One', 'Anime Two', 'Anime Three', 'Anime Four', 'Anime Five'];
const favoriteTVShows = ['TV Show One', 'TV Show Two', 'TV Show Three', 'TV Show Four', 'TV Show Five'];

const renderItem = ({ item }: { item: string }) => (
  <View style={styles.tile}>
    <Image source={require('../../assets/movieposter/poster.png')} style={styles.posterImage} resizeMode="cover" />
    <Text style={styles.tileText}>{item}</Text>
  </View>
);

const ProfileScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Your Mono.</Text>

      <Text style={styles.category}>Your Movies</Text>
      <FlatList
        data={favoriteMovies}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carousel}
      />

      <Text style={styles.category}>Your Songs</Text>
      <FlatList
        data={favoriteSongs}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carousel}
      />

      <Text style={styles.category}>Your YouTube Channels</Text>
      <FlatList
        data={favoriteChannels}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carousel}
      />

      <Text style={styles.category}>Your YouTube Playlists</Text>
      <FlatList
        data={favoritePlaylists}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carousel}
      />

      <Text style={styles.category}>Your Games</Text>
      <FlatList
        data={favoriteGames}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carousel}
      />

      <Text style={styles.category}>Your Animes</Text>
      <FlatList
        data={favoriteAnimes}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carousel}
      />

      <Text style={styles.category}>Your TV Shows</Text>
      <FlatList
        data={favoriteTVShows}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carousel}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'black',
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  category: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 10,
  },
  carousel: {
    paddingVertical: 10,
  },
  tile: {
    width: 120,
    marginRight: 15,
    padding: 10,
    backgroundColor: '#444',
    borderRadius: 10,
    alignItems: 'center',
  },
  posterImage: {
    width: 80,
    height: 120,
    borderRadius: 5,
    marginBottom: 10,
  },
  tileText: {
    fontSize: 14,
    textAlign: 'center',
    color: 'white',
  },
});

export default ProfileScreen;
