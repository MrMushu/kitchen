import React from "react";
import styled from "styled-components";
import {
  Animated,
  Image,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  AsyncStorage,
  FlatList,
  Platform,
  UIManager
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { Transition, animated } from "react-spring/renderprops";

class AnimatedTicket extends React.PureComponent {
  constructor(props) {
    super(props);
    this.ticket4 = [];
    this.state = {
      ticketPos: [],
      orders: this.props.orders,
      width: this.props.width,
      height: this.props.height
    };

    this.deleteItem = this.deleteItem.bind(this);
    this.convertTime = this.convertTime.bind(this);

    this.animatedValue = new Animated.Value(0);

    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  measure() {
    this.ticket4[2].measure((x, y, width, height) => {
      alert(width) & alert(x) & alert(y);
    });
  }

  deleteItem() {
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      this.props.done(this.props.item.id);
    });
  }

  convertTime(time) {
    var date = new Date(time);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return hours + ":" + minutes + "" + ampm;
  }

  orderDelay(time) {
    var currentTime = new Date();
    var currentHour = currentTime.getHours();
    var currentMinute = currentTime.getMinutes();
    var currentSecond = currentTime.getSeconds();

    var orderTime = new Date(time);
    var orderHour = orderTime.getHours();
    var orderMinute = orderTime.getMinutes();
    var orderSecond = orderTime.getSeconds();

    var hours = currentHour - orderHour;

    var minutes = currentMinute - orderMinute + hours * 60;
    var seconds = currentSecond - orderSecond;

    if (seconds < 0) {
      seconds = 60 + seconds;
      minutes += 1;
    }

    return minutes + "m" + " " + seconds + "s";
  }

  componentDidMount() {
    Animated.timing(this.animatedValue, {
      toValue: 0.5,
      duration: 250,
      useNativeDriver: true
    }).start();
  }

  render() {
    const translate_Animation_Object = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 0.75],
      outputRange: [this.props.width * 4, 0, -this.props.width * 4]
    });

    const opacity_Animation_Object = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 0.75],
      outputRange: [0, 1, 0]
    });

    console.log("ticket rendered");
    return (
      <Animated.View
        style={{
          width: this.props.width,
          transform: [{ translateX: translate_Animation_Object }],
          opacity: opacity_Animation_Object
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            height: this.state.height,
            paddingHorizontal: 6,
            borderBottomWidth: 0.25
          }}
        >
          <Ticket
            style={{
              elevation: 5,
              margin: 12
            }}
          >
            <LinearGradient
              colors={this.props.typeColors[`${this.props.item.orderType}`]}
              start={[1, 1]}
              style={{
                padding: 12,
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  width: "100%"
                }}
              >
                <View
                  style={{
                    width: "75%",
                    paddingHorizontal: 6,
                    flexDirection: "row"
                  }}
                >
                  <View
                    style={{
                      flexDirection: "column",
                      width: "50%"
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          color: "white",
                          fontWeight: "bold",
                          fontSize: 16,
                          textAlign: "left",
                          opacity: 1
                        }}
                      >
                        # {this.props.item.orderNumber}
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          color: "white",
                          textAlign: "left",
                          fontWeight: "500",
                          fontSize: 12,
                          opacity: 0.8
                        }}
                      >
                        {this.props.item.employee}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      width: "50%",
                      justifyContent: "space-between",
                      paddingRight: 6
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "500",
                        textAlign: "right",
                        fontSize: 12,
                        opacity: 0.8
                      }}
                    ></Text>
                    <Text
                      style={{
                        color: "white",
                        textAlign: "right",
                        fontWeight: "500",
                        textShadowColor: "#585858",
                        fontSize: 12,
                        opacity: 0.8
                      }}
                    >
                      6:00 pm
                    </Text>
                  </View>
                </View>
                <View style={{ width: "25%" }}>
                  <TouchableOpacity onPress={this.deleteItem}>
                    <View
                      style={{
                        backgroundColor: "#4dab79",
                        width: "100%",
                        height: 37,
                        flexDirection: "row",
                        alignSelf: "flex-end",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                        borderRadius: 6,
                        paddingHorizontal: 7
                      }}
                    >
                      <Image
                        source={this.props.buttonIcon}
                        style={{
                          width: 12,
                          height: 12,
                          alignSelf: "center"
                        }}
                      />
                      <Text
                        style={{
                          textAlign: "right",
                          color: "white",
                          fontSize: 11,
                          fontWeight: "bold"
                        }}
                      >
                        {this.props.buttonLabel}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>

            <View style={{ paddingHorizontal: 12, paddingBottom: 6 }}>
              <View
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  alignItems: "center",
                  borderBottomWidth: 0.35,
                  borderColor: "grey"
                }}
              >
                <Text
                  style={{
                    color: `${
                      this.props.typeColors[this.props.item.orderType][1]
                    }`,
                    fontWeight: "bold"
                  }}
                >
                  * {this.props.orderTypes[`${this.props.item.orderType}`]} *
                </Text>
              </View>
              {this.props.item.lineItems.map((item, i) => (
                <View
                  key={i}
                  style={{
                    paddingVertical: 6,
                    borderBottomWidth: 0.35,
                    borderColor: "grey"
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      paddingVertical: 4
                    }}
                  >
                    <Text
                      style={{
                        paddingHorizontal: 6,
                        fontSize: 18,
                        fontWeight: "bold"
                      }}
                    >
                      {item.qty}
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        paddingHorizontal: 6,
                        fontWeight: "bold"
                      }}
                    >
                      {item.item}
                    </Text>
                  </View>

                  <View>
                    {item.mods.map((mod, i) => (
                      <View
                        key={i}
                        style={{
                          flexDirection: "row",
                          paddingLeft: 24,
                          paddingRight: 6,
                          paddingVertical: 3
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 16,
                            color: "#a6a6a6",
                            paddingRight: 4
                          }}
                        >
                          -
                        </Text>
                        <Text
                          style={{
                            fontSize: 16,
                            color: "#a6a6a6"
                          }}
                        >
                          {mod.name}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>

            <View
              style={{
                backgroundColor: "#ededed",
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4,
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <View
                style={{
                  width: "50%",
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <Image
                  source={require("../icons/time.png")}
                  style={{
                    width: 16,
                    height: 16,
                    opacity: 0.8
                  }}
                />
                <Text
                  style={{
                    textAlign: "left",
                    paddingLeft: 6,
                    justifyContent: "center",
                    opacity: 0.8
                  }}
                >
                  {this.convertTime(this.props.item.createdTime)}
                </Text>
              </View>

              <View
                style={{
                  width: "50%",
                  justifyContent: "flex-end",
                  alignContent: "flex-end",
                  alignItems: "flex-end"
                }}
              >
                <View style={{}}>
                  <Text
                    style={{
                      textAlign: "right",
                      color: "#fa4d43"
                    }}
                  ></Text>
                </View>
              </View>
            </View>
          </Ticket>
        </ScrollView>
      </Animated.View>
    );
  }
}

export default AnimatedTicket;

const animatedContainer = {};
const Colors = [
  ["#4c85ba", "#346199"],
  ["#ff884d", "#ff7152"],
  ["#2cb5d4", "#0890c2"],
  ["#ffac38", "#ff880f"],
  ["#4c85ba", "#346199"],
  ["#48c798", "#27a361"],
  ["#93ab76", "#85a676"],
  ["#ff884d", "#ff7152"],
  ["#ff884d", "#ff7152"],
  ["#ff884d", "#ff7152"],
  ["#ff884d", "#ff7152"],
  ["#ff884d", "#ff7152"]
];

const Order = styled.View`
  border-style: solid;
`;

const Ticket = styled.View`
  border-radius: 4px;
  background-color: white;
`;
