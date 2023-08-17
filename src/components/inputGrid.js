import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const InputGrid = ({ size, onChange }) => {
  const [inputs, setInputs] = useState(Array(size).fill(''));
  const inputRefs = Array.from({ length: size }, () => useRef());

  const handleInputChange = (index, value) => {
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
          style={styles.gridInput}
          value={input}
          onChangeText={(text) => handleInputChange(index, text)}
          maxLength={1}
          ref={inputRefs[index]}
          // Focuses on the first input
          autoFocus={index === 0}
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
});

export default InputGrid;
