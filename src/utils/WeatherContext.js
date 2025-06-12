import React, { createContext, useState } from 'react';

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState('');

  return (
    <WeatherContext.Provider value={{ weather, setWeather, location, setLocation, error, setError }}>
      {children}
    </WeatherContext.Provider>
  );
};
