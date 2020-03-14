import React from "react";
import styled from "styled-components";
import {
  Animated,
  Image,
  View,
  Text,
  WebView,
  AsyncStorage
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import QueryString from "qs";
import { URL } from "url";

class Loading extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  async storeItem(key, value) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <LinearGradient
        start={[1, 1]}
        colors={["#edf4ff", "#edf7ff"]}
        style={{ height: "100%", paddingTop: 4, elevation: -2 }}
      >
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            height: "40%"
          }}
        >
          <Text style={{ fontSize: 35, color: "#4c85ba", fontWeight: "bold" }}>
            Reach Kitchen Display
          </Text>
        </View>
      </LinearGradient>
    );
  }
}

export default Loading;
