import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../components/AppButton';
import EmailLoginForm from '../components/EmailLoginForm';
import ResetPasswordForm from '../components/ResetPasswordForm';
import AppStylesheet from '../styles/AppStylesheet';
import PrivacyFooter from '../components/PrivacyFooter';
import { useNavigation } from '@react-navigation/native';
import * as Facebook from 'expo-auth-session/providers/facebook';
import * as WebBrowser from 'expo-web-browser';
import { FACEBOOK_APP_ID, APP_URL, REACT_APP_BACKEND_URL } from '@env';
import { ResponseType } from 'expo-auth-session';
import { bindActionCreators } from 'redux';
import { setLoadingRequest, setTokenRequest, setUserRequest } from '../store/actions/user.action';
import axios from 'axios';
import SlimHeader from '../components/SlimHeader';

import { FontAwesome } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import FormData from 'form-data';
import { checkIfLocationEnabled, GetCurrentLocation } from '../utils/location';

WebBrowser.maybeCompleteAuthSession();

const Login = (props) => {
  const [loginWithEmail, setLoginWithEmail] = useState(0);
  const [pageIndex, setPageIndex] = useState('login');
  const [zipcode, setZipcode] = useState(null);
  const navigation = useNavigation();
  const registerEndpoint = APP_URL + '/auth/local/register';

  const goTo = (index) => {
    setPageIndex(index);
    if (index == 'login') {
      setLoginWithEmail(false);
    }
  };

  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: FACEBOOK_APP_ID,
    responseType: ResponseType.Token,
  });

  useEffect(() => {
    (async () => {
      const isLocationEnabled = await checkIfLocationEnabled();
      if (isLocationEnabled) {
        const zipcode = await GetCurrentLocation();
        setZipcode(zipcode);
      }
    })();
  });

  useEffect(() => {
    if (response?.type === 'success') {
      props.setLoadingRequest(true);
      const { access_token } = response.params;
      console.log({ access_token });
      axios.get(`https://graph.facebook.com/v10.0/me?fields=id&access_token=${access_token}`).then((response) => {
        const { id } = response.data;
        axios
          .get(`${APP_URL}/auth/facebook/login/${access_token}`)
          .then((response) => {
            const { jwt, user } = response.data;
            props.setUserRequest(user);
            props.setTokenRequest(jwt);
            props.setLoadingRequest(false);
          })
          .catch((error) => {
            if (error.response.data.statusCode == 400) {
              axios
                .get(
                  `https://graph.facebook.com/v10.0/me?fields=id%2Cfirst_name%2Clast_name%2Cemail%2Cpicture.type(large)%2Clocation&access_token=${access_token}`
                )
                .then(async (response) => {
                  console.log('.then happening');
                  const { email, first_name, last_name, picture } = response.data;
                  let randomPassword =
                    Math.random().toString(36).substr(2, 6) +
                    Math.random().toString(36).substr(2, 6).toUpperCase() +
                    '$';

                  FileSystem.downloadAsync(`${picture.data.url}`, FileSystem.documentDirectory + 'profile.jpg').then(
                    async (response) => {
                      const { uri } = response;

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
                          const user_id = user['users-permissions_user_id']
                            ? user['users-permissions_user_id']
                            : user.id;

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
                        });
                    }
                  );
                })
                .catch((error) => {
                  console.log('facebook register fail');
                  props.setLoadingRequest(false);
                });
            } else {
              props.setLoadingRequest(false);
            }
          });
      });
    }
  }, [response]);

  return (
    <SafeAreaView style={AppStylesheet.innerViewContainer}>
      <KeyboardAvoidingView style={AppStylesheet.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={AppStylesheet.flex}>
          <View style={AppStylesheet.loginHeader}>
            {pageIndex == 'lost-password' ? (
              <SlimHeader next={goTo} login={true} lostPassword={true} showBackButton={true} />
            ) : (
              <>
                <View style={{ zIndex: 2, flexDirection: 'row' }}>
                  {loginWithEmail ? (
                    <TouchableOpacity
                      style={{ padding: 20, flex: 1 }}
                      onPress={() => {
                        setLoginWithEmail(false);
                      }}
                    >
                      <FontAwesome name="long-arrow-left" size={25} color={'#091d2c'} />
                    </TouchableOpacity>
                  ) : null}

                  <View style={AppStylesheet.headerLinkWrapper}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Register')}
                      style={AppStylesheet.touchableLink}
                    >
                      <Text style={AppStylesheet.headerLink}>Register</Text>
                    </TouchableOpacity>
                  </View>
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
              {pageIndex == 'lost-password' ? (
                <View>
                  <Text style={AppStylesheet.signUpTitle}>Forgot Password?</Text>
                  <Text style={AppStylesheet.bodyText}>
                    We'll send password reset instructions to the email address associated with your account.
                  </Text>
                </View>
              ) : (
                <View>
                  <Text style={AppStylesheet.signUpTitle}>{!loginWithEmail ? 'Log In' : 'Log In with email'}</Text>
                </View>
              )}

              {!loginWithEmail && !props.user.loading ? (
                <>
                  <AppButton
                    disabled={!request}
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
                      setLoginWithEmail(true);
                    }}
                  />
                </>
              ) : (
                <>
                  {pageIndex == 'lost-password' ? (
                    <ResetPasswordForm next={goTo} pageIndex={pageIndex} />
                  ) : (
                    <EmailLoginForm next={goTo} pageIndex={pageIndex} />
                  )}
                </>
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
  const { user, token } = state;
  return { user, token };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
