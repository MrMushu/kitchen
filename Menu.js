import React from "react";
import styled from "styled-components";
import { Animated, Image, View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import SwitchToggle from "react-native-switch-toggle";

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      switchOn: false
    };
    this.menuToggle = this.props.menuToggle.bind(this);
  }

  switchToggle() {
    this.setState({ switchOn: !this.state.switchOn });
  }

  render() {
    return (
      <View style={{ height: "100%" }}>
        <LinearGradient
          colors={["#edf4ff", "#edf7ff"]}
          style={{
            elevation: 20,
            borderTopLeftRadius: 12,
            width: "100%",
            height: "100%",
            zIndex: 3,
            position: "absolute"
          }}
        >
          <Cover style={{ borderTopLeftRadius: 12, flexDirection: "row" }}>
            <TouchableOpacity
              onPress={this.menuToggle}
              style={{ padding: 24, alignSelf: "center" }}
            >
              <Image
                style={{ alignSelf: "center", width: 25, height: 25 }}
                source={require("../icons/back.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 12, alignSelf: "center" }}>
              <Text style={{ alignSelf: "center" }}> Settings</Text>
            </TouchableOpacity>
          </Cover>
          {tabs.map((tab, i) => (
            <View key={i}>
              <View style={{ flexDirection: "row" }}>
                <Category>{tab.label}</Category>
              </View>
              {tab.lines.map((setting, i) => (
                <SettingsLine key={i}>
                  <SettingsText>{setting}</SettingsText>
                </SettingsLine>
              ))}
            </View>
          ))}
        </LinearGradient>
      </View>
    );
  }
}

export default Menu;

const Category = styled.Text`
  width: 100%;
  padding: 18px;
  color: grey;
  border-bottom-width: 0.5px;
`;

const SettingsLine = styled.View`
  flex-direction: row;
  padding: 12px;
  background-color: white;
  border-bottom-width: 0.5px;
`;

const SettingsText = styled.Text``;

const TabContainer = styled.View`
  padding: 12px;
  flex-direction: row;
`;

const Container = styled.View`
  position: absolute;
  background: white;
  width: 100%;
  height: 100%;
  align-self: flex-end;
  flex-direction: column;
  opacity: 1;
  z-index: 500;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Cover = styled.View`
  height: 89px;
  z-index: 2;
  opacity: 1;
  border-bottom-width: 1;
  opacity: 0.9;
`;

const IconContainer = styled.View`
  width: 25%;
  align-items: flex-end;
  padding: 12px;
`;

const Icon = styled.Image`
  height: 50px;
  width: 50px;
`;

const LabelContainer = styled.View`
  width: 75%;
  padding: 12px;
`;
const Label = styled.Text`
  font-size: 18;
`;

const tabs = [
  {
    icon: require("../icons/user.png"),
    label: "Account",
    lines: ["My Clover Account", "Logout"]
  },
  {
    icon: require("../icons/display.png"),
    label: "Display",
    lines: ["Font-size", "Display 8 Tickets", "Set OrderType Colors"]
  },
  {
    label: "Completed Orders",
    lines: []
  },
  {
    label: "Help",
    lines: []
  }
];
