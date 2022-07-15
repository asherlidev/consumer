import React, { useState } from 'react';
import { List, Text } from 'react-native-paper';
import { connect } from 'react-redux';
import { View, Image, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import AppStylesheet from '../../styles/AppStylesheet';
import BottomNavigation from '../../components/BottomNavigation';

const UserSettings = (props) => {
  const navigation = useNavigation();
  const { user, token } = props.user;

  return (
    <SafeAreaView style={AppStylesheet.innerViewContainer}>
      <View style={AppStylesheet.flex}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={12}>
          <ScrollView>
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
                <Text
                  style={{
                    textAlign: 'left',
                    fontWeight: '800',
                    fontSize: 32,
                    marginBottom: '3%',
                  }}
                >
                  User Settings
                </Text>
              </View>

              <View>
                <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Account Settings</Text>
                <List.Item
                  title="Personal Information"
                  right={(props) => <List.Icon {...props} icon="chevron-right" />}
                  onPress={() => {
                    navigation.navigate('PersonalInformation');
                  }}
                />
                <List.Item
                  title="Password"
                  right={(props) => <List.Icon {...props} icon="chevron-right" />}
                  onPress={() => {
                    navigation.navigate('ChangePassword');
                  }}
                />
              </View>
              <View style={{ borderBottomWidth: 1, marginVertical: 10, borderBottomColor: '#dbdbdb' }}></View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
      <BottomNavigation />
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

export default connect(mapStateToProps)(UserSettings);
