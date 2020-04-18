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
  UIManager,
  setTimeout,
  Dimensions,
  Easing
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { Transition, animated } from "react-spring/renderprops";
import { connect } from 'react-redux'
import { DONE, UPDATE } from '../actions/tickets'


class AnimatedTicket extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.item.updated !== this.props.item.updated) {
      return true
    }
    return false
  }
  constructor(props) {
    super(props);
    this.ticket4 = [];
    this.state = {
      ticketPos: [],
      width: Math.round(Dimensions.get("window").width / this.props.account.settings.ticketsPerRow + .01),
      lastPress: 0,
      height: '50%'
    };

    this.deleteItem = this.deleteItem.bind(this);
    this.doubleTap = this.doubleTap.bind(this);
    this.animatedValue = new Animated.Value(-1);

    this.saveBumpDelay = this.saveBumpDelay.bind(this)
    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  saveBumpDelay() {

    var month = new Date().getMonth() + 1
    var day = new Date().getDate()
    var year = new Date().getFullYear()
    var date_str = year + '/' + month + '/' + day
    var date = new Date(date_str).getTime() / 1000
    var tickets = this.props.tickets.completed.filter(ticket => ticket.createdTime > date)
    var total = 0
    for (var i = 0; i < tickets.length; i++) {
      total = total + tickets[i].bumpDelay;
    }
    var rate = total / tickets.length
    console.log('RATE', rate)
    axios
      .post(`https://rocky-thicket-13861.herokuapp.com/api/saveBumpDelay/`, {

        merchant_id: this.props.account.merchantId,
        code: this.props.account.code,
        date: date_str,
        rate: rate

      })
      .catch(function (err) {
        console.log("error: ", err);
      });
  }

  measure() {
    this.ticket4[2].measure((x, y, width, height) => {
      alert(width) & alert(x) & alert(y);
    });
  }

  doubleTap() {
    if (this.props.enabled == 'true') {
      var delta = new Date().getTime() - this.state.lastPress;

      if (delta < 200) {
        var finishedItem = this.props.item
        finishedItem.bumpDelay = (parseInt(this.state.lastPress / 1000) - finishedItem.createdTime / 1000)

        this.deleteItem(finishedItem);

        console.log("double tapped");


      } else {
        this.setState({
          lastPress: new Date().getTime()
        });
      }


    }
  }


  deleteItem(ticket) {

    Animated.timing(this.animatedValue, {
      toValue: .85,
      duration: 185,
      useNativeDriver: true
    }).start(() => {

      this.props.done(ticket);

    });



  }

  componentDidMount() {
    Animated.timing(this.animatedValue, {
      toValue: 0.5,
      duration: 400,
      useNativeDriver: true
    }).start();
  }


  render() {
    const translate_Animation_Object = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 0.75],
      outputRange: [this.state.width * 5, 0, -this.state.width * 5]
    });

    const opacity_Animation_Object = this.animatedValue.interpolate({
      inputRange: [.4, 0.5, 0.55],
      outputRange: [0, 1, 0]
    });


    console.log("ticket", this.props.key, "rendered");
    return (
      <Animated.View
        style={{
          width: this.state.width,
          transform: [{ translateY: translate_Animation_Object }],
          opacity: opacity_Animation_Object,
          borderBottomWidth: .25,
          borderColor: '#b3b5b4'
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            height: this.state.height,
            paddingHorizontal: 0
          }}
        >
          <TouchableOpacity onPress={this.doubleTap}>
            <Ticket
              style={{
                elevation: 5,
                margin: 12
              }}
            >
              <LinearGradient
                colors={Colors[this.props.account.settings.typeColors[`${this.props.item.orderType}`]]}
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
                      width: "100%",
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
                      >
                        {this.props.item.employee}
                      </Text>
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
                        {this.props.item.time}
                      </Text>
                    </View>
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
                        Colors[this.props.account.settings.typeColors[this.props.item.orderType]][1]
                        }`,
                      fontWeight: "bold"
                    }}
                  >
                    * {this.props.item.orderType} *
                  </Text>
                  {(this.props.item.note !== 'null') ?
                    (<View>
                      <Text style={{ fontSize: 12 }}>
                        Note: {this.props.item.note}
                      </Text>
                    </View>) : null}
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
                    {this.props.item.time}
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
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>
    );
  }
}

function mapStateToProps(state) {
  return {
    tickets: state.tickets,
    account: state.account
  }
}


function mapDispatchToProps(dispatch, ) {
  return ({
    done: (ticket) => dispatch({ type: DONE, data: ticket }),
    update: (ticket) => dispatch({ type: UPDATE, data: ticket }),
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(AnimatedTicket);



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
