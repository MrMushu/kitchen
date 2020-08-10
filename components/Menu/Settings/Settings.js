import React from "react";
import styled from "styled-components";
import {
  Animated,
  Image,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  StyleSheet
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import SwitchToggle from "react-native-switch-toggle";
import Header from "../../Header";

import { connect } from 'react-redux'
import { SAVE_SETTINGS, RESET_SETTINGS } from '../../../actions/settings'

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: Object.create(this.props.account.settings),
      selected: {}
    };

    this.selectItem = this.selectItem.bind(this);
    this.selectTypeColor = this.selectTypeColor.bind(this);
    this.apply = this.apply.bind(this)
  }

  selectItem(item, id) {

    var newSettings = Object.assign(this.state.settings, { [item]: id });
    this.setState({ settings: newSettings });
  }

  selectTypeColor(item, id) {

    var newSettings = Object.create(this.state.settings)

    Object.assign(newSettings.typeColors, { [item]: id });
    this.setState({ settings: newSettings });
  }


  resetDefault() {
    return null;
  }

  apply() {
    this.props.save(this.state.settings)
  }

  componentDidMount() {
    this.setState({ selected: this.state.settings })
  }

  render() {
    selected = this.state.settings;
    return (
      <SettingsContainer>


        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ padding: "2%", }}
        >
          <View style={{ flexDirection: 'row', paddingTop: '2%', paddingVertical: '2%', paddingLeft: '2%', justifyContent: "space-between", alignItems: 'flex-end' }}>
            <View style={{ width: '80%' }}>
              <Text style={{ fontSize: 22 }}>Settings</Text>
              <Text style={{ paddingTop: '0%', color: 'darkgrey', fontWeight: 'bold' }} >Change Settings</Text>
            </View>
            <View style={{ width: '10%', alignSelf: 'flex-end' }}>
              <TouchableOpacity onPress={this.apply}>
                <LinearGradient
                  colors={["#ff884d", "#ff7152"]}
                  start={[1, 1]}
                  style={{
                    padding: '10%',
                    borderRadius: 4,

                  }}>

                  <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>APPLY</Text>

                </LinearGradient>
              </TouchableOpacity>


            </View>

          </View>

          <SettingsCard>
            <SectionContainer>
              <SectionText>Ticket Display Options</SectionText>
              <SectionSubText>choose ticket display view</SectionSubText>
            </SectionContainer>

            <ContainerRow>
              {ticketDisplay.map((option, i) => (
                <View
                  key={i}
                  style={{
                    flexDirection: "column",
                    width: "33.3%",
                    alignSelf: "center",
                    padding: "1%"
                  }}
                >
                  {selected.ticketDisplay === i ? (
                    <TouchableOpacity>
                      <SettingsCard
                        style={{
                          borderColor: "#ffde7d",
                          borderWidth: 4,
                          backgroundColor: "#fffff7"
                        }}
                      >
                        <TextCenter style={{}}>{option.name}</TextCenter>
                        <PaddedContainer>
                          <Image
                            style={{
                              alignSelf: "center",
                              height: 185,
                              width: 250
                            }}
                            source={require("../../../pngs/DisplayView.png")}
                          />
                        </PaddedContainer>
                        <SubtextCenter>{option.description}</SubtextCenter>
                      </SettingsCard>
                      <View style={{ paddingTop: 12 }}>
                        <View
                          style={{
                            backgroundColor: "#ffde7d",
                            width: 20,
                            height: 20,
                            alignSelf: "center",
                            justifyContent: "space-around",
                            borderRadius: 32
                          }}
                        >
                          <View
                            style={{
                              backgroundColor: "#f7f7f7",
                              width: 10,
                              height: 10,
                              alignSelf: "center",
                              borderRadius: 32
                            }}
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                  ) : (
                      <TouchableOpacity
                        onPress={() => this.selectItem("ticketDisplay", i)}
                      >
                        <SettingsCard
                          style={{
                            backgroundColor: "#f7f7f7"
                          }}
                        >
                          <TextCenter>{option.name}</TextCenter>
                          <PaddedContainer>
                            <Image
                              style={{
                                alignSelf: "center",
                                height: 185,
                                width: 250
                              }}
                              source={require("../../../pngs/DisplayView.png")}
                            />
                          </PaddedContainer>
                          <SubtextCenter>{option.description}</SubtextCenter>
                        </SettingsCard>
                        <View style={{ paddingTop: 12 }}>
                          <View
                            style={{
                              backgroundColor: "#f7f7f7",
                              width: 20,
                              height: 20,
                              alignSelf: "center",
                              justifyContent: "space-around",
                              borderRadius: 32
                            }}
                          />
                        </View>
                      </TouchableOpacity>
                    )}
                </View>
              ))}
            </ContainerRow>
          </SettingsCard>
          <View style={{ paddingVertical: "2%" }}>
            <SettingsCard>
              <SectionContainer>
                <SectionText>Tickets per Row</SectionText>
                <SectionSubText>Adjusts amount of tickets on screen</SectionSubText>
              </SectionContainer>
              <ContainerRow>
                {Object.keys(colorScheme).map((scheme, i) => (
                  <SchemeCard key={i}>
                    {selected.ticketsPerRow === colorScheme[scheme] ? (
                      <TouchableOpacity style={{ flexDirection: "row" }}>
                        <View
                          style={{ paddingRight: 24, justifyContent: "center" }}
                        >
                          <View
                            style={{
                              backgroundColor: "#ffde7d",
                              width: 20,
                              height: 20,
                              alignSelf: "center",
                              justifyContent: "space-around",
                              borderRadius: 32
                            }}
                          >
                            <View
                              style={{
                                backgroundColor: "#f7f7f7",
                                width: 10,
                                height: 10,
                                alignSelf: "center",
                                borderRadius: 32
                              }}
                            />
                          </View>
                        </View>
                        <SettingsCard
                          style={{
                            borderColor: "#ffde7d",
                            borderWidth: 2,
                            width: "80%"
                          }}
                        >
                          <Text style={{}}>{scheme}</Text>
                        </SettingsCard>
                      </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                          onPress={() => this.selectItem("ticketsPerRow", colorScheme[scheme])}
                          style={{ flexDirection: "row" }}
                        >
                          <View
                            style={{ paddingRight: 24, justifyContent: "center" }}
                          >
                            <View
                              style={{
                                backgroundColor: "#f7f7f7",
                                width: 20,
                                height: 20,
                                alignSelf: "center",
                                justifyContent: "space-around",
                                borderRadius: 32
                              }}
                            />
                          </View>
                          <SettingsCard
                            style={{ backgroundColor: "#f7f7f7" }}
                            width="80%"
                          >
                            <Text>{scheme}</Text>
                          </SettingsCard>
                        </TouchableOpacity>
                      )}
                  </SchemeCard>
                ))}
              </ContainerRow>
            </SettingsCard>
          </View>
          <SettingsCard>
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
                style={{
                  paddingLeft: 24,
                  width: "10%",
                  justifyContent: "center"
                }}
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
              {Object.keys(selected.typeColors).map((type, i) => (
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
                          <TouchableOpacity>
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
                          </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                              onPress={() => this.selectTypeColor(type, i)}
                            >
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
                            </TouchableOpacity>
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
                      colors={colors[selected.typeColors[type]]}
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
                          color: `${
                            colors[selected.typeColors[type]][1]
                            }`,
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
          </SettingsCard>
          <View></View>
          <SettingsCard>
            <SectionContainer>
              <SectionText>Font-Size</SectionText>
              <SectionSubText>Adjusts the font-size of tickets</SectionSubText>
            </SectionContainer>
          </SettingsCard>


          <ContainerRow>
            {fontSizes.map((size, i) => (
              <View key={i} style={{ width: "25%" }}>
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
          <TouchableOpacity onPress={this.apply}>
            <View
              style={{
                backgroundColor: "#30baa3",
                borderRadius: 6,
                height: "5%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <View style={{ paddingRight: 5 }}>
                <Image
                  style={{
                    alignSelf: "center",
                    height: 15,
                    width: 15
                  }}
                  source={require("../../../icons/check.png")}
                />
              </View>

              <View>
                <Text style={{ color: "white", fontWeight: "bold" }}>SAVE</Text>
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </SettingsContainer>
    );
  }
}
function mapStateToProps(state) {
  return {
    account: state.account
  }
}


function mapDispatchToProps(dispatch) {
  return ({
    save: (newSettings) => dispatch({ type: SAVE_SETTINGS, data: newSettings }),
  })
}
export default connect(mapStateToProps, mapDispatchToProps)(Settings);



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
  padding-left: 4%;
  padding-top: 2%;
  padding-bottom: 2%;
`;

const SectionText = styled.Text`
  font-size: 16;
`;

const SectionSubText = styled.Text`
  font-size: 12;
  color: grey;
`;

const SettingsContainer = styled.View`
  width: 100%;
  height: 100%;
  elevation: 4;
`;

const SettingsCard = styled.View`
  background: white;
  padding: 12px;
  border-radius: 6px;
  elevation: 4;
  border-color: grey;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.8);
`;

const ContainerRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding-left: 2%;
  padding-right: 2%;
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
  '7 Tickets': 7,
  '6 Tickets': 6,
  '5 Tickets': 5,
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
