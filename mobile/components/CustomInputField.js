import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import AppStylesheet from '../styles/AppStylesheet';

const CustomInputField = (props) => {
  const {
    field: { name, onBlur, onChange, value },
    form: { setFieldTouched },
    ...inputProps
  } = props;

  return (
    <View style={AppStylesheet.inputWrapper}>
      <TextInput
        style={AppStylesheet.inputField}
        value={value}
        onChangeText={(text) => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name);
          onBlur(name);
        }}
        {...inputProps}
      />
    </View>
  );
};

export default CustomInputField;
