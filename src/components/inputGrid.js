import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const InputGrid = ({ size, feedback, onChange, disabled }) => {
  const [inputs, setInputs] = useState(Array(size).fill(''));
  const inputRefs = Array.from({ length: size }, () => useRef());

  const handleInputChange = (index, value) => {
    if (disabled) {
        return;
    }
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
    onChange(newInputs.join(''));

    if (index < size - 1 && value !== '') {
        inputRefs[index + 1].current.focus();
      }
  };

  return (
    <View style={styles.gridContainer}>
      {inputs.map((input, index) => (
        <TextInput
          key={index}
          style={[
            styles.gridInput,
            feedback[index] && feedback[index].correct && styles.correctInput,
            feedback[index] && !feedback[index].correct && styles.incorrectInput,
          ]}
          value={input}
          onChangeText={(text) => handleInputChange(index, text)}
          maxLength={1}
          ref={inputRefs[index]}
          // Focuses on the first input
          autoFocus={index === 0}
          editable={!disabled}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
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
