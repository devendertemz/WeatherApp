import {GoogleKey, HttpRequestBaseURLConfig} from './Config';
import axios from 'react-native-axios';

const ConsoleLogUrlParaAndBody = (key, urlTmp, params, body) => {
  console.log(`\u001b[1;34m${key} : urlTmp = `, urlTmp);
  if (params) {
    console.log('\u001b[1;34m params = ', JSON.stringify(params));
  }
  if (body) {
    console.log('\u001b[1;34m body = ', JSON.stringify(body));
  }
};
// 🌟 Common Headers
export const getAuthHeaders = () => {
  return {
    Authorization: 'Bearer ' + GlobalValue.accessToken,
    'Content-Type': 'application/json', // Default content type
  };
};

//#region OpenWeatherMap
export const GetLocationBasedData = async (lat, lon) => {
  const urlTmp =
    HttpRequestBaseURLConfig.baseURLOpenWeatherMap +
    `weather?lat=${lat}&lon=${lon}&units=metric&appid=${GoogleKey.WEATHER_API_KEY}`;
  ConsoleLogUrlParaAndBody('GET : GetLocationBasedData ', urlTmp, null, null);
  const response = await axios({
    method: 'get',
    url: urlTmp,
  });
  return response;
};

export const GetFiveDayForecast = async (lat, lon) => {
  const urlTmp =
    HttpRequestBaseURLConfig.baseURLOpenWeatherMap +
    `forecast?lat=${lat}&lon=${lon}&units=metric&appid=${GoogleKey.WEATHER_API_KEY}`;
  ConsoleLogUrlParaAndBody('GET : FiveDayForecast ', urlTmp, null, null);
  const response = await axios({
    method: 'get',
    url: urlTmp,
  });
  return response;
};
//#endregion

//#region Googleaddress
export const GetAddressFromLatLng = async (lat, lon) => {
  const urlTmp =
    HttpRequestBaseURLConfig.baseURLGoogleMap +
    `latlng=${lat},${lon}&key=${GoogleKey.GOOGLE_MAP_KEY}`;
  ConsoleLogUrlParaAndBody('GET : GetAddressFromLatLng ', urlTmp, null, null);
  const response = await axios({
    method: 'get',
    url: urlTmp,
  });
  return response;
};
//#endregion
