import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const InputGrid = ({ size, onChange }) => {
  const [inputs, setInputs] = useState(Array(size).fill(''));

  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
    onChange(newInputs.join(''));
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
