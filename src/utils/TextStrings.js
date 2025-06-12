import LocalizedStrings from 'react-native-localization';

export default TextStrings = new LocalizedStrings({
  en: {
    how: 'How do you want your egg today?',
    lang: 'English',
    refresh: 'Refresh',
    permisionMsg: 'Please allow location permission to continue...',
    locationPermission: 'Location Permission',
    getCurntLoc: 'Get Current Weather Location',
    upcomingWeather: 'Upcoming Weather',
    searcCity: 'Search City here....',
  },
  fr: {
    how: 'Comment voulez-vous votre œuf aujourd’hui ?',
    lang: 'French',
    refresh: 'Rafraîchir',
    permisionMsg: 'Veuillez autoriser l’accès à la localisation...',
    locationPermission: 'Autorisation de localisation',
    getCurntLoc: 'Obtenez la météo actuelle',
    upcomingWeather: 'Prévisions météo',
  },
  // Add similar blocks for `it`, `es`, `de`
});

