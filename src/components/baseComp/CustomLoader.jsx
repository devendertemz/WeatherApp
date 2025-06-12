import React from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";

const CustomLoader = (props) => {
  return (
    <View
      style={[
        styles.loader,
        {
          margin: props.margin ? props.margin : 0,
          padding: props.padding ? props.padding : 0,
        },
      ]}
    >
      <ActivityIndicator
        size={props.isSmall ? "small" : "large"}
        color={props.color ? props.color : "white"}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "blue",
  },
});

export default CustomLoader;
