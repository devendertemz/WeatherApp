import {useEffect, useState} from 'react';
import {showMsgAlert} from '../utils/AlertValidation';
import {Alert} from 'react-native';
export const GoogleKey = {
  WEATHER_API_KEY: 'd1a60fdb5c988d617c9b0ebbdc7f7dff',
  GOOGLE_MAP_KEY: 'AIzaSyDf0z9hV-OHMT9n8vdVtlznTuWYUVVakvs',
};

export const HttpRequestBaseURLConfig = {
  baseURLOpenWeatherMap: 'https://api.openweathermap.org/data/2.5/',
  baseURLGoogleMap: 'https://maps.googleapis.com/maps/api/geocode/json?',
};

//#region showAPIError
export const showAPIError = (error, title) => {
  consoleLogErrorObject(error, title);
  if (error.response) {
    const {data, message, status} = error.response;
    //TODO : Need to check and remove extra code for error handling
    //data is string
    if (typeof data === 'string' && data.trim().length === 0) {
      showHttpErrorAlert(status);
      return;
    }
    if (typeof data === 'string' && data.trim().length > 0) {
      showMsgAlert(data, title);
      return;
    }
    //data is object
    if (typeof data === 'object' && data !== null) {
      const {message, data: dataTmp} = error.response?.data;
      if (typeof dataTmp === 'object' && dataTmp !== null) {
        const {errors} = dataTmp;
        if (errors) {
          showMsgAlert(errors, title);
          return;
        }
      }
      if (typeof message === 'string' && message.trim().length > 0) {
        showMsgAlert(message, title);
        return;
      }
    }
  } else {
    showMsgAlert(error.message, title);
  }
};
const showHttpErrorAlert = statusCode => {
  let title = 'Error';
  let message = 'Something went wrong. Please try again.';

  switch (statusCode) {
    case 400:
      title = 'Bad Request';
      message = 'The request was invalid. Please check your input.';
      break;
    case 401:
      title = 'Unauthorized';
      message = 'You are not authorized. Please log in again.';
      break;
    case 403:
      title = 'Forbidden';
      message = 'Access denied. You do not have permission.';
      break;
    case 404:
      title = 'Not Found';
      message = 'The requested resource could not be found.';
      break;
    case 408:
      title = 'Request Timeout';
      message = 'The request timed out. Please try again later.';
      break;
    case 500:
      title = 'Server Error';
      message = 'Internal server error. Please try again later.';
      break;
    case 503:
      title = 'Service Unavailable';
      message = 'Server is temporarily unavailable. Try again soon.';
      break;
    default:
      break;
  }
  Alert.alert(title, message);
};
const consoleLogErrorObject = (error, title) => {
  console.log(
    `\u001b[1;31m Config.js : title = ${title}\terror.response.status = ${
      error.response.status
    }\t error.response.data  = ${JSON.stringify(
      error.response?.data,
      null,
      4,
    )}\terror.message = ${error.message}`,
  );
};

//#endregion
