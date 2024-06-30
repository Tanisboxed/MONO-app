import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';



const OnboardingScreen: React.FC = () => {

    const navigation = useNavigation();

    const handleSubmit = () => {
        navigation.navigate('MovieScreen');
    };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundImage} />

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Tell us who you are.</Text>

        <Text style={styles.subtitle}>
          Let’s get you all set up so you can verify your personal account and begin setting up your profile.
        </Text>


        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor="#ccc"
          />

          <TextInput
            style={styles.input}
            placeholder="Last Name"
            placeholderTextColor="#ccc"
          />

          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="#ccc"
          />

          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="#ccc"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#ccc"
            secureTextEntry
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#ccc"
            secureTextEntry
          />

        <Button
        title="Next"
        onPress={handleSubmit}
        color="#3182ce" // Change the background color of the button
        />

        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  button: {

  },

  backgroundImage: {
    flex: 1,
    backgroundColor: '#ccc', // Placeholder color for background image in React Native
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333', // Adjust color as per your design
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#666', // Adjust color as per your design
  },
  accountTypeContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  accountTypeTitle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    color: '#444', // Adjust color as per your design
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  formContainer: {
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9', // Adjust background color as per your design
    color: '#333', // Adjust text color as per your design
  },
});

export default OnboardingScreen;
