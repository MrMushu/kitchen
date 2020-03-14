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
      style={{ paddingBottom: 60, paddingRight: 24 }}
    >
      <Heading>
        <Image
          source={require("../../../icons/gear.png")}
          style={{ height: 20, width: 20, opacity: 0.75 }}
        />
        <HeadingText>My Account</HeadingText>
        <HeadingText>Restore Default Settings</HeadingText>
        <HeadingText>Apply</HeadingText>
      </Heading>

      <SectionContainer>
        <SectionText>My Account</SectionText>
        <SectionSubText>Profile Settings</SectionSubText>
      </SectionContainer>

      <LogoutButton>
        <ButtonText>Logout</ButtonText>
      </LogoutButton>

      <SectionContainer>
        <SectionText>Color Scheme</SectionText>
        <SectionSubText>Adjusts color scheme of the app</SectionSubText>
      </SectionContainer>
      <ContainerRow>
        {Object.keys(colorScheme).map((scheme, i) => (
          <SchemeCard key={i}>
            {selected.colorScheme === i ? (
              <SettingsCard style={{ backgroundColor: "#e8ffe9" }}>
                <Text>{scheme}</Text>
              </SettingsCard>
            ) : (
              <SettingsCard>
                <Text>{scheme}</Text>
              </SettingsCard>
            )}
          </SchemeCard>
        ))}
      </ContainerRow>

      <SectionContainer>
        <SectionText>Order-Type Colors</SectionText>
        <SectionSubText>Adjusts the color of order-types</SectionSubText>
      </SectionContainer>

      <View
        style={{
          width: "100%",
          flexDirection: "row",
          padding: 12,
          borderBottomWidth: 0.35
        }}
      >
        <View
          style={{ paddingLeft: 24, width: "10%", justifyContent: "center" }}
        >
          <Text>Type</Text>
        </View>
        <View
          style={{
            width: "65%",
            borderColor: "grey",
            flexDirection: "row",
            paddingHorizontal: 12,
            justifyContent: "space-evenly"
          }}
        >
          <Text>Choose Color</Text>
        </View>
        <View
          style={{
            width: "25%",
            justifyContent: "space-evenly"
          }}
        >
          <Text style={{ textAlign: "center" }}>Preview</Text>
        </View>
      </View>

      <View style={{ paddingTop: 12 }}>
        {Object.keys(typeColors).map((type, i) => (
          <View
            key={i}
            style={{
              width: "100%",
              flexDirection: "row",
              padding: 12
            }}
          >
            <View style={{ paddingLeft: 24, width: "10%" }}>
              <Text>{type}</Text>
            </View>
            <View
              style={{
                width: "65%",
                borderColor: "grey",
                flexDirection: "row",
                paddingHorizontal: 12,
                justifyContent: "space-evenly"
              }}
            >
              {colors.map((color, i) => (
                <View key={i} style={{ paddingHorizontal: 12 }}>
                  <View style={{ paddingBottom: 9 }}>
                    <LinearGradient
                      colors={color}
                      start={[1, 1]}
                      style={{
                        padding: 12,
                        borderTopLeftRadius: 4,
                        borderRadius: 4,
                        width: "100%"
                      }}
                    />
                  </View>
                  {selected.typeColors[type] === i ? (
                    <View
                      style={{
                        height: 20,
                        width: 20,
                        borderRadius: 75,
                        borderWidth: 0.35,
                        borderColor: "grey",
                        backgroundColor: "#e8ffe9",
                        padding: 12
                      }}
                    />
                  ) : (
                    <View
                      style={{
                        height: 20,
                        width: 20,
                        borderRadius: 75,
                        borderWidth: 0.35,
                        borderColor: "grey",
                        backgroundColor: "white",
                        padding: 12
                      }}
                    />
                  )}
                </View>
              ))}
            </View>
            <View
              style={{
                width: "25%",
                borderColor: "grey"
              }}
            >
              <LinearGradient
                colors={typeColors[type]}
                start={[1, 1]}
                style={{
                  padding: 12,
                  borderTopLeftRadius: 4,
                  borderTopRightRadius: 4,
                  width: "100%"
                }}
              />
              <View
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  alignItems: "center",
                  borderWidth: 0.35,
                  borderColor: "grey",
                  backgroundColor: "white"
                }}
              >
                <Text
                  style={{
                    color: `${typeColors[type][1]}`,
                    fontWeight: "bold"
                  }}
                >
                  * {type} *
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <SectionContainer>
        <SectionText>Font-Size</SectionText>
        <SectionSubText>Adjusts the font-size of tickets</SectionSubText>
      </SectionContainer>

      <ContainerRow>
        {fontSizes.map((size, i) => (
          <View key={i} style={{ width: "25%", padding: 12 }}>
            <FontCard>
              <Text
                style={{
                  alignSelf: "center",
                  textAlign: "center",
                  fontSize: 12 + i * 2
                }}
              >
                {size}
              </Text>
            </FontCard>
          </View>
        ))}
      </ContainerRow>
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

const FontCard = styled.View`
  background: white;
  padding: 12px;
  border-radius: 6px;
  elevation: 2;
  box-shadow: 0 5px 0 rgba(0, 0, 0, 0.8);
  height: 20%;
  justify-content: center;
`;

const SchemeCard = styled.View`
  width: 50%;
  padding: 12px;
`;

const TextCenter = styled.Text`
  text-align: center;
`;

const SubtextCenter = styled.Text`
  text-align: center;
  color: grey;
  font-size: 12px;
`;

var selected = {
  ticketDisplay: 0,
  displayOptions: 0,
  colorScheme: 0,
  typeColors: {
    "To-Go": 0,
    "Dine-In": 2,
    Delivery: 3,
    "Take-Out": 4
  },
  fontSizes: 1
};

var ticketDisplay = [
  {
    name: "Auto View",
    description: "Auto changes between Split View and Full View"
  },
  {
    name: "Split View",
    description: "Displays two rows of tickets"
  },
  {
    name: "Full View",
    description: "Displays one row of tickets"
  }
];

const colorScheme = {
  Default: [],
  Warm: [],
  Dark: [],
  Cool: []
};

const typeColors = {
  "To-Go": ["#4c85ba", "#346199"],
  "Dine-In": ["#ff884d", "#ff7152"],
  Delivery: ["#2cb5d4", "#0890c2"],
  "Take-Out": ["#ffac38", "#ff880f"]
};

const colors = [
  ["#4c85ba", "#346199"],
  ["#ff884d", "#ff7152"],
  ["#2cb5d4", "#0890c2"],
  ["#ffac38", "#ff880f"],
  ["#48c798", "#27a361"],
  ["#93ab76", "#85a676"]
];

const fontSizes = ["Small", "Medium", "Large", "X-large"];
