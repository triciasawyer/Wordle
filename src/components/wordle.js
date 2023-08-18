import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import InputGrid from './inputGrid';

const Wordle = () => {
    const [targetWord, setTargetWord] = useState('');
    const [guess, setGuess] = useState('');
    const [feedback, setFeedback] = useState([]);
    const [attempts, setAttempts] = useState(0);
    const [completed, setCompleted] = useState(false);
    const maxAttempts = 5;

    useEffect(() => {
        generateTargetWord();
    }, []);

    useEffect(() => {
        if (guess.length === targetWord.length) {
            if (guess.toUpperCase() === targetWord) {
                setFeedback((prevFeedback) => [
                    ...prevFeedback,
                    guess.split('').map((letter, index) => ({ letter, correct: true })),
                ]);
                setGuess('');

                if (completed || attempts + 1 === maxAttempts) {
                    setCompleted(true);
                }
            } else {
                const newFeedback = guess.split('').map((letter, index) => ({
                    letter,
                    correct: targetWord.toUpperCase().includes(letter) && guess[index].toUpperCase() !== targetWord[index],
                }));
                setFeedback((prevFeedback) => [...prevFeedback, newFeedback]);

                if (completed || attempts + 1 === maxAttempts) {
                    setCompleted(true);
                }
            }
        }
    }, [guess]);

    const generateTargetWord = () => {
        const words = ['APPLE', 'TABLE', 'CHAIR', 'PHONE', 'HOUSE', 'BEACH', 'CLOUD', 'TIGER', 'RIVER', 'PIZZA'];

        const randomWord = Math.floor(Math.random() * words.length);
        setTargetWord(words[randomWord]);
        setGuess('');
        setFeedback([]);
        setCompleted(false);
        setAttempts(0);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Wordle</Text>
            <View style={styles.inputContainer}>
                <InputGrid
                    size={5}
                    feedback={feedback}
                    onChange={(text) => setGuess(text)}
                    setFeedback={setFeedback}
                    disabled={completed}
                    targetWord={targetWord}
                />
            </View>
            {completed && (
                <View style={styles.buttonContainer}>
                    <Button title="Retry" onPress={generateTargetWord} />
                </View>
            )}
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
