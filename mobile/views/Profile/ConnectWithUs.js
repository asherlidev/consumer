import React from 'react';
import { Linking } from 'react-native';
import { Text } from 'react-native-paper';
import { connect } from 'react-redux';
import { ScrollView, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import AppStylesheet from '../../styles/AppStylesheet';

const ConnectWithUs = (props) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={AppStylesheet.innerViewContainer}>
      <View style={AppStylesheet.flex}>
        <KeyboardAvoidingView style={AppStylesheet.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView>
            <View style={AppStylesheet.innerViewContainer}>
              <View style={AppStylesheet.innerViewPadding}>
                <View style={AppStylesheet.innerPageBackButton}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Profile');
                    }}
                  >
                    <FontAwesome name="long-arrow-left" size={25} color={'#091d2c'} />
                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={AppStylesheet.pageTitle}>Connect With Us</Text>
                  <Text style={AppStylesheet.subtitle}>Feel free to contact us using one of our emails!</Text>
                </View>
              </View>
            </View>
            <View style={AppStylesheet.horizontalLine}></View>
            <View style={AppStylesheet.innerViewPadding}>
              <View style={styles.gap}>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(`mailto:support@festivalpass.com?&subject=${encodeURI('Support')}`);
                  }}
                >
                  <Text style={styles.emailLabel}>Support Center</Text>
                  <Text style={styles.emailLink}>support@festivalpass.com</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.gap}>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(`mailto:claiming@festivalpass.com?&subject=${encodeURI('Claim a festival')}`);
                  }}
                >
                  <Text style={styles.emailLabel}>Claiming festivals</Text>
                  <Text style={styles.emailLink}>claiming@festivalpass.com</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.gap}>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(`mailto:influencers@festivalpass.com?&subject=${encodeURI('Influencer')}`);
                  }}
                >
                  <Text style={styles.emailLabel}>For Influencers</Text>
                  <Text style={styles.emailLink}>influencers@festivalpass.com</Text>
                </TouchableOpacity>
              </View>

              <View>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(`mailto:partnership@festivalpass.com?&subject=${encodeURI('Partnership')}`);
                  }}
                >
                  <Text style={styles.emailLabel}>Partnership</Text>
                  <Text style={styles.emailLink}>partnership@festivalpass.com</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  gap: { marginVertical: 20 },
  label: {
    fontFamily: 'System',
    textAlign: 'left',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  emailLabel: { fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
  emailLink: { fontSize: 18, marginBottom: 20, textAlign: 'center' },
});

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

export default connect(mapStateToProps)(ConnectWithUs);
