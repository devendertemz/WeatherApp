//#region import

import React, {useEffect, useContext, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image} from 'react-native';
import {WeatherContext} from '../utils/WeatherContext';
import BtnApp from '../components/baseComp/BtnApp';
import TextStrings from '../utils/TextStrings';
import CustomLoader from '../components/baseComp/CustomLoader';
import {appColors, scaleXiPhone15} from '../utils/AppConstants';
import {GetCurrentLocation} from '../utils/LocationHelper';
import {GetAddressFromLatLng, GetLocationBasedData} from '../api/GetRequest';
import {GoogleKey, showAPIError} from '../api/Config';

import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
//#endregion
//#region Main
const HomeScreen = ({navigation, route}) => {
  const {weather, setWeather, setLocation, location} =
    useContext(WeatherContext);

  //#region useState
  const [isLoaded, setIsloaded] = useState(false);
  const [address, setAddress] = useState('');
  //#endregion

  //#region useEffect

  const getLocationAndWeather = () => {
    function calllBackForCurrentLocation(status, msg) {
      if (status) {
        console.log('\u001b[1;32m H.js crt location = ', JSON.stringify(msg));
        setLocation({latitude: msg.latitude, longitude: msg.longitude});

        GetWeatherByCoordsAPICall(
          msg.latitude,
          msg.longitude,
          setWeather,
          setIsloaded,
        );
      } else {
        console.log('\u001b[1;31m H.js Error in crt loc  = ', msg);
      }
    }

    GetCurrentLocation(calllBackForCurrentLocation);
  };

  useEffect(() => {
    getLocationAndWeather();
    return () => {
      console.log('\u001b[1;33m H.js useEffect[] return clear map marker');
    };
  }, []);

  useEffect(() => {
    if (location?.latitude && location?.longitude) {
      GetAddressFromLatLngAPICall(
        location?.latitude,
        location?.longitude,
        setAddress,
      );
    }

    return () => {
      console.log(
        '\u001b[1;33m H.js useEffect[location] return clear map marker',
      );
    };
  }, [location]);
  //#endregion

  //#region Action

  const onGetCurrentLoc = () => {
    getLocationAndWeather();
  };

  const onRefreshPress = () => {
    GetWeatherByCoordsAPICall(
      location.latitude,
      location.longitude,
      setWeather,
      setIsloaded,
    );
  };
  const onUpcomingWeather = () => {
    navigation.navigate('WeatherForecastScreen', {
      lat: location.latitude,
      lng: location.longitude,
    });
  };
  //#endregion
  //#region JSX

  if (!weather) {
    return (
      <View style={styles.loader}>
        <CustomLoader isSmall={false} color={appColors.appRedBtn} />
      </View>
    );
  }

  const icon = weather?.weather?.[0]?.icon;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;

  const GooglePlacesInput = ({setMarkerPosition}) => {
    return (
      <GooglePlacesAutocomplete
        placeholder={TextStrings.searcCity}
        query={{
          key: GoogleKey.GOOGLE_MAP_KEY, // REPLACE WITH YOUR ACTUAL API KEY
          language: 'en',
          types: 'geocode',
        }}
        styles={{
          container: {
            position: 'absolute',
            left: scaleXiPhone15.sixteenH,
            right: scaleXiPhone15.sixteenH,
            top: scaleXiPhone15.eightH,
            zIndex: 10, // Make sure it's visible above map
          },
          textInput: {
            height: scaleXiPhone15.fivtyH,
            backgroundColor: 'white', // 👈 White background
            borderRadius: scaleXiPhone15.eightH,
            paddingHorizontal: scaleXiPhone15.twelveH,
            fontSize: scaleXiPhone15.sixteenH,
            borderColor: '#ddd',
            borderWidth: scaleXiPhone15.twoH,
          },
          listView: {
            backgroundColor: appColors.appGrayBorder,
            borderRadius: scaleXiPhone15.eightH,
            marginTop: scaleXiPhone15.fourH,
          },
        }}
        autoFillOnNotFound={false}
        currentLocation={false}
        currentLocationLabel="Current location"
        debounce={0}
        disableScroll={false}
        enableHighAccuracyLocation={true}
        enablePoweredByContainer={true}
        fetchDetails={true}
        filterReverseGeocodingByTypes={[]}
        GooglePlacesDetailsQuery={{}}
        GooglePlacesSearchQuery={{
          rankby: 'distance',
          type: 'restaurant',
        }}
        GoogleReverseGeocodingQuery={{}}
        isRowScrollable={true}
        keyboardShouldPersistTaps="always"
        listUnderlayColor="#c8c7cc"
        listViewDisplayed="auto"
        keepResultsAfterBlur={false}
        minLength={1}
        nearbyPlacesAPI="GooglePlacesSearch"
        numberOfLines={1}
        onFail={() => {}}
        onNotFound={() => {}}
        onPress={(data, details = null) => {
          const {lat, lng} = details.geometry.location;
          console.log('onPress lat lng', lat, lng);
          setMarkerPosition({
            latitude: lat,
            longitude: lng,
          });

          GetWeatherByCoordsAPICall(lat, lng, setWeather, setIsloaded);
        }}
        onTimeout={() =>
          console.warn('google places autocomplete: request timeout')
        }
        predefinedPlaces={[]}
        predefinedPlacesAlwaysVisible={false}
        suppressDefaultStyles={false}
        textInputHide={false}
        textInputProps={{}}
        timeout={20000}
      />
    );
  };

  //#endregion

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.containerTop}>
        <GooglePlacesInput setMarkerPosition={setLocation} />

        <Text style={styles.city}>{weather.name}</Text>
        <Image source={{uri: iconUrl}} style={styles.weatherIcon} />
        <Text style={styles.temp}>{Math.round(weather.main.temp)}°C</Text>
        <Text style={styles.desc}>{weather.weather[0].description}</Text>
        <Text style={styles.subInfo}>Humidity: {weather.main.humidity}%</Text>
        <Text style={styles.subInfo}>Wind: {weather.wind.speed} m/s</Text>
        <Text style={styles.subInfo}>
          Feels like: {Math.round(weather.main.feels_like)}°C
        </Text>
        <Text style={styles.subInfo}>{address}</Text>
      </View>
      <View style={styles.containerBtm}>
        <BtnApp
          isAPICall={isLoaded}
          title={TextStrings.refresh}
          onPress={onRefreshPress}
        />
        <BtnApp
          isAPICall={isLoaded}
          title={TextStrings.getCurntLoc}
          onPress={onGetCurrentLoc}
        />
        <BtnApp
          // isAPICall={isLoaded}
          title={TextStrings.upcomingWeather}
          onPress={onUpcomingWeather}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: appColors.appWhitePageBg,
  },
  containerTop: {
    flex: 1,
    paddingHorizontal: scaleXiPhone15.sixteenH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerBtm: {
    gap: scaleXiPhone15.eightH,
    padding: scaleXiPhone15.sixteenH,
  },
  city: {
    fontSize: scaleXiPhone15.thrityH,
    fontWeight: 'bold',
    color: appColors.appBlackTxt,
  },
  temp: {
    fontSize: scaleXiPhone15.fivtyH,
    color: appColors.appBlackTxt,
    fontWeight: 'bold',
  },
  desc: {
    fontSize: scaleXiPhone15.twentyFourH,
    textTransform: 'capitalize',
    color: appColors.appBlackTxt,
    marginVertical: scaleXiPhone15.fourH,
  },
  subInfo: {
    fontSize: scaleXiPhone15.sixteenH,
    color: appColors.appBlackDescTxt,
    marginVertical: scaleXiPhone15.twoH,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  weatherIcon: {
    width: scaleXiPhone15.hundredH,
    height: scaleXiPhone15.hundredH,
    marginVertical: scaleXiPhone15.eightH,
  },
});
//#endregion

//#region API
async function GetWeatherByCoordsAPICall(
  lat,
  long,
  setWeather,

  setLoader,
) {
  setLoader(true);

  await GetLocationBasedData(lat, long)
    .then(res => {
      setLoader(false);

      console.log(
        '\u001b[1;32mH.js : Res Get Location Based Data = ',
        JSON.stringify(res.data, null, 4),
      );
      setWeather(res.data);
    })
    .catch(error => {
      setLoader(false);
      showAPIError(error, 'Location Based Error');
    });
}
async function GetAddressFromLatLngAPICall(lat, long, setAddress) {
  await GetAddressFromLatLng(lat, long)
    .then(response => {
      console.log(
        '\u001b[1;32mH.js : Res Get Address From lat long Data = ',
        JSON.stringify(response.data, null, 4),
      );

      if (
        response.data &&
        response.data.results &&
        response.data.results.length > 0
      ) {
        setAddress(response.data.results[0].formatted_address);
      } else {
        setAddress('No address found');
      }
    })
    .catch(error => {
      showAPIError(error, 'Address issue');
    });
}
//#endregion
