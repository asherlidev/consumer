import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import AppStylesheet from '../styles/AppStylesheet';
import SlimHeader from '../components/SlimHeader';
import { SafeAreaView } from 'react-native-safe-area-context';

const PrivacyPolicy = () => {
  return (
    <SafeAreaView style={AppStylesheet.safeArea}>
      <SlimHeader showBackButton={true} terms={true} />
      <View style={AppStylesheet.innerViewContainer}>
        <WebView
          source={{ uri: 'https://www.festivalpass.com/privacy' }}
          injectedJavaScript={`document.querySelector('nav').style.display = 'none';document.querySelector('.hgfdbD').style.paddingTop = 0;true;`}
        />
      </View>
    </SafeAreaView>
  );
};

export default PrivacyPolicy;
