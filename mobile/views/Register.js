import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../components/AppButton';
import AppStylesheet from '../styles/AppStylesheet';
import EmailRegisterForm from '../components/EmailRegisterForm';
import SlimHeader from '../components/SlimHeader';
import PrivacyFooter from '../components/PrivacyFooter';
import { connect } from 'react-redux';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import * as Facebook from 'expo-auth-session/providers/facebook';
import * as WebBrowser from 'expo-web-browser';
import { FACEBOOK_APP_ID, APP_URL } from '@env';
import { ResponseType } from 'expo-auth-session';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { setUserRequest, setTokenRequest, setLoadingRequest } from '../store/actions/user.action';
import * as FileSystem from 'expo-file-system';
import FormData from 'form-data';
import { checkIfLocationEnabled, GetCurrentLocation } from '../utils/location';
import { FontAwesome } from '@expo/vector-icons';

WebBrowser.maybeCompleteAuthSession();

const Register = (props) => {
  const navigation = useNavigation();
  const [pageIndex, setPageIndex] = useState('register');
  const registerEndpoint = APP_URL + '/auth/local/register';
  const [zipcode, setZipcode] = useState(null);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => (mounted.current = false);
  });

  const register = ({ id, email, first_name, last_name, zipcode, picture, access_token }) => {
    props.setLoadingRequest(true);
    let randomPassword =
      Math.random().toString(36).substr(2, 6) + Math.random().toString(36).substr(2, 6).toUpperCase() + '$';
    console.log(picture.data.url);
    FileSystem.downloadAsync(`${picture.data.url}`, FileSystem.documentDirectory + 'profile.jpg').then(
      async (response) => {
        const { uri } = response;
        console.log({ registerEndpoint });
        axios
          .post(registerEndpoint, {
            username: email,
            email: email,
            first_name: first_name,
            last_name: last_name,
            password: randomPassword,
            zipcode: zipcode,
            fbConnected: true,
          })
          .then(async (response) => {
            const data = response.data;
            const { user, jwt } = data;
            const user_id = user['users-permissions_user_id'] ? user['users-permissions_user_id'] : user.id;

            const formData = new FormData();
            formData.append('files', { uri, name: 'profile.jpg', type: 'image/jpeg' });
            formData.append('ref', 'user');
            formData.append('refId', user_id.toString());
            formData.append('source', 'users-permissions');
            formData.append('field', 'profile_img');
            console.log(formData);

            fetch(`${APP_URL}/upload`, {
              method: 'post',
              body: formData,
              headers: new Headers({
                Authorization: `Bearer ${jwt}`,
                'Content-Type': 'multipart/form-data',
              }),
            })
              .then((response) => {
                console.log(response.json());
                props.setUserRequest(user);
                props.setTokenRequest(jwt);
                props.setLoadingRequest(false);
              })
              .catch((error) => {
                console.log(error);
                props.setLoadingRequest(false);
              });
          })
          .catch((error) => {
            props.setLoadingRequest(false);
            console.log(error.response);
            axios
              .get(`https://graph.facebook.com/v10.0/me?fields=id&access_token=${access_token}`)
              .then((response) => {
                axios
                  .get(`${APP_URL}/auth/facebook/login/${access_token}`)
                  .then((response) => {
                    console.log({ response });
                    const { jwt, user } = response.data;
                    console.log({ jwt, user });
                    props.setUserRequest(user);
                    props.setTokenRequest(jwt);
                    props.setLoadingRequest(false);
                  })
                  .catch((error) => {
                    console.log(error);
                    console.log(error.response);
                    props.setLoadingRequest(false);
                  });
              })
              .catch((error) => {
                console.log(error.response);
                props.setLoadingRequest(false);
              });
          });
      }
    );
  };

  useEffect(() => {
    (async () => {
      const isLocationEnabled = await checkIfLocationEnabled();
      if (isLocationEnabled) {
        const zipcode = await GetCurrentLocation();
        if (mounted.current) {
          setZipcode(zipcode);
        }
      }
    })();
  });

  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: FACEBOOK_APP_ID,
    responseType: ResponseType.Token,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { access_token } = response.params;
      axios
        .get(
          `https://graph.facebook.com/v10.0/me?fields=id%2Cfirst_name%2Clast_name%2Cemail%2Cpicture.type(large)%2Clocation&access_token=${access_token}`
        )
        .then(async (response) => {
          const { id, email, first_name, last_name, picture } = response.data;
          register({ id, email, first_name, last_name, zipcode, picture, access_token });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [response]);

  const goTo = (index) => {
    setPageIndex(index);
  };

  return (
    <SafeAreaView style={AppStylesheet.innerViewContainer}>
      <KeyboardAvoidingView style={AppStylesheet.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={AppStylesheet.flex}>
          <View style={AppStylesheet.loginHeader}>
            {pageIndex != 'register' ? (
              <SlimHeader next={goTo} register={true} showBackButton={true} />
            ) : (
              <>
                <View style={AppStylesheet.headerLinkWrapper}>
                  <TouchableOpacity onPress={() => navigation.navigate('Login')} style={AppStylesheet.touchableLink}>
                    <Text style={AppStylesheet.headerLink}>Login</Text>
                  </TouchableOpacity>
                </View>
                <ImageBackground source={require('../assets/header-bg2.png')} style={AppStylesheet.bgShape}>
                  <Image source={require('../assets/header-bg1.png')} style={AppStylesheet.bgShapeTwo} />
                  <Image source={require('../assets/main-logo.png')} style={AppStylesheet.signUpLogo} />
                </ImageBackground>
              </>
            )}
          </View>

          <View style={AppStylesheet.loginBodySection}>
            <View style={AppStylesheet.flex}>
              {pageIndex == 'register' ? <Text style={AppStylesheet.signUpTitle}>Create an account</Text> : null}

              {pageIndex == 'email' ? (
                <>
                  <Text style={AppStylesheet.signUpTitle}>What's your email?</Text>
                  <Text style={styles.bodyText}>This will let you sign in to festivalPass</Text>
                </>
              ) : null}

              {pageIndex == 'name' ? <Text style={AppStylesheet.signUpTitle}>Enter your name</Text> : null}

              {pageIndex == 'zipcode' ? <Text style={AppStylesheet.signUpTitle}>Enter your Zip Code</Text> : null}

              {pageIndex == 'password' && !props.user.loading ? (
                <>
                  <Text style={AppStylesheet.signUpTitle}>Create a Password</Text>
                  <Text style={styles.bodyText}>Keep festivalPass secure</Text>
                </>
              ) : null}

              {pageIndex == 'register' && !props.user.loading ? (
                <>
                  <AppButton
                    title="Continue with facebook"
                    icon={'facebook'}
                    bgColor={'#2069fa'}
                    textColor={'#fff'}
                    iconColor={'#fff'}
                    onPress={() => {
                      promptAsync();
                    }}
                  />
                  <AppButton
                    title="Continue with email"
                    icon={'md-mail'}
                    bgColor={'#fa2069'}
                    textColor={'#fff'}
                    iconColor={'#fff'}
                    onPress={() => {
                      setPageIndex('email');
                    }}
                  />
                </>
              ) : (
                <EmailRegisterForm next={goTo} pageIndex={pageIndex} />
              )}
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
      <PrivacyFooter />
    </SafeAreaView>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setTokenRequest,
      setLoadingRequest,
      setUserRequest,
    },
    dispatch
  );

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: '3%',
  },
  bodyText: {
    alignSelf: 'center',
    width: '100%',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
  },
  alignBottom: {
    position: 'absolute',
    bottom: 0,
  },
});
