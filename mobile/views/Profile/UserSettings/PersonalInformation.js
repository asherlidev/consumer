import React, { useEffect, useState } from 'react';
import { Text } from 'react-native-paper';
import { connect } from 'react-redux';
import {
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { Field, Formik } from 'formik';
import CustomInputField from '../../../components/CustomInputField';
import AppStylesheet from '../../../styles/AppStylesheet';
import AppButton from '../../../components/AppButton';
import axios from 'axios';
import { APP_URL } from '@env';
import BottomNavigation from '../../../components/BottomNavigation';
import * as ImagePicker from 'expo-image-picker';
import FormData from 'form-data';
import { setLoadingRequest, setUserRequest } from '../../../store/actions/user.action';
import { bindActionCreators } from 'redux';

const PersonalInformation = (props) => {
  const navigation = useNavigation();
  const { user, token } = props.user;
  console.log({ user });
  const user_id = user['users-permissions_user_id'] ? user['users-permissions_user_id'] : user.id;

  console.log(user['users-permissions_user_id']);
  console.log(user_id);
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  });

  const updateUser = (values) => {
    props.setLoadingRequest(true);
    console.log(`${APP_URL}/users/${user_id}`);
    axios
      .put(`${APP_URL}/users/${user_id}`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        props.setLoadingRequest(false);
        const { data } = response;
        props.setUserRequest(data);
        props.setLoadingRequest(false);
      })
      .catch((error) => {
        props.setLoadingRequest(false);
        // console.log(error.response);
      });
  };

  const uploadPhoto = async () => {
    props.setLoadingRequest(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      const { uri } = result;
      const data = new FormData();
      data.append('files', { uri, name: 'profile.jpg', type: 'image/jpeg' });
      data.append('ref', 'user');
      data.append('refId', user_id.toString());
      data.append('source', 'users-permissions');
      data.append('field', 'profile_img');
      console.log({ user_id });
      fetch(`${APP_URL}/upload`, {
        method: 'post',
        body: data,
        headers: new Headers({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }),
      })
        .then((response) => {
          console.log(response.json());
          axios
            .get(`${APP_URL}/users/me`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              const { data } = response;
              props.setUserRequest(data);
              props.setLoadingRequest(false);
            })
            .catch((error) => {
              props.setLoadingRequest(false);
              console.log(error.response);
            });
        })
        .catch((error) => {
          props.setLoadingRequest(false);
          console.log(error);
        });
    } else {
      props.setLoadingRequest(false);
    }
  };

  const deletePhoto = () => {
    // props.setLoadingRequest(true);
    const profilePicId = user.profile_img.id;
    console.log({ profilePicId });
    axios
      .delete(`${APP_URL}/upload/files/${profilePicId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        console.log(response.message);
        console.log(response.data);
        axios
          .get(`${APP_URL}/users/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            const { data } = response;
            props.setUserRequest(data);
            props.setLoadingRequest(false);
          })
          .catch((error) => {
            props.setLoadingRequest(false);
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
        console.log(error.message);
      });
  };

  return (
    <SafeAreaView style={AppStylesheet.innerViewContainer}>
      <View style={AppStylesheet.flex}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 32 : 100}
        >
          <ScrollView>
            <View style={AppStylesheet.innerViewContainer}>
              <View style={AppStylesheet.innerViewPadding}>
                <View style={AppStylesheet.innerPageBackButton}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('UserSettings');
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
                      marginBottom: 10,
                    }}
                  >
                    Personal Information
                  </Text>
                </View>

                <View style={AppStylesheet.flex}>
                  <View>{props.user.loading ? <ActivityIndicator size="large" color="#091d2c" /> : null}</View>

                  <View>
                    {!props.user.loading ? (
                      <Formik
                        enableReinitialize={true}
                        initialValues={{ email: user.username, first_name: user.first_name, last_name: user.last_name }}
                        isValidating={true}
                        onSubmit={(values) => updateUser(values)}
                      >
                        {({ errors, touched, handleChange, handleBlur, handleSubmit, values }) => (
                          <View>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                              {user.profile_img ? (
                                <View style={{ marginRight: '2%', justifyContent: 'center' }}>
                                  <View style={styles.thumbnailWrapper}>
                                    <Image source={{ uri: user.profile_img.url }} style={styles.thumbnail} />
                                  </View>
                                </View>
                              ) : null}
                              <View style={{ flex: 1, flexDirection: 'column' }}>
                                <View>
                                  <AppButton
                                    title="Upload"
                                    bgColor={'#fa2069'}
                                    textColor={'#ffffff'}
                                    onPress={() => uploadPhoto()}
                                  />
                                </View>

                                {user.profile_img ? (
                                  <View>
                                    <AppButton
                                      title="Delete"
                                      bgColor={'#fff'}
                                      textColor={'#454f57'}
                                      outline={true}
                                      outlineColor={'#dbdbdb'}
                                      onPress={() => deletePhoto()}
                                    />
                                  </View>
                                ) : null}
                              </View>
                            </View>
                            <View>
                              <Text style={styles.label}>First Name</Text>
                              <Field
                                component={CustomInputField}
                                name="first_name"
                                autoCapitalize="words"
                                autoComplete="on"
                              />
                            </View>
                            <View>
                              <Text style={styles.label}>Last Name</Text>
                              <Field
                                component={CustomInputField}
                                name="last_name"
                                autoCapitalize="words"
                                autoComplete="on"
                              />
                            </View>
                            <View>
                              <Text style={styles.label}>Email</Text>
                              <Field component={CustomInputField} name="email" autoComplete="on" />
                            </View>
                            <View style={{ marginVertical: '8%' }}>
                              <AppButton
                                title="Save Changes"
                                bgColor={'#fa2069'}
                                textColor={'#fff'}
                                onPress={handleSubmit}
                              />
                            </View>
                          </View>
                        )}
                      </Formik>
                    ) : null}
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
      <BottomNavigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: 'System',
    textAlign: 'left',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  thumbnailWrapper: {
    borderRadius: 100 / 2,
    height: 100,
    width: 100,
    overflow: 'hidden',
  },
  thumbnail: { width: 100, height: 100, resizeMode: 'cover', zIndex: 2 },
});

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setLoadingRequest,
      setUserRequest,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInformation);
