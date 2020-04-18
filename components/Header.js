import React from "react";
import styled from "styled-components";
import { Animated, Image, View, TouchableOpacity, Text, } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Header = props => (
  <LinearGradient
    start={[1, 1]}
    colors={["#5f8ac7", "#3d6cad"]}
    style={{ paddingHorizontal: '2%', flexDirection: 'row', height: '7%' }}
  >
    <View style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: 'center'

    }}>

      <View
        style={{
          width: "50%",
          flexDirection: 'row',
          alignItems: 'center'
        }}

      >


        <View style={{ paddingLeft: '2%' }}>
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontFamily: "sans-serif",
            }}
          >aspect kitchen display</Text>
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
    </View>
  </LinearGradient>


);

export default Header;

const Home = styled.Image`
  width: 24px;
  height: 24px;
`;
