import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { rgbaColor } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

const placeholderImage = require('../../assets/movieposter/poster.png'); // Make sure to add a placeholder image in the assets folder

const favoriteArtists = [
  { name: 'Arctic Monkeys', image: placeholderImage },
  { name: 'Artist Two', image: placeholderImage },
  { name: 'Artist Three', image: placeholderImage },
  { name: 'Artist Four', image: placeholderImage },
  { name: 'Artist Five', image: placeholderImage },
];

const favoriteSongs = [
  { title: 'Buffalo Replaced', artist: 'Mitski', image: placeholderImage },
  { title: 'Science Fiction', artist: 'Arctic Monkeys', image: placeholderImage },
  // Add more songs here
];

const favoriteMovies = [
  { title: 'Movie One', image: placeholderImage },
  { title: 'Movie Two', image: placeholderImage },
  { title: 'Movie Three', image: placeholderImage },
  { title: 'Movie Four', image: placeholderImage },
  // Add more movies here
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

const renderMovieItem = ({ item }: { item: any }) => (
  <View style={styles.movieTile}>
    <Image source={item.image} style={styles.movieImage} resizeMode="cover" />
  </View>
);

const ProfileScreen: React.FC = () => {
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
        <TextInput style={styles.bioInput} placeholder="Add a bio" placeholderTextColor="#888" />
        <Text style={styles.bioLabel}>Quote</Text>
        <TextInput style={styles.bioInput} placeholder="Add a quote" placeholderTextColor="#888" />
      </View>

      <View style={styles.interestsContainer}>
        <TouchableOpacity style={styles.interestButton}>
          <Text style={styles.interestText}>Interests</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.category}>Artists I fw?</Text>
      <FlatList
        data={favoriteArtists}
        renderItem={renderArtistItem}
        keyExtractor={(item) => item.name}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.artistList}
      />

      <Text style={styles.category}>Top songs</Text>
      <View style={styles.list}>
        {favoriteSongs.map((item, index) => (
          <View key={index}>
            {renderSongItem({ item })}
          </View>
        ))}
      </View>

      <Text style={styles.category}>Movies I love</Text>
      <FlatList
        data={favoriteMovies}
        renderItem={({ item }) => renderMovieItem({ item })}
        keyExtractor={(item) => item.title}
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
    backgroundColor: 'black',
  },
  header: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 20,
  },
  backgroundImage: {
    width: '100%',
    height: 200,
    position: 'absolute',
  },
  profileInfo: {
    marginTop: 50,
    alignItems: 'center',
    width: '100%',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'white',
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  profileHandle: {
    fontSize: 16,
    color: 'white',
  },
  bioContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  bioLabel: {
    fontSize: 18,
    color: 'white',
    marginBottom: 5,
  },
  bioInput: {
    backgroundColor: '#333',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  interestsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  interestButton: {
    padding: 10,
    backgroundColor: '#555',
    borderRadius: 5,
  },
  interestText: {
    color: 'white',
  },
  category: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 10,
    marginLeft: 20,
  },
  carousel: {
    paddingVertical: 10,
  },
  list: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  artistTile: {
    flex: 1,
    marginRight: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  artistTileLarge: {
    flex: 2,
    marginRight: 10,
  },
  artistTileSmall: {
    flex: 1,
  },
  artistImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  songTile: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#444',
    borderRadius: 10,
  },
  songImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 10,
  },
  songInfo: {
    flex: 1,
  },
  songTitle: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  songArtist: {
    fontSize: 14,
    color: 'white',
  },
  movieTile: {
    width: 120,
    marginRight: 10,
    alignItems: 'center',
  },
  movieImage: {
    width: '100%',
    height: 150,
    borderRadius: 15,
    marginBottom: 10,
  },
  tileText: {
    fontSize: 14,
    textAlign: 'center',
    color: 'white',
  },
  artistList: {
    paddingHorizontal: 10,
  },
});

export default ProfileScreen;
