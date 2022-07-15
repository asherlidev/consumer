import React, { useEffect, useRef, useState } from 'react';
import { List, Text } from 'react-native-paper';
import { connect } from 'react-redux';
import { ScrollView, View, Image, StyleSheet, ActivityIndicator, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { Field, Formik } from 'formik';
import CustomToggleButton from '../../components/CustomToggleButton';
import AppStylesheet from '../../styles/AppStylesheet';
import AppButton from '../../components/AppButton';

import axios from 'axios';
import { APP_URL } from '@env';
import { bindActionCreators } from 'redux';
import { setUserRequest, setLoadingRequest } from '../../store/actions/user.action';

const SelectInterests = (props) => {
  const { token, user } = props.user;
  const [index, setIndex] = useState(0);
  const [choicesInterests, setChoicesInterests] = useState([]);
  const [choicesFestivals, setChoicesFestivals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [festivals, setFestivals] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [message, setMessage] = useState(null);
  const [search, onChangeSearch] = useState(null);
  const mounted = useRef(false);
  const navigation = useNavigation();

  useEffect(() => {
    mounted.current = true;
    return () => (mounted.current = false);
  });

  useEffect(() => {
    (async () => {
      if (mounted.current) {
        try {
          const interests = await axios
            .get(`${APP_URL}/interests?isBaseCategory=true`)
            .then((response) => {
              const { data } = response;
              return data;
            })
            .catch((error) => {
              return error.response;
            });
          let festivals = [];
          if (index == 1) {
            // filter festivals based on selected categories
            let qry = categories.map((category) => {
              return '&festivalcategories=' + category;
            });
            festivals = await axios
              .get(`${APP_URL}/festivals?isParent=true${qry.join('')}`)
              .then((response) => {
                const { data } = response;
                return data;
              })
              .catch((error) => {
                console.log(error.response);
              });
            festivals.reverse();
          }
          if (mounted.current) {
            setChoicesInterests(interests);
            setChoicesFestivals(festivals);
          }
        } catch (e) {
          console.log(e);
        }
      }
    })();
  }, [index]);

  useEffect(() => {
    if (categories.length >= 3) {
      setMessage(null);
    }
  }, [categories]);

  const submit = (values) => {
    let { categories, festivals } = values;
    categories = JSON.parse(categories);
    festivals = JSON.parse(festivals);
    switch (index) {
      case 0: // page 1
        if (categories.length < 3) {
          setMessage('Please select at least 3 categories.');
        } else {
          setIndex(1);
          setMessage(false);
        }
        break;
      case 1: // page 2
        if (festivals.length < 5) {
          setMessage('Please select at least 5 festivals.');
        } else {
          setMessage(false);

          // actually proceed to update user object with festivals, categories
          updateUserInterests({ categories, festivals });
        }
        break;
    }
  };

  const updateUserInterests = ({ categories, festivals }) => {
    const user_id = user['users-permissions_user_id'] ? user['users-permissions_user_id'] : user.id;
    axios
      .put(
        `${APP_URL}/users/${user_id}`,
        {
          isFirstLogin: false,
          interests: categories,
          interested_festivals: festivals,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log('success');
        const { data } = response;
        console.log(data.isFirstLogin);
        props.setUserRequest(data);
      })
      .catch((error) => {
        /* TODO: CHANGE THIS TO ACTUALLY REPORT ERRORS, THIS IS A DEV WORKAROUND
         *  TODO: I am unsure of how to handle this, will discuss
         *  Currently, I'm just always going to next step even if it fails. Probably should report an error here but then what?
         * */
        console.log(error.response);
      });
  };

  const toggleCategory = (category) => {
    let selectedCategories = [...categories];
    if (selectedCategories.includes(category)) {
      selectedCategories.splice(selectedCategories.indexOf(category), 1);
    } else {
      selectedCategories.push(category);
    }
    setCategories(selectedCategories);
  };

  const toggleFestival = (festival) => {
    let selectedFestivals = [...festivals];
    if (selectedFestivals.includes(festival)) {
      selectedFestivals.splice(selectedFestivals.indexOf(festival), 1);
    } else {
      selectedFestivals.push(festival);
    }
    setFestivals(selectedFestivals);
  };

  useEffect(() => {
    if (search) {
      setFilteredResults(filter(search));
    }
  }, [search]);

  const filter = (term) => {
    let choices = choicesFestivals;
    return choices.filter((choice) => {
      return choice.name.includes(term);
    });
  };

  return (
    <SafeAreaView style={AppStylesheet.safeArea}>
      <View style={AppStylesheet.innerViewContainer}>
        <ScrollView style={AppStylesheet.innerViewPadding}>
          <Image source={require('../../assets/logoF.png')} style={styles.logo} />

          <View>
            <Text style={styles.title}>{index === 0 ? 'What interests you?' : 'Last thing!'}</Text>
            <Text style={styles.subtitle}>
              {index === 0
                ? 'Select a few festival categories that interest you'
                : 'Select 5 or more festivals that interest you.'}
            </Text>
            {index === 1 ? (
              <Formik>
                <View style={styles.inputWrapper}>
                  <TextInput
                    onChangeText={onChangeSearch}
                    style={styles.inputField}
                    placeholder="Search for Festivals"
                  />
                  <FontAwesome name="search" size={16} color={'#777'} style={styles.searchFieldIcon} />
                </View>
              </Formik>
            ) : null}
          </View>

          <View style={AppStylesheet.flex}>
            <View style={AppStylesheet.flexboxCenter}>
              {props.user.loading ? <ActivityIndicator size="large" color="#091d2c" /> : null}
            </View>

            {index === 0 ? (
              <View style={AppStylesheet.flexRow}>
                {choicesInterests.length > 0 ? (
                  choicesInterests.map((interest, index) => {
                    return (
                      <CustomToggleButton
                        categoryId={interest.id}
                        categoryName={interest.name}
                        toggle={toggleCategory}
                        selected={categories}
                        background={{ uri: interest.cover_image ? interest.cover_image.url : null }}
                        key={`${index}_i`}
                      />
                    );
                  })
                ) : (
                  <View style={AppStylesheet.flexboxCenter}>
                    <ActivityIndicator size="large" color="#091d2c" />
                  </View>
                )}
              </View>
            ) : null}

            {index === 1 ? (
              <View style={AppStylesheet.flexRow}>
                {search ? (
                  filteredResults.map((result, index) => {
                    const categories = result.festivalcategories[0];
                    const default_image = categories
                      ? categories.cover_image
                        ? categories.cover_image.url
                        : null
                      : null;
                    return (
                      <CustomToggleButton
                        categoryId={result.id}
                        categoryName={result.name}
                        toggle={toggleFestival}
                        selected={festivals}
                        background={{
                          uri: result.external_img_url ? result.external_img_url : default_image ? default_image : null,
                        }}
                        key={`${index}_x`}
                      />
                    );
                  })
                ) : choicesFestivals.length > 0 ? (
                  choicesFestivals.map((festival, index) => {
                    const categories = festival.festivalcategories[0];
                    const default_image = categories
                      ? categories.cover_image
                        ? categories.cover_image.url
                        : null
                      : null;
                    return (
                      <CustomToggleButton
                        categoryId={festival.id}
                        categoryName={festival.name}
                        toggle={toggleFestival}
                        selected={festivals}
                        background={{
                          uri: festival.external_img_url
                            ? festival.external_img_url
                            : default_image
                            ? default_image
                            : null,
                        }}
                        key={`${index}_f`}
                      />
                    );
                  })
                ) : (
                  <View style={AppStylesheet.flexboxCenter}>
                    <ActivityIndicator size="large" color="#091d2c" />
                  </View>
                )}
                {search && filteredResults.length == 0 ? (
                  <View style={AppStylesheet.flex}>
                    <Text
                      style={AppStylesheet.bodyText}
                    >{`No results found for "${search}", please try another search.`}</Text>
                  </View>
                ) : null}
              </View>
            ) : null}
          </View>
        </ScrollView>
        {!props.user.loading ? (
          <View style={styles.submitButton}>
            <Formik
              initialValues={{ categories: JSON.stringify(categories), festivals: JSON.stringify(festivals) }}
              enableReinitialize={true}
              isValidating={true}
              onSubmit={(values) => submit(values)}
            >
              {({ handleSubmit }) => (
                <View>
                  <TextInput style={styles.hiddenInputField} onChangeText={(text) => onChange('categories')(text)} />
                  {index === 0 ? (
                    <AppButton
                      onPress={handleSubmit}
                      title={categories.length < 3 ? 'Select at least 3' : 'Next'}
                      bgColor={categories.length < 3 ? '#f2f2f2' : '#fa2069'}
                      textColor={categories.length < 3 ? '#454f57' : '#fff'}
                    />
                  ) : null}
                  {index === 1 ? (
                    <AppButton
                      onPress={handleSubmit}
                      title={festivals.length < 5 ? 'Select at least 5' : 'Next'}
                      bgColor={festivals.length < 5 ? '#f2f2f2' : '#fa2069'}
                      textColor={festivals.length < 5 ? '#454f57' : '#fff'}
                    />
                  ) : null}
                  {message ? <Text style={styles.message}>{message}</Text> : null}
                </View>
              )}
            </Formik>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
    marginVertical: 16,
    flex: 1,
    justifyContent: 'center',
  },
  inputField: {
    color: '#7d8389',
    fontSize: 18,
    flex: 1,
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
  },
  message: {
    paddingBottom: '3%',
    textAlign: 'center',
    color: 'red',
  },
  hiddenInputField: {
    display: 'none',
    height: 0,
    margin: 0,
  },
  label: {
    textAlign: 'left',
    fontSize: 22,
    letterSpacing: 0.5,
    marginTop: 20,
  },
  submitButton: {
    paddingTop: 5,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  logo: {
    height: 31 * 1.5,
    width: 40 * 1.5,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  title: {
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 32,
    marginBottom: 0,
  },
  subtitle: { fontSize: 22, textAlign: 'center' },
  searchFieldIcon: { position: 'absolute', right: 12, top: 12 },
});

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setUserRequest,
      setLoadingRequest,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SelectInterests);
