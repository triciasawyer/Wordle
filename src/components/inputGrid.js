import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const InputGrid = ({ size, feedback, onChange, disabled }) => {
  const [inputs, setInputs] = useState(Array(size * size).fill(''));
  const inputRefs = Array.from({ length: size * size }, () => useRef());

  const [activeRow, setActiveRow] = useState(0);
  const [activeCol, setActiveCol] = useState(0);

  const handleInputChange = (row, col, value) => {
    if (disabled) {
      return;
    }
    if (row === activeRow && col === activeCol) {
      const index = row * size + col;
      const newInputs = [...inputs];
      newInputs[index] = value;
      setInputs(newInputs);
      onChange(newInputs.join(''));

      if (col < size - 1 && value !== '') {
        setActiveCol(col + 1);
        inputRefs[index + 1].current.focus();
      } else if (col === size - 1 && value !== '') {
        setActiveRow(row + 1);
        setActiveCol(0);
        if (row < size - 1) {
          inputRefs[index + size].current.focus();
        }
      }
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
              editable={!disabled && row === activeRow}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
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
