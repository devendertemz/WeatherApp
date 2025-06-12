//#region import
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
} from 'react-native';
import {GetFiveDayForecast} from '../api/GetRequest';
import {showAPIError} from '../api/Config';
import CustomLoader from '../components/baseComp/CustomLoader';
import {appColors, scaleXiPhone15} from '../utils/AppConstants';
//#endregion

//#region Main
const WeatherForecastScreen = ({route}) => {
  const {lat, lng} = route.params || {};
  //#region useState
  const [isLoaded, setIsLoaded] = useState(false);
  const [forecastGrouped, setForecastGrouped] = useState([]);
  //#endregion

  //#region useEffect
  useEffect(() => {
    GetFiveDayForecastAPICall(lat, lng, setForecastGrouped, setIsLoaded);
    return () => {
      console.log('WFS.js: unmounting');
    };
  }, []);
  //#endregion

  //#region JSX

  const renderForecastItem = ({item}) => {
    const time = new Date(item.dt_txt).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
    const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
    return (
      <View style={styles.card}>
        <Text style={styles.time}>{time}</Text>
        <Image source={{uri: iconUrl}} style={styles.icon} />
        <Text style={styles.temp}>{Math.round(item.main.temp)}°C</Text>
      </View>
    );
  };

  const renderDayItem = ({item}) => (
    <View>
      <Text style={styles.sectionTitle}>{item.date}</Text>
      <FlatList
        data={item.data}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderForecastItem}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
  //#endregion

  return (
    <SafeAreaView style={styles.container}>
      {isLoaded && <CustomLoader isSmall={false} color={appColors.appRedBtn} />}
      {!isLoaded && forecastGrouped.length > 0 && (
        <FlatList
          data={forecastGrouped}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderDayItem}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default WeatherForecastScreen;
//#endregion

//#region API
async function GetFiveDayForecastAPICall(
  lat,
  lng,
  setForecastGrouped,
  setLoader,
) {
  setLoader(true);
  try {
    const res = await GetFiveDayForecast(lat, lng);
    console.log('5-Day Forecast:', JSON.stringify(res.data, null, 2));

    const grouped = {};
    res.data.list.forEach(item => {
      const date = new Date(item.dt_txt).toDateString();
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(item);
    });

    const groupedList = Object.keys(grouped).map(date => ({
      date,
      data: grouped[date],
    }));

    setForecastGrouped(groupedList);
  } catch (error) {
    showAPIError(error, 'Forecast Error');
  } finally {
    setLoader(false);
  }
}
//#endregion

//#region Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.appWeatherBg,
    padding: scaleXiPhone15.sixteenH,
  },
  sectionTitle: {
    fontSize: scaleXiPhone15.eightteenH,
    fontWeight: 'bold',
    color: appColors.appBlackTxt,
    paddingVertical: scaleXiPhone15.tenH,
  },
  listContainer: {
    paddingBottom: scaleXiPhone15.eightteenH,
  },

  card: {
    backgroundColor: appColors.appWhitePageBg,
    borderRadius: scaleXiPhone15.sixteenH,
    padding: scaleXiPhone15.twelveH,
    alignItems: 'center',
    marginRight: scaleXiPhone15.twelveH,
    elevation: 2,
    width: scaleXiPhone15.hundredH,
  },
  time: {
    fontSize: scaleXiPhone15.sixteenH,
    color: appColors.appBlackDescTxt,
  },
  icon: {
    width: scaleXiPhone15.sixtyH,
    height: scaleXiPhone15.sixtyH,
  },
  temp: {
    fontSize: scaleXiPhone15.eightteenH,
    fontWeight: '500',
    color: appColors.appBlackTxt,
  },
});
//#endregion
