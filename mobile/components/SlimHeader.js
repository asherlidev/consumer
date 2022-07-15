import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AppStylesheet from '../styles/AppStylesheet';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

export default function SlimHeader({ next, login, register, terms, lostPassword, showBackButton }) {
  const navigation = useNavigation();
  return (
    <View style={styles.headerWrapper}>
      {showBackButton ? (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            if (terms) {
              navigation.navigate('Login');
            }

            if (lostPassword || login) {
              next('login');
            }

            if (register) next('register');
          }}
        >
          <FontAwesome name="long-arrow-left" size={25} color={'#091d2c'} />
        </TouchableOpacity>
      ) : null}

      <View style={styles.logoWrapper}>
        <Image source={require('../assets/logoF.png')} style={styles.logo} />
      </View>

      <View style={styles.headerLinkWrapper}>
        <TouchableOpacity
          onPress={() => {
            if (terms) {
              navigation.navigate('Login');
            }

            if (lostPassword || login) {
              next('login');
            }

            if (register) {
              next('register');
            }
          }}
          style={styles.headerLinkButton}
        >
          <Text style={styles.headerLink}>{lostPassword || terms || login ? 'Log In' : 'Register'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    height: 100,
    paddingHorizontal: 20,
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerLink: {
    color: '#fa2069',
    fontWeight: 'bold',
  },
  headerLinkWrapper: { justifyContent: 'center', alignContent: 'center', alignItems: 'center' },
  headerLinkButton: { zIndex: 2 },
  backButton: { justifyContent: 'center', alignItems: 'center' },
  logoWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  logo: {
    alignSelf: 'center',
    height: 31 * 1.5,
    width: 40 * 1.5,
    resizeMode: 'contain',
  },
});
