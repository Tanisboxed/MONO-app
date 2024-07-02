// app/screens/BookScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Dimensions, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const screen = Dimensions.get('window');

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    imageLinks: {
      thumbnail: string;
    };
  };
}

interface FormData {
  favoriteBooks: Book[];
}

const BookScreen: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    favoriteBooks: [],
  });

  const navigation = useNavigation();

  const [bookInput, setBookInput] = useState<string>('');
  const [bookSuggestions, setBookSuggestions] = useState<Book[]>([]);

  const handleAddBook = (book: Book) => {
    if (
      formData.favoriteBooks.length < 5 &&
      !formData.favoriteBooks.find((b) => b.id === book.id)
    ) {
      setFormData({
        ...formData,
        favoriteBooks: [...formData.favoriteBooks, book],
      });
      setBookInput('');
    }
  };

  const getBooks = async () => {
    try {
      let apiUrl = `http://powerful-distinctly-bat.ngrok-free.app/search/books?query=a`;
      if (bookInput !== '' && bookInput !== null) {
        apiUrl = `http://powerful-distinctly-bat.ngrok-free.app/search/books?query=${bookInput}`;
      }

      const response = await fetch(apiUrl);
      const json = await response.json();
      const top5Books: Book[] = json.items.slice(0, 5);
      setBookSuggestions(top5Books);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBooks();
  }, [bookInput]);

  const renderBookSuggestions = () => {
    return (
      <FlatList
        data={bookSuggestions.filter(book => book.volumeInfo.title.toLowerCase().includes(bookInput.toLowerCase()) && book.volumeInfo.imageLinks?.thumbnail !== null)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.suggestion}
            onPress={() => handleAddBook(item)}
          >
            <Image
              source={{ uri: item.volumeInfo.imageLinks?.thumbnail }}
              style={styles.coverImage}
              resizeMode="cover"
            />
            <Text style={styles.suggestionText}>{item.volumeInfo.title}</Text>
          </TouchableOpacity>
        )}
        style={styles.suggestionsContainer}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  const renderFavoriteBooks = () => {
    return (
      <FlatList
        data={formData.favoriteBooks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.bookTile}>
            <Image
              source={{ uri: item.volumeInfo.imageLinks.thumbnail }}
              style={styles.coverImage}
              resizeMode="cover"
            />
            <Text style={styles.bookText}>{item.volumeInfo.title}</Text>
          </View>
        )}
        style={styles.favoriteBooksContainer}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Top 5 Books:</Text>
        <TextInput
          style={styles.input}
          value={bookInput}
          onChangeText={(text) => setBookInput(text)}
          placeholder="Type to search books..."
        />
        {bookInput.length > 0 && renderBookSuggestions()}
      </View>
      {formData.favoriteBooks.length > 0 && (
        <View style={styles.favoriteBooksContainer}>
          {renderFavoriteBooks()}
        </View>
      )}
      <Button title="Next" onPress={() => { console.log(formData); navigation.navigate('ProfileScreen'); }} />
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
  favoriteBooksContainer: {
    flex: 1,
    marginTop: 20,
  },
  bookTile: {
    width: '100%',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  coverImage: {
    width: 80,
    height: 120,
    borderRadius: 5,
    marginRight: 10,
  },
  bookText: {
    fontSize: 16,
    color: 'white',
  },
});

export default BookScreen;
