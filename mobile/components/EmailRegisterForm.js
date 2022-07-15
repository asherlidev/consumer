import React, { useState, useEffect, useRef } from 'react';
import { Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Formik, Field } from 'formik';
import AppButton from './AppButton';
import CustomInputField from './CustomInputField';
import axios from 'axios';
import * as Yup from 'yup';
import AppStylesheet from '../styles/AppStylesheet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUserRequest, setTokenRequest, setLoadingRequest } from '../store/actions/user.action';
import { APP_URL } from '@env';
import { useNavigation } from '@react-navigation/native';
import { checkIfLocationEnabled, GetCurrentLocation } from '../utils/location';
import PrivacyFooter from './PrivacyFooter';

const SignupSchema = Yup.object().shape({
  email: Yup.string().required('Valid e-mail required.').email('Invalid email'),
  zipcode: Yup.string()
    .required()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(5, 'Must be exactly 5 digits')
    .max(5, 'Must be exactly 5 digits'),
  password: Yup.string()
    .required('Please Enter your password')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    ),
  confirm_password: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
});

const registerEndpoint = APP_URL + '/auth/local/register';

const EmailRegisterForm = (props) => {
  const { next, pageIndex } = props;
  const [submitError, setSubmitError] = useState(null);
  const [zipcode, setZipcode] = useState(null);
  const navigation = useNavigation();
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => (mounted.current = false);
  });

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

  const register = (values) => {
    props.setLoadingRequest(true);
    const { email, firstName, lastName, password, zipcode } = values;
    axios
      .post(registerEndpoint, {
        username: email,
        email: email,
        first_name: firstName,
        last_name: lastName,
        password: password,
        zipcode: zipcode,
      })
      .then((response) => {
        const data = response.data;
        const { user, jwt } = data;
        props.setLoadingRequest(false);
        props.setUserRequest(user);
        props.setTokenRequest(jwt);
      })
      .catch((error) => {
        props.setLoadingRequest(false);
        if (error) {
          setSubmitError(error.response.data.message[0].messages[0].message);
        }
        console.log({ error });
      });
  };

  const goTo = (index) => {
    next(index);
  };

  const validate = (values) => {
    console.log(values);
  };

  const goBack = (index) => {
    switch (index) {
      case 'email':
        goTo('register');
        break;
      case 'name':
        goTo('email');
        break;
      case 'zipcode':
        goTo('name');
        break;
      case 'password':
        goTo('zipcode');
        break;
      default:
        break;
    }
  };

  return (
    <View style={AppStylesheet.flex}>
      <View>{props.user.loading ? <ActivityIndicator size="large" color="#091d2c" /> : null}</View>
      {!props.user.loading ? (
        <Formik
          validate={validate}
          enableReinitialize={true}
          validateOnMount={true}
          initialValues={{ zipcode: zipcode }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            register(values);
          }}
        >
          {({ errors, touched, handleChange, handleBlur, handleSubmit, values }) => (
            <View style={AppStylesheet.flex}>
              <View style={{ height: pageIndex == 'email' ? 'auto' : 0 }}>
                <Field
                  component={CustomInputField}
                  name="email"
                  placeholder="Email address"
                  autoCapitalize="none"
                  autoCompleteType="email"
                />
              </View>

              <View style={{ height: pageIndex == 'name' ? 'auto' : 0 }}>
                <Field component={CustomInputField} name="firstName" placeholder="First name" autoCapitalize="words" />
              </View>

              <View style={{ height: pageIndex == 'name' ? 'auto' : 0 }}>
                <Field component={CustomInputField} name="lastName" placeholder="Last name" autoCapitalize="words" />
              </View>

              <View style={{ height: pageIndex == 'zipcode' ? 'auto' : 0 }}>
                <Field component={CustomInputField} name="zipcode" placeholder="Zip code" />
              </View>

              <View style={{ height: pageIndex == 'password' ? 'auto' : 0 }}>
                <Field component={CustomInputField} name="password" placeholder="8 character minimum" secureTextEntry />
              </View>

              <View style={{ height: pageIndex == 'password' ? 'auto' : 0 }}>
                <Field
                  component={CustomInputField}
                  name="confirm_password"
                  placeholder="Confirm Password"
                  secureTextEntry
                />
              </View>

              {pageIndex === 'email' ? (
                <AppButton
                  title="Next"
                  bgColor={'#fa2069'}
                  textColor={'#ffffff'}
                  onPress={() => {
                    if (!errors.email) {
                      goTo('name');
                    }
                  }}
                />
              ) : null}

              {pageIndex == 'name' && !errors.firstName && !errors.lastName ? (
                <AppButton
                  title="Next"
                  bgColor={'#fa2069'}
                  textColor={'#ffffff'}
                  onPress={() => {
                    if (!errors.firstName && !errors.lastName) {
                      goTo('zipcode');
                    }
                  }}
                />
              ) : null}

              {pageIndex == 'zipcode' && !errors.zipcode ? (
                <AppButton
                  title="Confirm Zipcode"
                  bgColor={'#fa2069'}
                  textColor={'#ffffff'}
                  onPress={() => goTo('password')}
                />
              ) : null}

              {pageIndex === 'password' && !errors.password && !errors.confirm_password ? (
                <AppButton title="Register" bgColor={'#fa2069'} textColor={'#ffffff'} onPress={handleSubmit} />
              ) : null}

              {errors.email ? (
                <Text style={[AppStylesheet.errorText, { display: pageIndex == 'email' ? 'flex' : 'none' }]}>
                  {errors.email}
                </Text>
              ) : null}

              {errors.firstName && touched.firstName ? (
                <Text style={[AppStylesheet.errorText, { display: pageIndex == 'name' ? 'flex' : 'none' }]}>
                  {errors.firstName}
                </Text>
              ) : null}

              {errors.lastName && touched.lastName ? (
                <Text style={[AppStylesheet.errorText, { display: pageIndex == 'name' ? 'flex' : 'none' }]}>
                  {errors.lastName}
                </Text>
              ) : null}

              {errors.zipcode && touched.zipcode ? (
                <Text style={[AppStylesheet.errorText, { display: pageIndex == 'zipcode' ? 'flex' : 'none' }]}>
                  {errors.zipcode}
                </Text>
              ) : null}

              {errors.password && touched.password ? (
                <Text style={[AppStylesheet.errorText, { display: pageIndex == 'password' ? 'flex' : 'none' }]}>
                  {errors.password}
                </Text>
              ) : null}

              {errors.confirm_password && touched.confirm_password ? (
                <Text
                  style={[
                    AppStylesheet.errorText,
                    {
                      display: pageIndex == 'password' && typeof errors.password === 'undefined' ? 'flex' : 'none',
                    },
                  ]}
                >
                  {errors.confirm_password}
                </Text>
              ) : null}

              {submitError ? <Text style={AppStylesheet.errorText}>{submitError}</Text> : null}
            </View>
          )}
        </Formik>
      ) : null}
      <View style={AppStylesheet.goBackLink}>
        <TouchableOpacity>
          <Text
            style={AppStylesheet.textLink}
            onPress={() => {
              goBack(pageIndex);
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

export default connect(mapStateToProps, mapDispatchToProps)(EmailRegisterForm);
