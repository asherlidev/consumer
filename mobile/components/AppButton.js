import React from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

const AppButton = ({ onPress, title, bgColor, icon, iconColor, outline, outlineColor, textColor }) => {
  const styles = StyleSheet.create({
    buttonContainer: {
      borderColor: outlineColor,
    },
    buttonText: {
      fontSize: 18,
      fontWeight: '500',
      color: textColor,
      textAlign: 'center',
    },
  });
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        borderRadius: 10,
        padding: 20,
        marginBottom: 10,
        width: '100%',
        backgroundColor: bgColor,
        borderColor: outlineColor,
        borderWidth: outline ? 1 : 0,
      }}
    >
      <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
        {icon === 'facebook' || icon === 'instagram' ? (
          <FontAwesome name={icon} size={22} color={iconColor} style={{ position: 'absolute', left: '5%' }} />
        ) : (
          <Ionicons name={icon} size={22} color={iconColor} style={{ position: 'absolute', left: '5%' }} />
        )}

        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AppButton;
