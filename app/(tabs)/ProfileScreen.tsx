import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, ScrollView, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Movie } from '../types'; // Import the interface
import { TVShow } from '../types'; // Import the interface
import { MusicItem } from '../types'; // Import the interface
import { Book } from '../types';
import placeholderImage from '../../assets/movieposter/poster.png'; // Import your placeholder image

const favoriteSongs = [
  { title: 'Buffalo Replaced', artist: 'Mitski', image: placeholderImage },
  { title: 'Science Fiction', artist: 'Arctic Monkeys', image: placeholderImage },
];

const renderArtistItem = ({ item, index }: { item: any, index: number }) => (
  <View style={[styles.artistTile, (index % 7 === 0 || index % 7 === 3 || index % 7 === 4) ? styles.artistTileLarge : styles.artistTileSmall]}>
    <Image source={item.image} style={styles.artistImage} resizeMode="cover" />
  </View>
);

const renderSongItem = ({ item }: { item: any }) => (
  <View style={styles.songTile}>
    <Image source={item.image} style={styles.songImage} resizeMode="cover" />
    <View style={styles.songInfo}>
      <Text style={styles.songTitle}>{item.title}</Text>
      <Text style={styles.songArtist}>{item.artist}</Text>
    </View>
  </View>
);

const ProfileScreen: React.FC = () => {
  const route = useRoute<RouteProp<{ params: { moviesProfile: Movie[], tvProfile: TVShow[], tracksProfile: MusicItem[], albumsProfile: MusicItem[], artistsProfile: MusicItem[], booksProfile: Book[] } }, 'params'>>();
  const { moviesProfile, tvProfile, tracksProfile, albumsProfile, artistsProfile, booksProfile } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={placeholderImage} style={styles.backgroundImage} />
        <View style={styles.profileInfo}>
          <Image source={placeholderImage} style={styles.profileImage} />
          <Text style={styles.profileName}>Hari R K</Text>
          <Text style={styles.profileHandle}>@harikartha_</Text>
        </View>
      </View>

      <View style={styles.bioContainer}>
        <Text style={styles.bioLabel}>Bio</Text>
        <TextInput style={styles.bioInput} multiline placeholder="Tell us about yourself..." placeholderTextColor="#aaa" />
      </View>

      <View style={styles.interestsContainer}>
        <TouchableOpacity style={styles.interestButton}>
          <Text style={styles.interestText}>Movies</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.category}>Artists I fw?</Text>
      <FlatList
        data={artistsProfile}
        renderItem={renderArtistItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={7}
        style={styles.artistList}
      />

      <Text style={styles.category}>Songs I fw?</Text>
      <FlatList
        data={tracksProfile}
        renderItem={renderSongItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.songList}
      />

      <Text style={styles.category}>Movies I fw?</Text>
      <FlatList
        data={moviesProfile}
        renderItem={({ item }) => (
          <View style={styles.movieTile}>
            <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.movieImage} resizeMode="cover" />
            <Text style={styles.movieTitle}>{item.title}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        style={styles.movieList}
      />

      <Text style={styles.category}>Shows I fw?</Text>
      <FlatList
        data={tvProfile}
        renderItem={({ item }) => (
          <View style={styles.movieTile}>
            <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.movieImage} resizeMode="cover" />
            <Text style={styles.movieTitle}>{item.name}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        style={styles.movieList}
      />

      <Text style={styles.category}>Books I fw?</Text>
        <FlatList
          data={booksProfile}
          renderItem={({ item }) => (
            <View style={styles.movieTile}>
              {/* <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.movieImage} resizeMode="cover" /> */}
              <Text style={styles.movieTitle}>{item.name}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          style={styles.movieList}
        />
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    opacity: 0.3,
  },
  profileInfo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileName: {
    fontSize: 20,
    color: 'white',
  },
  profileHandle: {
    fontSize: 16,
    color: 'white',
  },
  bioContainer: {
    padding: 20,
  },
  bioLabel: {
    fontSize: 18,
    color: 'white',
    marginBottom: 5,
  },
  bioInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
    color: 'black',
  },
  interestsContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  interestButton: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  interestText: {
    fontSize: 16,
    color: 'black',
  },
  category: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
    marginLeft: 20,
  },
  artistList: {
    marginBottom: 20,
  },
  artistTile: {
    marginHorizontal: 5,
  },
  artistTileLarge: {
    width: 100,
    height: 100,
  },
  artistTileSmall: {
    width: 60,
    height: 60,
  },
  artistImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  songList: {
    marginBottom: 20,
  },
  songTile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  songImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  songInfo: {
    marginLeft: 10,
  },
  songTitle: {
    fontSize: 16,
    color: 'white',
  },
  songArtist: {
    fontSize: 14,
    color: 'white',
  },
  movieList: {
    marginBottom: 20,
  },
  movieTile: {
    marginHorizontal: 10,
  },
  movieImage: {
    width: 100,
    height: 150,
    borderRadius: 10,
  },
  movieTitle: {
    fontSize: 14,
    color: 'white',
    marginTop: 5,
  },
});

export default ProfileScreen;
