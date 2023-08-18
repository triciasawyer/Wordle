import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const InputGrid = ({ size, feedback, onChange, disabled }) => {
  const [inputs, setInputs] = useState(Array(size * size).fill(''));
  const inputRefs = Array.from({ length: size * size }, () => useRef());

  const handleInputChange = (row, col, value) => {
    if (disabled) {
      return;
    }
    const index = row * size + col;
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
    onChange(newInputs.join(''));

    if (index < size * size - 1 && value !== '') {
      inputRefs[index + 1].current.focus();
    }
  };

  return (
    <View style={styles.gridContainer}>
      {Array.from({ length: size }).map((_, row) => (
        <View key={row} style={styles.rowContainer}>
          {Array.from({ length: size }).map((_, col) => (
            <TextInput
              key={col}
              style={[
                styles.gridInput,
                feedback[row * size + col] && feedback[row * size + col].correct && styles.correctInput,
                feedback[row * size + col] && !feedback[row * size + col].correct && styles.incorrectInput,
              ]}
              value={inputs[row * size + col]}
              onChangeText={(text) => handleInputChange(row, col, text)}
              maxLength={1}
              ref={inputRefs[row * size + col]}
              autoFocus={row === 0 && col === 0}
              editable={!disabled}
            />
          ))}
        </View>
      ))}
    </View>
  )}

  const styles = StyleSheet.create({
    gridContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    gridInput: {
      borderWidth: 1,
      borderColor: 'gray',
      width: 40,
      height: 40,
      textAlign: 'center',
      fontSize: 20,
      margin: 5,
    },
    correctInput: {
      backgroundColor: 'green',
    },
    incorrectInput: {
      backgroundColor: 'yellow',
    },
  });

  export default InputGrid;
