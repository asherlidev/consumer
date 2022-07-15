import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Formik, Field } from 'formik';
import CustomInputField from './CustomInputField';
import AppButton from './AppButton';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUserRequest, setTokenRequest, setLoadingRequest } from '../store/actions/user.action';
import { APP_URL } from '@env';
import * as Yup from 'yup';
import AppStylesheet from '../styles/AppStylesheet';

const LoginSchema = Yup.object().shape({
  email: Yup.string().required('Valid e-mail required.').email('Invalid email'),
});

// const forgotPasswordUrl = APP_URL + '/auth/forgot-password';
const forgotPasswordUrl = 'http://localhost:1337/auth/forgot-password';

const EmailLoginForm = (props) => {
  const [message, setMessage] = useState(null);
  // const { next, pageIndex } = props;
  const resetPasswordLink = ({ email }) => {
    console.log();
    props.setLoadingRequest(true);
    axios
      .post(forgotPasswordUrl, {
        email: email.toLowerCase(),
      })
      .then((response) => {
        // user received password reset link
        setMessage('User received password reset link.');
      })
      .catch((error) => {
        console.log('there has been an error: ', error);
        props.setLoadingRequest(false);
      });
  };

  return (
    <View style={AppStylesheet.innerViewContainer}>
      {props.user.loading ? <ActivityIndicator size="large" color="#091d2c" /> : null}

      {!props.user.loading ? (
        <Formik
          initialValues={{ email: '' }}
          isValidating={true}
          validationSchema={LoginSchema}
          onSubmit={(values) => resetPasswordLink(values)}
        >
          {({ errors, touched, handleChange, handleBlur, handleSubmit, values }) => (
            <View style={AppStylesheet.shrinkFlex}>
              <Field
                component={CustomInputField}
                name="email"
                placeholder="Email address"
                autoCapitalize="none"
                autoCompleteType="off"
              />
              <AppButton title="Reset Password" bgColor={'#fa2069'} onPress={handleSubmit} textColor={'#fff'} />
              {errors.email && touched.email ? <Text style={AppStylesheet.errorText}>{errors.email}</Text> : null}
              {message ? <Text style={AppStylesheet.errorText}>{message}</Text> : null}
            </View>
          )}
        </Formik>
      ) : null}
      <View style={AppStylesheet.goBackLink}>
        <TouchableOpacity>
          <Text
            style={AppStylesheet.textLink}
            onPress={() => {
              props.next('login');
            }}
          >
            Go Back
          </Text>
        </TouchableOpacity>
      </View>
    </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(EmailLoginForm);

const styles = StyleSheet.create({
  inputField: {
    height: 62,
    color: '#7d8389',
    fontSize: 18,
    paddingHorizontal: 20,
    backgroundColor: '#f2f2f2',
  },
  inputWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
    height: 62,
    marginBottom: 20,
    display: 'flex',
    justifyContent: 'center',
  },
  forgotPasswordLink: { position: 'absolute', right: 10, top: 30, fontWeight: 'bold' },
});
