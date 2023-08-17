import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import InputGrid from './inputGrid';

const Wordle = () => {
  const [targetWord, setTargetWord] = useState('');
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    generateTargetWord();
  }, []);

  const generateTargetWord = () => {
    const words = ['APPLE', 'TABLE', 'CHAIR', 'PHONE', 'HOUSE', 'BEACH', 'CLOUD', 'TIGER', 'RIVER', 'PIZZA'];
    
    const randomWord = Math.floor(Math.random() * words.length);
    setTargetWord(words[randomWord]);
  };

  const handleGuess = () => {
    if (guess.toUpperCase() === targetWord) {
      setFeedback(['You guessed the word!']);
      setAttempts(attempts + 1);
      generateTargetWord();
      setGuess('');
    } else {
      // ...
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wordle</Text>
      <Text>Attempts: {attempts}</Text>
      <View style={styles.feedbackContainer}>
        {feedback.map((fb, index) => (
          <Text key={index} style={styles.feedback}>
            {fb}
          </Text>
        ))}
      </View>
      <InputGrid size={5} onChange={(text) => setGuess(text)} />
      <Button title="Guess" onPress={handleGuess} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  feedbackContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  feedback: {
    fontSize: 20,
    marginRight: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    width: 200,
    padding: 10,
    marginVertical: 10,
  },
});

export default Wordle;
