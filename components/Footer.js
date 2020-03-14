import React from "react";
import styled from "styled-components";
import { Animated, Image, View, TouchableOpacity, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Footer = props => (
  <View>
    <LinearGradient
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 12,
        paddingHorizontal: 18,
        alignItems: "center",
        alignContent: "center",
        alignSelf: "flex-end",
        width: "17%"
      }}
      start={[1, 1]}
      colors={["#edf4ff", "#edf7ff"]}
    >
      <TouchableOpacity style={{ flexDirection: "row" }} onPress={props.undo}>
        <View
          style={{
            backgroundColor: "green",
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 6,
            alignSelf: "center",
            flexDirection: "row"
          }}
        >
          <Image
            style={{
              width: 16,
              height: 16,
              alignSelf: "center"
            }}
            source={require("../icons/undo.png")}
          />
          <Text style={{ color: "white", fontWeight: "700", paddingLeft: 4 }}>
            Undo
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ flexDirection: "row" }}
        onPress={props.clearAll}
      >
        <View
          style={{
            backgroundColor: "red",
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 6,
            alignSelf: "center",
            flexDirection: "row"
          }}
        >
          <Image
            style={{
              width: 16,
              height: 16,
              alignSelf: "center"
            }}
            source={require("../icons/clear.png")}
          />
          <Text style={{ color: "white", fontWeight: "700", paddingLeft: 4 }}>
            Clear All
          </Text>
        </View>
      </TouchableOpacity>
    </LinearGradient>
  </View>
);

export default Footer;

const Container = styled.View`
  position: absolute;
  background: white;
  width: 33%;
  height: 100%;
  align-self: flex-end;
  flex-direction: column;
  opacity: 0.9;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Home = styled.Image`
  width: 24px;
  height: 24px;
`;
