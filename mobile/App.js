import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './views/Login';
import Register from './views/Register';
import Profile from './views/Profile';
import UserSettings from './views/Profile/UserSettings';
import ConnectWithUs from './views/Profile/ConnectWithUs';
import MyTickets from './views/Profile/MyTickets';
import ChangePassword from './views/Profile/UserSettings/ChangePassword';
import PersonalInformation from './views/Profile/UserSettings/PersonalInformation';
import SelectInterests from './views/Profile/SelectInterests';
import InviteFriends from './views/Profile/InviteFriends';
import PrivacyPolicy from './views/PrivacyPolicy';
import TermsOfService from './views/TermsOfService';
const Stack = createStackNavigator();
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './store';
import { useEffect, useState } from 'react';
import * as Sentry from 'sentry-expo';

const { store, persistor } = configureStore();

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isFirstLogin, setIsFirstLogin] = useState(false);

  useEffect(() => {
    Sentry.init({
      dsn: 'https://ce0b246e836344b6b5f28b48a6ba29c9@o513271.ingest.sentry.io/5933157',
      enableInExpoDevelopment: true,
      debug: true, // Sentry will try to print out useful debugging information if something goes wrong with sending an event. Set this to `false` in production.
    });
  }, []);

  store.subscribe(() => {
    if (store.getState().user.token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }

    if (store.getState().user.user.isFirstLogin) {
      setIsFirstLogin(true);
    } else {
      setIsFirstLogin(false);
    }
  });

  return (
    <Provider store={store}>
      <NavigationContainer>
        <PersistGate loading={null} persistor={persistor}>
          <PaperProvider>
            <StatusBar style="auto" />
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
              {isLoggedIn ? (
                <>
                  {isFirstLogin ? (
                    <>
                      <Stack.Screen name="SelectInterests" component={SelectInterests} />
                    </>
                  ) : (
                    <>
                      <Stack.Screen name="Profile" component={Profile} />
                      <Stack.Screen name="UserSettings" component={UserSettings} />
                      <Stack.Screen name="ChangePassword" component={ChangePassword} />
                      <Stack.Screen name="ConnectWithUs" component={ConnectWithUs} />
                      <Stack.Screen name="PersonalInformation" component={PersonalInformation} />
                      <Stack.Screen name="InviteFriends" component={InviteFriends} />
                      <Stack.Screen name="MyTickets" component={MyTickets} />
                      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
                      <Stack.Screen name="TermsOfService" component={TermsOfService} />
                    </>
                  )}
                </>
              ) : (
                <>
                  <Stack.Screen name="Login" component={Login} />
                  <Stack.Screen name="Register" component={Register} />
                  <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
                  <Stack.Screen name="TermsOfService" component={TermsOfService} />
                </>
              )}
            </Stack.Navigator>
          </PaperProvider>
        </PersistGate>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
