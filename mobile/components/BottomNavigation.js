import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import React from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';
import { connect } from 'react-redux';

const BottomNavigation = (props) => {
  const route = useRoute();
  const navigation = useNavigation();
  const iconSize = 26;
  const isChildOfProfile = (route) => {
    return route == 'Profile' || route == 'UserSettings' || route == 'PersonalInformation' || route == 'ChangePassword';
  };
  return (
    <SafeAreaView>
      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.bottomNavButton} disabled={true}>
          <View style={styles.disabledSvgWrapper}>
            <Svg width={iconSize} height={iconSize} xmlns="http://www.w3.org/2000/svg">
              <Path
                d="M19 8.71l-5.333-4.148a2.666 2.666 0 00-3.274 0L5.059 8.71a2.665 2.665 0 00-1.029 2.105v7.2a2 2 0 002 2h12a2 2 0 002-2v-7.2c0-.823-.38-1.6-1.03-2.105zM16 15c-2.21 1.333-5.792 1.333-8 0"
                stroke={`#091D2C`}
                strokeWidth="1.5"
              />
            </Svg>
          </View>
          <Text style={styles.disabledBottomNavLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomNavButton} disabled={true}>
          <View style={styles.disabledSvgWrapper}>
            <Svg width={iconSize} height={iconSize} xmlns="http://www.w3.org/2000/svg">
              <Path
                d="M10.8421 17.6842C14.6209 17.6842 17.6842 14.6209 17.6842 10.8421C17.6842 7.06331 14.6209 4 10.8421 4C7.06331 4 4 7.06331 4 10.8421C4 14.6209 7.06331 17.6842 10.8421 17.6842Z"
                stroke={`#091D2C`}
                strokeWidth="1.5"
              />
              <Path d="M20.2499 20.2499L15.9736 15.9736" stroke={`#091D2C`} strokeWidth="1.5" />
            </Svg>
          </View>
          <Text style={styles.disabledBottomNavLabel}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomNavButton} disabled={true}>
          <View style={styles.disabledSvgWrapper}>
            <Svg width={iconSize} height={iconSize} xmlns="http://www.w3.org/2000/svg">
              <Path d="M4 5H6" stroke={`#091D2C`} strokeWidth="1.5" />
              <Path d="M5 4V6" stroke={`#091D2C`} strokeWidth="1.5" />
              <Path d="M11.5 4L11 6" stroke={`#091D2C`} strokeWidth="1.5" />
              <Path d="M18 5H20" stroke={`#091D2C`} strokeWidth="1.5" />
              <Path d="M19 4V6" stroke={`#091D2C`} strokeWidth="1.5" />
              <Path d="M15 9L14 10" stroke={`#091D2C`} strokeWidth="1.5" />
              <Path d="M18 13L20 12.5" stroke={`#091D2C`} strokeWidth="1.5" />
              <Path d="M18 19H20" stroke={`#091D2C`} strokeWidth="1.5" />
              <Path d="M19 18V20" stroke={`#091D2C`} strokeWidth="1.5" />
              <Path
                d="M14 16.518L7.48203 10L3.09203 19.58C3.00709 19.766 2.98104 19.9735 3.01734 20.1747C3.05365 20.376 3.15059 20.5613 3.29518 20.7058C3.43976 20.8504 3.62508 20.9474 3.8263 20.9837C4.02752 21.02 4.23503 20.9939 4.42103 20.909L14 16.519V16.518Z"
                stroke={`#091D2C`}
                strokeWidth="1.5"
              />
            </Svg>
          </View>
          <Text style={styles.disabledBottomNavLabel}>Events</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomNavButton} onPress={() => navigation.navigate('MyTickets')}>
          <View style={styles.svgWrapper}>
            <Svg width={iconSize} height={iconSize} fill="none" xmlns="http://www.w3.org/2000/svg">
              <Path
                d="M9.592 6.037l1.297 1.296M13.482 9.926l1.296 1.296M17.37 13.815l1.297 1.296M3.11 12.518l9.075-9.074a1.833 1.833 0 012.593 0l1.945 1.944a1.833 1.833 0 002.593 2.593l1.944 1.945a1.833 1.833 0 010 2.592l-9.075 9.075a1.834 1.834 0 01-2.592 0l-1.945-1.945a1.834 1.834 0 00-2.593-2.592L3.111 15.11a1.833 1.833 0 010-2.593"
                stroke={route.name == 'MyTickets' ? `#F50756` : `#091D2C`}
                strokeWidth="1.5"
              />
            </Svg>
          </View>
          <Text style={[styles.bottomNavLabel, { fontWeight: route.name == 'MyTickets' ? '700' : null }]}>
            MyTickets
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomNavButton}
          onPress={() => {
            navigation.navigate('Profile');
          }}
        >
          <View style={styles.svgWrapper}>
            {/*<Svg width={iconSize} height={iconSize} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">*/}
            {/*  <Path*/}
            {/*    d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"*/}
            {/*    fill="#091D2C"*/}
            {/*    stroke={isChildOfProfile(route.name) ? `#F50756` : `#091D2C`}*/}
            {/*    strokeWidth="1.5"*/}
            {/*  />*/}
            {/*  <Path*/}
            {/*    d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"*/}
            {/*    fill="#091D2C"*/}
            {/*    stroke={isChildOfProfile(route.name) ? `#F50756` : `#091D2C`}*/}
            {/*    strokeWidth="1.5"*/}
            {/*  />*/}
            {/*  <Path*/}
            {/*    d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"*/}
            {/*    stroke={isChildOfProfile(route.name) ? `#F50756` : `#091D2C`}*/}
            {/*    strokeWidth="1.5"*/}
            {/*  />*/}
            {/*</Svg>*/}

            <Svg width={iconSize} height={iconSize} xmlns="http://www.w3.org/2000/svg">
              <Path
                fill={isChildOfProfile(route.name) ? `#F50756` : `#091D2C`}
                strokeWidth="1"
                d="M12 4A4 4 0 0 1 16 8A4 4 0 0 1 12 12A4 4 0 0 1 8 8A4 4 0 0 1 12 4M12 6A2 2 0 0 0 10 8A2 2 0 0 0 12 10A2 2 0 0 0 14 8A2 2 0 0 0 12 6M12 13C14.67 13 20 14.33 20 17V20H4V17C4 14.33 9.33 13 12 13M12 14.9C9.03 14.9 5.9 16.36 5.9 17V18.1H18.1V17C18.1 16.36 14.97 14.9 12 14.9Z"
              />
            </Svg>
          </View>
          <Text
            style={[
              styles.bottomNavLabel,
              {
                fontWeight: isChildOfProfile(route.name) ? '700' : null,
              },
            ]}
          >
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

export default connect(mapStateToProps)(BottomNavigation);

const styles = StyleSheet.create({
  svgWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    paddingTop: '3%',
    alignItems: 'center',
  },
  disabledSvgWrapper: {
    flex: 1,
    opacity: 0.2,
    paddingTop: '3%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  bottomNavigation: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingVertical: 5,
    position: 'absolute',
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  bottomNavButton: {
    flexGrow: 1,
    backgroundColor: 'transparent',
  },
  bottomNavLabel: {
    color: '#091D2C',
    textAlign: 'center',
    fontSize: 9,
  },
  disabledBottomNavLabel: {
    opacity: 0.2,
    color: '#091D2C',
    textAlign: 'center',
    fontSize: 9,
  },
  bottomNavIcon: { alignSelf: 'center' },
});
