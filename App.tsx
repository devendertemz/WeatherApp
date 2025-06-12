/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

//#region import
import React from 'react';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

//navigation
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import HomeScreen from './src/screens/HomeScreen';
import WeatherForecastScreen from './src/screens/WeatherForecastScreen';
import {WeatherProvider} from './src/utils/WeatherContext';

//#region App
function App() {
  return (
    <WeatherProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="WeatherForecastScreen"
            component={WeatherForecastScreen}
            options={{
              headerShown: true,
              title: '5-Day Forecast',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </WeatherProvider>
  );
}

//#endregion

export default App;
