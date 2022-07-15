import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppStylesheet from '../styles/AppStylesheet';

const PrivacyFooter = () => {
  const navigation = useNavigation();
  return (
    <>
      <Text style={styles.bodyText}>
        By signing up you agree to our{' '}
        <Text style={styles.linkText} onPress={() => navigation.navigate('TermsOfService')}>
          Terms of Service &nbsp;
        </Text>
        and{' '}
        <Text style={styles.linkText} onPress={() => navigation.navigate('PrivacyPolicy')}>
          Privacy Policy
        </Text>
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  privacyFooter: {
    flex: 1,
  },
  linkText: { color: '#fa2069' },
  bodyText: {
    alignSelf: 'center',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
  },
});

export default PrivacyFooter;
