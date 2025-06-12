import React from "react";
import { Alert } from "react-native";

//#region alert - common
export const showMsgAlert = (msg, title = "Message") => {
  Alert.alert(title, msg + "", [{ text: "OK" }]);
};


//#endregion
