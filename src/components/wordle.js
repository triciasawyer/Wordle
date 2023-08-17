import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import InputGrid from './inputGrid';

const Wordle = () => {
  const [targetWord, setTargetWord] = useState('');
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    generateTargetWord();
  }, []);

  useEffect(() => {
    if (guess.length === targetWord.length) {
      if (guess.toUpperCase() === targetWord) {
        setFeedback(['correct']);
        setAttempts(attempts + 1);
        generateTargetWord();
        setGuess('');
      } else {
        setFeedback(['incorrect']);
      }
    }
  }, [guess]);

  const generateTargetWord = () => {
    const words = ['APPLE', 'TABLE', 'CHAIR', 'PHONE', 'HOUSE', 'BEACH', 'CLOUD', 'TIGER', 'RIVER', 'PIZZA'];
    
    const randomWord = Math.floor(Math.random() * words.length);
    setTargetWord(words[randomWord]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wordle</Text>
      <Text>Attempts: {attempts}</Text>
      <View style={styles.feedbackContainer}>
        {feedback.map((fb, index) => (
          <View
          key={index}
          style={[
            styles.feedbackBox,
            fb === 'correct' && styles.feedbackBoxCorrect,
            fb === 'incorrect' && styles.feedbackBoxIncorrect,
          ]}
          />
        ))}
      </View>
      <InputGrid size={5} onChange={(text) => setGuess(text)} />
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
  feedbackBox: {
    width: 20,
    height: 20,
    margin: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  feedbackCorrect: {
    backgroundColor: 'green',
  },
  feedbackIncorrect: {
    backgroundColor: 'red',
  },
});

export default Wordle;
