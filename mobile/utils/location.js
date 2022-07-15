import * as Location from 'expo-location';

export const checkIfLocationEnabled = async () => {
  let enabled = await Location.hasServicesEnabledAsync();

  if (!enabled) {
    Alert.alert('Location service not enabled', 'Please enable your locations services to continue', [{ text: 'OK' }], {
      cancelable: false,
    });
    return false;
  } else {
    return true;
  }
};

export const GetCurrentLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') {
    Alert.alert('Permission not granted', 'Allow the app to use location service.', [{ text: 'OK' }], {
      cancelable: false,
    });
  }

  let { coords } = await Location.getCurrentPositionAsync();
  const { latitude, longitude } = coords;
  let response = await Location.reverseGeocodeAsync({
    latitude,
    longitude,
  });

  let zipcode;
  for (let item of response) {
    zipcode = item.postalCode;
  }
  return zipcode;
};
