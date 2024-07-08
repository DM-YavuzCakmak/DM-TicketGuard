import { Text, TouchableOpacity } from 'react-native';
import React from 'react';

export default function CustomButton({ label, onPress, buttonStyle, labelStyle }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[{
        backgroundColor: '#AD5326',
        padding: 20,
        borderRadius: 10,
        marginBottom: 30,
      }, buttonStyle]}>
      <Text
        style={[{
          textAlign: 'center',
          fontWeight: '700',
          fontSize: 16,
          color: '#fff',
        }, labelStyle]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
