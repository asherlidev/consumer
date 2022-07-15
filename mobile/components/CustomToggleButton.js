import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, ImageBackground } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const CustomToggleButton = ({ categoryId, categoryName, toggle, selected, background }) => {
  return (
    <View style={styles.selectButtonWrapper}>
      <View style={styles.selectButton}>
        <TouchableOpacity
          style={{ height: 100 }}
          onPress={() => {
            toggle(categoryId);
          }}
        >
          <ImageBackground
            source={background}
            style={{
              flex: 1,
              resizeMode: 'cover',
            }}
          >
            {selected.indexOf(categoryId) > -1 ? (
              <FontAwesome
                name="check-circle"
                size={32}
                color="white"
                style={{
                  position: 'absolute',
                  right: 10,
                  top: 10,
                  shadowColor: '#000',
                  shadowOffset: { width: 1, height: 1 },
                  shadowOpacity: 0.75,
                  shadowRadius: 3.14,
                  elevation: 1,
                }}
              />
            ) : (
              <FontAwesome name="circle" size={32} color="white" style={{ position: 'absolute', right: 10, top: 10 }} />
            )}
          </ImageBackground>
        </TouchableOpacity>
      </View>
      <Text style={styles.label}>{categoryName ? categoryName : ''}</Text>
    </View>
  );
};

export default CustomToggleButton;

const styles = StyleSheet.create({
  selectButtonWrapper: { width: '48%', margin: '1%' },
  selectButton: { borderRadius: 20, overflow: 'hidden' },
  innerSelectButton: { overflow: 'hidden', borderRadius: 20 },
  label: {
    textAlign: 'left',
    fontSize: 14,
    paddingVertical: 3,
    paddingLeft: 2,
  },
});
