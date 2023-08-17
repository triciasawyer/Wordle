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
                setFeedback(guess.split('').map((letter, index) => ({ letter, correct: true })));
                setAttempts(attempts + 1);
                generateTargetWord();
                setGuess('');
            } else {
                const newFeedback = guess.split('').map((letter, index) => ({
                    letter,
                    correct: targetWord.toUpperCase().includes(letter) && guess[index].toUpperCase() !== targetWord[index],
                }));
                setFeedback(newFeedback);
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
            <View style={styles.inputContainer}>
                <InputGrid size={5} feedback={feedback} onChange={(text) => setGuess(text)} />
            </View>
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
    inputContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
});

export default Wordle;
