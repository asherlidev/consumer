import React, { useEffect, useRef, useState } from 'react';
import { Avatar, List, Text } from 'react-native-paper';
import { connect } from 'react-redux';
import { View, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { bindActionCreators } from 'redux';
import { setLoadingRequest, setTokenRequest, setUserRequest } from '../store/actions/user.action';
import axios from 'axios';
import { APP_URL } from '@env';
import BottomNavigation from '../components/BottomNavigation';
import AppStylesheet from '../styles/AppStylesheet';

const Profile = (props) => {
  const navigation = useNavigation();
  const mounted = useRef(false);
  const logout = () => {
    props.setTokenRequest(false);
    props.setUserRequest(false);
  };
  const { user, token } = props.user;

  useEffect(() => {
    mounted.current = true;
    return () => (mounted.current = false);
  });

  useEffect(() => {
    // if no profile image, request it and store in local state
    if (mounted.current) {
      const { profile_img } = user;
      console.log(profile_img);
      if (!profile_img) {
        axios
          .get(`${APP_URL}/users/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            const { data } = response;
            props.setUserRequest(data);
          })
          .catch((error) => {
            console.log({ error });
          });
      }
    }
  }, []);

  return (
    <SafeAreaView style={AppStylesheet.safeArea}>
      <View style={styles.header}>
        <Image source={require('../assets/profileTopLeft.png')} style={styles.profileTopLeft} />

        {user.profile_img ? (
          <View style={styles.avatar}>
            <View style={{ borderRadius: 100 / 2, height: 80, width: 80, overflow: 'hidden' }}>
              <Image source={{ uri: user.profile_img.url }} style={styles.profileThumbnail} />
            </View>
          </View>
        ) : (
          <View style={styles.avatar}>
            <Avatar.Text
              size={80}
              label={user ? `${user.first_name[0].toUpperCase()}${user.last_name[0].toUpperCase()}` : null}
            />
          </View>
        )}

        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 21,
          }}
        >
          {user.first_name ? user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1) : null}
          &nbsp;
          {user.first_name ? user.last_name.charAt(0).toUpperCase() + user.last_name.slice(1) : null}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 16,
            color: '#454f57',
          }}
        >
          {user.credit_balance ? user.credit_balance : 0} Credits
        </Text>
      </View>
      <View style={AppStylesheet.horizontalLine}></View>

      <View style={styles.menuWrapper}>
        <ScrollView>
          <List.Item
            title="User settings"
            left={(props) => <List.Icon {...props} icon="account-outline" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {
              navigation.navigate('UserSettings');
            }}
          />
          <List.Item
            style={{ opacity: 0.4 }}
            title="Event Submit"
            disabled={true}
            left={(props) => <List.Icon {...props} icon="check" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />
          <List.Item
            style={{ opacity: 0.4 }}
            disabled={true}
            title="Influencer"
            left={(props) => <List.Icon {...props} icon="star-outline" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {
              navigation.navigate('SelectInterests');
            }}
          />
          <List.Item
            style={{ opacity: 0.4 }}
            title="FAQ"
            left={(props) => <List.Icon {...props} icon="help-circle-outline" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />
          <List.Item
            title="Connect with us"
            left={(props) => <List.Icon {...props} icon="email-outline" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {
              navigation.navigate('ConnectWithUs');
            }}
          />
          <List.Item
            title="Invite friends"
            left={(props) => <List.Icon {...props} icon="send" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {
              navigation.navigate('InviteFriends');
            }}
          />
          <List.Item
            title="Log out"
            onPress={() => logout()}
            left={(props) => <List.Icon {...props} icon="logout" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
          />
        </ScrollView>

        <Image
          source={require('../assets/profileBottomRight.png')}
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
          }}
        />
      </View>
      <BottomNavigation />
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setTokenRequest,
      setUserRequest,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const styles = StyleSheet.create({
  header: {
    flexShrink: 1,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    flex: 8,
    flexShrink: 1,
  },
  profileTopLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  profileThumbnail: { width: 80, height: 80, resizeMode: 'cover' },
  avatar: { flexShrink: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginVertical: 10 },
});
