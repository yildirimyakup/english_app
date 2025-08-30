import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

interface InputProps {
  value: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  onChangeText: (text: string) => void;
}

export default function Input({
  value,
  placeholder,
  secureTextEntry,
  onChangeText,
}: InputProps) {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 12 },
  label: { marginBottom: 4, fontWeight: '600' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
});
