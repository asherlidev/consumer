import { ImageBackground, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import React from 'react';
import AppStylesheet from '../styles/AppStylesheet';
import AppButton from './AppButton';

const InstagramInvite = () => {
  return (
    <View style={AppStylesheet.shrinkFlex}>
      <ImageBackground source={require('../assets/bgItem2.png')} style={{ resizeMode: 'cover' }}>
        <View>
          <Text style={styles.title}>Share on Instagram and get 6 additional credits</Text>
          <Text style={styles.subtitle}>
            Don’t leave your friends behind! Share your personal link or coupon code, invite friends & earn 6 bonus
            credits for each friend that joins!
          </Text>
        </View>
        <View style={styles.numberedListWrapper}>
          <View style={styles.numberedListContainer}>
            <View style={styles.numberWrap}>
              <Text style={styles.number}>1</Text>
            </View>
            <View style={styles.numberLabel}>
              <Text style={styles.numberLabelText}>
                <Text style={{ fontWeight: '700', color: '#fa2069' }}>Download</Text> your story image with personal
                promo code
              </Text>
            </View>
          </View>
          <View style={styles.numberedListContainer}>
            <View style={styles.numberWrap}>
              <Text style={styles.number}>2</Text>
            </View>
            <View style={styles.numberLabel}>
              <Text style={styles.numberLabelText}>
                <Text style={{ fontWeight: '700' }}>Share</Text> your story in instagram with{' '}
                <Text
                  style={{
                    color: '#2069fa',
                    backgroundColor: 'rgba(32,105,250,0.25)',
                    fontWeight: '700',
                  }}
                >
                  @festivalPass
                </Text>{' '}
                tag to get 6 additional credits
              </Text>
            </View>
          </View>
          <View style={styles.numberedListContainer}>
            <View style={styles.numberWrap}>
              <Text style={styles.number}>3</Text>
            </View>
            <View style={styles.numberLabel}>
              <Text style={styles.numberLabelText}>
                <Text style={{ fontWeight: '700' }}>Get 6 credits</Text> for each friend that joins with your promocode!
              </Text>
            </View>
          </View>
        </View>
        <View>
          <AppButton title="Download Story Image" bgColor={'#fa2069'} textColor={'white'} />
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  title: { fontWeight: '800', fontSize: 32, lineHeight: 32 },
  subtitle: {
    marginVertical: '2%',
    fontSize: 16,
    color: '#454f57',
  },
  referralField: {
    paddingVertical: 10,
    marginVertical: 10,
    fontWeight: '500',
    color: '#2069fa',
    fontSize: 18,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(32,105,250,0.1)',
    borderRadius: 20,
  },
  socialButton: {
    marginRight: 12,
  },
  numberedListWrapper: { flexDirection: 'column', marginBottom: '5%' },
  numberedListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: '2%',
    alignContent: 'center',
    justifyContent: 'center',
  },
  numberWrap: {
    width: 40,
    height: 40,
    borderWidth: 0.5,
    borderColor: '#b1b1b1',
    borderRadius: 100 / 2,
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    marginHorizontal: '1%',
  },
  number: { color: '#fa2069', fontWeight: 'bold', fontSize: 18, textAlign: 'center' },
  numberLabel: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    padding: '1%',
    flexDirection: 'row',
  },
  numberLabelText: { fontSize: 18, flex: 1, color: '#454f57', lineHeight: 26 },
});

export default InstagramInvite;
