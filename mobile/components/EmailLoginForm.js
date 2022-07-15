import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
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
import PrivacyFooter from './PrivacyFooter';

const LoginSchema = Yup.object().shape({
  email: Yup.string().required('Valid e-mail required.').email('Invalid email'),
  password: Yup.string().required('Please Enter your password'),
});

const loginEndpointURL = APP_URL + '/auth/local';

const EmailLoginForm = (props) => {
  const [submitError, setSubmitError] = useState(null);
  const { next, pageIndex } = props;
  const login = ({ email, password }) => {
    props.setLoadingRequest(true);
    try {
      axios
        .post(loginEndpointURL, {
          identifier: email.toLowerCase(),
          password: password,
        })
        .then((response) => {
          console.log({ response });
          const data = response.data;
          const { user, jwt } = data;
          props.setUserRequest(user);
          props.setTokenRequest(jwt);
          props.setLoadingRequest(false);
        })
        .catch((error) => {
          props.setLoadingRequest(false);
          // console.log({ error });
          if (error) {
            setSubmitError(error.response.data.message[0].messages[0].message);
          }
        });
    } catch (e) {
      props.setLoadingRequest(false);
      console.log(e);
    }
  };

  const goTo = (index) => {
    next(index);
  };

  return (
    <View style={AppStylesheet.flex}>
      <View>{props.user.loading ? <ActivityIndicator size="large" color="#091d2c" /> : null}</View>
      {!props.user.loading ? (
        <Formik
          initialValues={{ email: '' }}
          isValidating={true}
          validationSchema={LoginSchema}
          onSubmit={(values) => login(values)}
        >
          {({ errors, touched, handleChange, handleBlur, handleSubmit, values }) => (
            <View style={AppStylesheet.shrinkFlex}>
              <View style={AppStylesheet.inputWrapper}>
                <Field
                  component={CustomInputField}
                  name="email"
                  placeholder="Email address"
                  autoCapitalize="none"
                  autoCompleteType="off"
                />
              </View>

              <View style={AppStylesheet.inputWrapper}>
                <Field
                  component={CustomInputField}
                  name="password"
                  placeholder="Enter your password"
                  autoCapitalize="none"
                  autoCompleteType="off"
                  secureTextEntry
                />
                <Text style={styles.forgotPasswordLink} onPress={() => next('lost-password')}>
                  FORGOT?
                </Text>
              </View>

              <AppButton title="Log In" bgColor={'#fa2069'} textColor={'#fff'} onPress={handleSubmit} />

              {errors.email && touched.email ? <Text style={AppStylesheet.errorText}>{errors.email}</Text> : null}
              {errors.password && touched.email ? <Text style={AppStylesheet.errorText}>{errors.password}</Text> : null}
              {submitError ? <Text style={AppStylesheet.errorText}>{submitError} </Text> : null}
            </View>
          )}
        </Formik>
      ) : null}
      <View style={AppStylesheet.goBackLink}>
        <TouchableOpacity>
          <Text
            style={AppStylesheet.textLink}
            onPress={() => {
              goTo('login');
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
  forgotPasswordLink: { position: 'absolute', right: '5%', top: '33%', fontWeight: 'bold' },
});
