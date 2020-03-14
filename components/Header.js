import React from "react";
import styled from "styled-components";
import { Animated, Image, View, TouchableOpacity, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Header = props => (
  <LinearGradient
    style={{
      padding: 24,
      paddingHorizontal: 12,
      paddingTop: 36,
      flexDirection: "row",
      justifyContent: "space-between"
    }}
    start={[1, 1]}
    colors={["#5f8ac7", "#3d6cad"]}
  >
    <View
      style={{
        width: "50%",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 24
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            color: "white",
            fontSize: 18,
            fontFamily: "sans-serif"
          }}
        ></Text>
      </View>
    </View>
    {props.loading ? (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          width: "50%"
        }}
      >
        <TouchableOpacity onPress={props.refresh}>
          <Home source={require("../icons/refresh.png")} />
        </TouchableOpacity>

        <TouchableOpacity onPress={props.menuToggle}>
          <Home source={require("../icons/menu.png")} />
        </TouchableOpacity>
      </View>
    ) : (
      <View />
    )}
  </LinearGradient>
);

export default Header;

const Home = styled.Image`
  width: 24px;
  height: 24px;
`;
