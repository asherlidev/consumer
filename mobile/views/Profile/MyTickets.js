import React, { useEffect, useRef, useState } from 'react';
import { Text, Avatar, Modal } from 'react-native-paper';
import { connect } from 'react-redux';
import { ScrollView, View, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import AppStylesheet from '../../styles/AppStylesheet';
import AppButton from '../../components/AppButton';
import BottomNavigation from '../../components/BottomNavigation';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import moment from 'moment';
import { APP_URL } from '@env';
moment.locale('en');

const MyTickets = (props) => {
  const [visible, setVisible] = useState(false);
  const [ticket, setTicket] = useState(false);
  const [tickets, setTickets] = useState([]);
  const { user, token } = props.user;
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    return () => (mounted.current = false);
  });

  useEffect(() => {
    if (mounted.current) {
      try {
        axios
          .get(`${APP_URL}/users/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            const { data } = response;
            const { tickets } = data;
            if (mounted.current) {
              setTickets(tickets);
            }
          })
          .catch((error) => {
            console.log({ error });
            console.log(error.response);
          });
      } catch (e) {
        console.log(e);
      }
    }
  });

  const showTicket = (ticket) => {
    setTicket(ticket);
    setVisible(true);
  };

  const hideTicket = () => {
    setTicket(false);
    setVisible(false);
  };
  const navigation = useNavigation();
  return (
    <SafeAreaView style={AppStylesheet.innerViewContainer}>
      <View style={styles.myTicketsContainer}>
        <TouchableOpacity
          style={{ justifyContent: 'center' }}
          onPress={() => {
            navigation.navigate('Profile');
          }}
        >
          <Image source={require('../../assets/small-logo.png')} style={AppStylesheet.selfCenter} />
        </TouchableOpacity>
        {user.profile_img ? (
          <Avatar.Image size={50} source={{ uri: user.profile_img.url }} style={AppStylesheet.selfCenter} />
        ) : (
          <Avatar.Text
            style={AppStylesheet.selfCenter}
            size={50}
            label={user ? `${user.first_name[0].toUpperCase()}${user.last_name[0].toUpperCase()}` : null}
          />
        )}
      </View>
      <View style={styles.eventsOuterWrapper}>
        <View style={{ paddingHorizontal: 20, marginTop: '3%' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 28 }}>Upcoming events</Text>
        </View>
        <ScrollView style={styles.eventsWrapper}>
          {tickets.length > 0 ? (
            tickets.map((ticket, index) => {
              let time = ticket.event_date;

              return (
                <View style={{ borderRadius: 20, overflow: 'hidden' }} key={index}>
                  <View style={{ minHeight: 175 }}>
                    <ImageBackground
                      source={require('../../assets/eventbg.png')}
                      style={{ resizeMode: 'cover', flex: 1 }}
                    >
                      {time ? (
                        <>
                          <View style={styles.dateWrapper}>
                            <Text style={styles.dateTopBottomText}>{moment(time).format('ddd').toUpperCase()}</Text>
                            <Text style={styles.dateMiddleText}>{moment(time).format('DD')}</Text>
                            <Text style={styles.dateTopBottomText}>{moment(time).format('MMM').toUpperCase()}</Text>
                          </View>
                        </>
                      ) : null}
                    </ImageBackground>
                  </View>
                  <View style={{ padding: '3%', backgroundColor: '#fff' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, lineHeight: 32 }}>
                      {tickets[index].festival_name ? tickets[index].festival_name : null}
                    </Text>

                    {tickets[index].description ? (
                      <>
                        <Text style={{ fontSize: 16, color: '#091D2C', fontWeight: '300', lineHeight: 24 }}>
                          {tickets[index].description}
                        </Text>
                        <View style={[AppStylesheet.horizontalLine, { marginVertical: 20 }]}></View>
                      </>
                    ) : null}

                    <AppButton
                      textColor={'#000'}
                      bgColor={'rgba(196, 196, 196, 0.2)'}
                      title={'View ticket'}
                      onPress={() => {
                        showTicket(tickets[index]);
                      }}
                    />
                  </View>
                </View>
              );
            })
          ) : (
            <Text>No tickets found...</Text>
          )}
        </ScrollView>
      </View>

      <Modal visible={visible} onDismiss={hideTicket} contentContainerStyle={styles.modalContainerStyling}>
        <TouchableOpacity onPress={hideTicket} style={{ position: 'absolute', right: '2%', top: '2%' }}>
          <FontAwesome name={'times-circle'} size={32} color={'#F50756'} />
        </TouchableOpacity>
        <View style={{ paddingHorizontal: '5%' }}>
          <Text style={{ color: '#F50756', fontWeight: '700', fontSize: 26, marginBottom: 15 }}>
            {ticket.title ? ticket.title : null}
          </Text>
        </View>
        <View style={styles.fullWidthDivider} />
        <View style={styles.innerModal}>
          <View style={{ padding: '5%' }}>
            <Image source={require('../../assets/qrcode.png')} style={{ alignSelf: 'center' }} />
            <Text style={{ alignSelf: 'center', marginVertical: 10, fontSize: 12, fontWeight: '200' }}>
              {ticket.id ? ticket.id : null}
            </Text>
          </View>

          <Text style={{ fontSize: 24, fontWeight: '500', alignSelf: 'center', marginBottom: 10 }}>
            {ticket.title ? ticket.title : null}
          </Text>

          {ticket.seat ? (
            <>
              <Text style={styles.ticketLabel}>Seat</Text>
              <Text style={styles.ticketData}>{ticket.seat}</Text>
            </>
          ) : null}

          <Text style={styles.ticketLabel}>Name</Text>
          <Text style={styles.ticketData}>{ticket.name ? ticket.name : null}</Text>
          <Image
            source={require('../../assets/logo-black.png')}
            style={{ width: 80, height: 20, alignSelf: 'center', marginVertical: 10 }}
          />
        </View>
        <View
          style={{
            marginVertical: 10,
            padding: '2%',
            marginHorizontal: '15%',
            backgroundColor: '#000',
            borderRadius: 10,
            overflow: 'hidden',
            alignItems: 'center',
          }}
        >
          <Image source={require('../../assets/apple_wallet.png')} />
        </View>
        <View style={{ paddingHorizontal: '15%' }}>
          <AppButton
            outline={true}
            title="Invite Friend"
            outlineColor={'rgba(9, 29, 44, 0.3)'}
            textColor={'rgba(9, 29, 44, 0.6)'}
          />
        </View>
      </Modal>
      <BottomNavigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  myTicketsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  innerModal: {
    minHeight: '50%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.3)',
    width: '70%',
    marginTop: '6%',
    marginBottom: '3 vbvn,m %',
    paddingBottom: '5%',
  },
  ticketLabel: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '300',
  },
  ticketData: {
    marginBottom: 8,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
  },
  fullWidthDivider: { borderBottomWidth: 1, marginHorizontal: 0, borderBottomColor: '#dbdbdb', width: '100%' },
  eventsWrapper: {
    marginTop: '3%',
    paddingHorizontal: 20,
    flex: 1,
    flexDirection: 'column',
  },
  dateWrapper: {
    flex: 1,
    backgroundColor: '#F50756',
    padding: '10%',
    position: 'absolute',
    top: 15,
    left: 15,
    width: 80,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateTopBottomText: {
    textAlign: 'center',
    fontWeight: '500',
    color: 'rgba(255,255,255,.7)',
  },
  dateMiddleText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 28,
    lineHeight: 32,
    fontWeight: '800',
  },
  eventsOuterWrapper: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  modalContainerStyling: {
    backgroundColor: 'white',
    position: 'absolute',
    paddingTop: '10%',
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
  },
});

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

export default connect(mapStateToProps)(MyTickets);
