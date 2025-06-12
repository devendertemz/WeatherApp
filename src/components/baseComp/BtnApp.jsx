//#region import
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
//comp
import CustomLoader from './CustomLoader';
//utils
import {appColors,  scaleXiPhone15} from '../../utils/AppConstants';
//#endregion

//#region BtnApp
const BtnApp = ({
  title,
  color = appColors.appRedBtn,
  marginVertical,
  onPress,
  isAPICall,
}) => {
  return (
    <TouchableOpacity
      disabled={isAPICall}
      style={[
        styles.button,
        {
          marginVertical: marginVertical ? marginVertical : 0,
          backgroundColor: color,
        },
      ]}
      onPress={onPress}>
      {isAPICall ? (
        <CustomLoader isSmall={true} color={appColors.appWhitePageBg} />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: scaleXiPhone15.sixteenW, //scaleXiPhone15.sixteenW,
    height: scaleXiPhone15.fivtyH,
    borderRadius: scaleXiPhone15.fourH,
  },
  buttonText: {
    fontSize: scaleXiPhone15.eightteenH,
    color: appColors.appWhitePageBg,
    textAlign: 'center', //paddingVertical: scaleXiPhone15.sixteenH,
  },
});
//#endregion

export default BtnApp;
