import React from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
const styles = StyleSheet.create({
  buttonContainer: {},
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

const GradientButton = ({ onPress, title, icon }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={['#e09b3d', '#c74c4d', '#c21975', '#7024c4']}
        start={[0.5, 0.1]}
        style={{ borderRadius: 10, paddingVertical: 20, width: '100%', marginVertical: '2%' }}
      >
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
          {icon === 'facebook' || icon === 'instagram' ? (
            <FontAwesome name={icon} size={24} color={'white'} style={{ position: 'absolute', left: '5%' }} />
          ) : (
            ''
          )}
          <Text style={styles.buttonText}>{title}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GradientButton;
