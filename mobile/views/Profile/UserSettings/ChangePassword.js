import React, { useEffect, useState } from 'react';
import { List, Text } from 'react-native-paper';
import { connect } from 'react-redux';
import {
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { Field, Formik } from 'formik';
import CustomInputField from '../../../components/CustomInputField';
import AppStylesheet from '../../../styles/AppStylesheet';
import AppButton from '../../../components/AppButton';
import * as Yup from 'yup';
import axios from 'axios';
import { APP_URL } from '@env';
import BottomNavigation from '../../../components/BottomNavigation';
import { bindActionCreators } from 'redux';
import { setLoadingRequest, setTokenRequest, setUserRequest } from '../../../store/actions/user.action';

const changePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required('Please Enter your new password')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    ),
  confirm_password: Yup.string()
    .required('Please confirm your new password')
    .oneOf([Yup.ref('password'), null], 'New passwords must match'),
});

const loginEndpointURL = APP_URL + '/auth/local';

const ChangePassword = (props) => {
  const navigation = useNavigation();
  const { user, token } = props.user;

  const updatePassword = async (values) => {
    props.setLoadingRequest(true);
    console.log(values);
    const user_id = user['users-permissions_user_id'] ? user['users-permissions_user_id'] : user.id;
    const email = user.email;
    console.log(email);
    const { password } = values;
    try {
      axios
        .put(
          `${APP_URL}/users/${user_id}`,
          {
            password: password,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          props.setLoadingRequest(false);
          console.log(response);
        })
        .catch((error) => {
          props.setLoadingRequest(false);
          console.log(error.message);
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={AppStylesheet.innerViewContainer}>
      <View style={AppStylesheet.flex}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={12}>
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
                      fontWeight: 'bold',
                      fontSize: 32,
                      marginBottom: 10,
                    }}
                  >
                    Change Password
                  </Text>
                </View>

                <View style={AppStylesheet.flex}>
                  <View>{props.user.loading ? <ActivityIndicator size="large" color="#091d2c" /> : null}</View>

                  {!props.user.loading ? (
                    <Formik
                      validationSchema={changePasswordSchema}
                      isValidating={true}
                      validateOnMount={true}
                      initialValues={{ password: '', confirm_password: '' }}
                      onSubmit={(values) => updatePassword(values)}
                    >
                      {({ errors, touched, handleChange, handleBlur, handleSubmit, values }) => (
                        <View>
                          <Text style={styles.label}>New password</Text>
                          <Field
                            component={CustomInputField}
                            name="password"
                            placeholder="Enter new password"
                            autoCapitalize="none"
                            autoCompleteType="off"
                            secureTextEntry
                          />
                          {/*<View style={AppStylesheet.inputWrapper}>*/}
                          {/*  <TextInput style={AppStylesheet.inputField} onChangeText={handleChange('password')} />*/}
                          {/*</View>*/}

                          <Text style={styles.label}>Confirm new password</Text>
                          <Field
                            component={CustomInputField}
                            name="confirm_password"
                            placeholder="Confirm your new password"
                            autoCompleteType="off"
                            autoCapitalize="none"
                            secureTextEntry
                          />

                          <AppButton
                            title="Save Changes"
                            bgColor={'#fa2069'}
                            textColor={'#fff'}
                            onPress={handleSubmit}
                          />

                          {errors.password && touched.password ? (
                            <Text style={AppStylesheet.errorText}>{errors.password}</Text>
                          ) : null}

                          {errors.confirm_password && touched.confirm_password ? (
                            <Text style={AppStylesheet.errorText}>{errors.confirm_password}</Text>
                          ) : null}
                        </View>
                      )}
                    </Formik>
                  ) : null}
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
});

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setLoadingRequest,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
