import React, { useEffect, useState } from 'react';
import { Text, ProgressBar, List, Avatar, Modal } from 'react-native-paper';
import { connect } from 'react-redux';
import {
  ScrollView,
  View,
  Image,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import AppStylesheet from '../../styles/AppStylesheet';
import AppButton from '../../components/AppButton';
import InstagramInvite from '../../components/InstagramInvite';
import BottomNavigation from '../../components/BottomNavigation';
import { useNavigation } from '@react-navigation/native';
import { APP_DOMAIN } from '@env';

const InviteFriends = (props) => {
  const { user } = props.user;
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [invite, setInvite] = useState(false);

  const showInvite = (invite) => {
    setInvite(invite);
    setVisible(true);
    console.log({ invite });
  };

  const hideInvite = () => {
    setInvite(false);
    setVisible(false);
  };
  return (
    <SafeAreaView style={AppStylesheet.innerViewContainer}>
      <>
        <Image
          style={{ position: 'absolute', right: 0, top: 0 }}
          source={require('../../assets/pathMobileMenu1.png')}
        />
      </>
      <View style={AppStylesheet.innerViewPadding}>
        <ScrollView>
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
            <Text style={styles.heading}>Invite friends</Text>
            <Text style={styles.subheading}>
              Don't leave your friends behind! Share your personal link or coupon code, invite friends & earn 6 bonus
              credits for each friend that joins!
            </Text>
          </View>
          <View style={styles.numberedListWrapper}>
            <View style={styles.numberedListContainer}>
              <View style={styles.numberWrap}>
                <Text style={styles.number}>1</Text>
              </View>
              <View style={styles.numberLabel}>
                <Text style={styles.numberLabelText}>Give friends 10% off with a coupon code</Text>
              </View>
            </View>
            <View style={styles.numberedListContainer}>
              <View style={styles.numberWrap}>
                <Text style={styles.number}>2</Text>
              </View>
              <View style={styles.numberLabel}>
                <Text style={styles.numberLabelText}>Friends subscribe with discount</Text>
              </View>
            </View>
            <View style={styles.numberedListContainer}>
              <View style={styles.numberWrap}>
                <Text style={styles.number}>3</Text>
              </View>
              <View style={styles.numberLabel}>
                <Text style={styles.numberLabelText}>Receive 6 bonus credits!</Text>
              </View>
            </View>
          </View>
          <View style={AppStylesheet.horizontalLine}></View>

          <View style={styles.verticalGap}>
            <Text style={styles.title}>Your unique referral coupon code</Text>
            <TextInput defaultValue={user.referral_code} style={styles.referralField}></TextInput>
          </View>
          <View style={styles.verticalGap}>
            <Text style={styles.title}>Your unique personal link</Text>
            <TextInput
              defaultValue={`https://${APP_DOMAIN}/?ref=${user.referral_code}`}
              style={styles.referralField}
            ></TextInput>
          </View>
          <View style={styles.shareButtonWrapper}>
            <TouchableOpacity
              onPress={() => {
                Share.share({
                  url: `https://${APP_DOMAIN}/?ref=${user.referral_code}`,
                  title: `${user.first_name} ${user.last_name} has invited to join FestivalPass!`,
                  message: `https://${APP_DOMAIN}/?ref=${user.referral_code}`,
                });
              }}
            >
              <View style={styles.shareButton}>
                <Text style={styles.shareButtonText}>SHARE</Text>
                <FontAwesome name={'share-alt'} size={26} color={'#454f57'} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.verticalGap}>
            {user.referrals.length > 0 ? (
              <>
                <View style={AppStylesheet.horizontalLine}></View>
                <Text style={styles.title}>Invited Friends</Text>
              </>
            ) : null}
            <View style={styles.invitedFriendsWrapper}>
              {user.referrals.length > 0
                ? user.referrals.map((referral, index) => {
                    console.log({ referral });
                    return (
                      <View style={styles.invitedFriend} key={index}>
                        <Avatar.Text
                          size={40}
                          label={`${referral.first_name ? referral.first_name[0] : null}${
                            referral.last_name ? referral.last_name[0] : null
                          }`}
                        />
                        <View style={styles.pushRight}>
                          <Text style={styles.invitedFriendText}>{`${
                            referral.first_name ? referral.first_name : null
                          } ${referral.last_name ? referral.last_name : null}`}</Text>
                          <Text style={styles.statusText}>{referral.confirmed ? 'Purchased' : 'Invited'}</Text>
                        </View>
                        <Text style={styles.creditText}>{referral.confirmed ? `+3 Credits` : null}</Text>
                      </View>
                    );
                  })
                : null}
            </View>
          </View>
        </ScrollView>
      </View>
      <BottomNavigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  heading: {
    textAlign: 'left',
    fontWeight: '800',
    fontSize: 32,
    marginBottom: 10,
  },
  title: { fontWeight: 'bold', fontSize: 18 },
  subheading: { fontSize: 18, textAlign: 'left', color: '#454f57', lineHeight: 26, marginBottom: 10 },
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
  numberedListWrapper: { flex: 1, flexDirection: 'column', marginVertical: 15 },
  numberedListContainer: { flex: 1, flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 },
  numberWrap: {
    width: 40,
    height: 40,
    borderWidth: 0.5,
    borderColor: '#b1b1b1',
    borderRadius: 100 / 2,
    justifyContent: 'center',
    marginRight: 10,
  },
  number: { color: '#fa2069', fontWeight: 'bold', fontSize: 18, textAlign: 'center' },
  numberLabel: { flex: 1, alignContent: 'center', justifyContent: 'center', padding: 5 },
  numberLabelText: { fontSize: 18 },
  shareButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#454f57',
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  shareButtonText: { marginRight: 9, fontWeight: 'bold', color: '#454f57', fontSize: 16 },
  verticalGap: {
    marginVertical: 15,
  },
  pushRight: {
    marginLeft: 12,
  },
  invitedFriendsWrapper: { flex: 1, flexDirection: 'column' },
  invitedFriend: { flex: 1, flexDirection: 'row', flexWrap: 'wrap', marginVertical: 20 },
  invitedFriendText: { fontWeight: '500', top: 0, position: 'absolute', color: 'rgb(9,29,44)' },
  creditText: { right: 0, position: 'absolute', color: 'rgb(250,32,105)' },
  statusText: { bottom: 0, position: 'absolute', color: 'rgb(125,131,137)' },
  shareButtonWrapper: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginVertical: 15 },
  progressBarLabel: { position: 'absolute', top: 4, left: 20, color: '#fff', fontWeight: 'bold' },
});

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

export default connect(mapStateToProps)(InviteFriends);
