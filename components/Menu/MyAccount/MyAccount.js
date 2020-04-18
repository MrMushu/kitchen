import React from "react";
import styled from "styled-components";
import {
  Animated,
  Image,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import SwitchToggle from "react-native-switch-toggle";
import Header from "../../Header";

const MyAccount = props => (
  <SettingsContainer>
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ paddingRight: 24, height: '100%' }}
    >
      <View style={{ flexDirection: 'row', paddingHorizontal: "2%", paddingVertical: '3%', width: '100%', justifyContent: "space-between", alignItems: 'flex-end' }}>
        <View style={{ width: '80%', height: '100%', }}>
          <Text style={{ fontSize: 22 }}>My Account</Text>
          <Text style={{ paddingTop: '0%' }} color='darkgrey'>Welcome to your dashboard!</Text>
        </View>
        <View style={{ height: '100%', width: '100%', backgroundColor: 'blue', paddingVertical: '2%' }}>
          <Text>Update</Text>
        </View>
      </View>
      <View style={{ height: '20%', paddingVertical: '5%' }}>
        <SettingsCard style={{ height: '100%', }}>
          <View style={{}}>
            <Text>Merchant:</Text>
            <Text>Location:</Text>

          </View>
        </SettingsCard>
      </View>
      <View style={{ height: '20%', paddingVertical: '5%' }}>
        <SettingsCard style={{ height: '100%', padding: '2%' }}>
          <View style={{}}>
            <Text>EMail </Text>
            <Text>Logout</Text>
            <Text>Subscription</Text>
          </View>
        </SettingsCard>
      </View>

    </ScrollView>
  </SettingsContainer>
);

export default MyAccount;

const LogoutButton = styled.View`
  background-color: white;
  padding: 4px;
  width: 150px;
  border-radius: 4;
  elevation: 2;
`;

const ButtonText = styled.Text``;

const Heading = styled.View`
  align-items: center;
  border-bottom-width: 0.25;
  border-color: grey;
  padding: 24px;
  flex-direction: row;
`;

const HeadingText = styled.Text`
  text-align: center;
  font-size: 16;
  padding-left: 8;
`;

const PaddedContainer = styled.View`
  padding: 12px;
`;

const SectionContainer = styled.View`
  padding: 24px;
`;

const SectionText = styled.Text`
  font-size: 16;
`;

const SectionSubText = styled.Text`
  font-size: 14;
  color: grey;
`;

const SettingsContainer = styled.View`
  width: 100%;
  height: 100%;
  background-color: #edf4ff;
  padding: 12px;
  elevation: 1;
`;

const SettingsCard = styled.View`
  background: white;
  padding: 12px;
  border-radius: 6px;
  elevation: 2;
  box-shadow: 0 5px 0 rgba(0, 0, 0, 0.8);
`;

const ContainerRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding: 12px;
`;
