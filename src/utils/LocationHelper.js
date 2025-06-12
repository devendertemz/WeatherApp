//#region import
import React, {useState} from 'react';
import {PermissionsAndroid, Platform, Linking, Alert} from 'react-native';
import GetLocation, {
  
  isLocationError,
} from 'react-native-get-location';

//misc
import {showMsgAlert} from './AlertValidation';
import TextStrings from './TextStrings';

//#endregion

//#region GetCurrentLocation
export const GetCurrentLocation = async callBackGetCrtLoc => {
  // 1.Ask for location permission
  try {
    if (Platform.OS === 'ios') {
      GetCurrentLocInfo(callBackGetCrtLoc);
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: TextStrings.locationPermission,
            message: TextStrings.permisionMsg,
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          GetCurrentLocInfo(callBackGetCrtLoc);
        } else {
          callBackGetCrtLoc(false, 'Location permission denied');
        }
      } catch (err) {
        callBackGetCrtLoc(false, err);
      }
    }
  } catch (err) {
    console.error('LP.js | Error requesting location permission:', err);
    callBackGetCrtLoc(false, err);
  }
};
const GetCurrentLocInfo = callBackGetCrtLoc => {
  GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 30000,
    rationale: {
      title: 'Location permission',
      message: 'The app needs the permission to request your location.',
      buttonPositive: 'Ok',
    },
  })
    .then(newLocation => {
      console.log(
        '\u001b[1;32m GL.js newLocation = ',
        JSON.stringify(newLocation),
      );
      callBackGetCrtLoc(true, newLocation);
    })
    .catch(ex => {
      GetCrtPostionErrorHandling(ex);
      callBackGetCrtLoc(false, 'Not able to get current location');
    });
};
const GetCrtPostionErrorHandling = error => {
  if (isLocationError(error)) {
    const {code, message} = error;
    console.log(
      `LH.js | Error in get crt position code${code} | msg : ${message}`,
    );
    if (code === 'UNAUTHORIZED') {
      Linking.openSettings().catch(() =>
        Alert.alert('Unable to open settings'),
      );
    } else if (code === 'UNAVAILABLE') {
      showMsgAlert(
        'Location service is disabled or unavailable',
        'UNAVAILABLE',
      );
    } else if (code === 'CANCELLED') {
      showMsgAlert(
        'Location cancelled by user or by another request',
        'CANCELLED',
      );
      console.log('\u001b[1;31m:GL.js | LocationErrorCode.CANCELLED');
    } else if (code === 'TIMEOUT') {
      showMsgAlert('Location request timed out', 'TIMEOUT');
    }
  } else {
    showMsgAlert(error, 'Error while getting location');
  }
};
//#endregion
