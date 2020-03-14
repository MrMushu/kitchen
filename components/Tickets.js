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
  LayoutAnimation
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { Transition, animated } from "react-spring/renderprops";
import AnimatedTicket from "./AnimatedTicket";

class Tickets extends React.PureComponent {
  constructor(props) {
    super(props);
    this.ticket4 = [];
    this.state = {
      ticketPos: [],
      width: this.props.width,
      selectedTicket: ""
    };
    this.scrollEnd = this.scrollEnd.bind(this);
    this.selectTicket = this.selectTicket.bind(this);
  }
  selectTicket(id) {
    if (this.state.selectedTicket == id) {
      this.props.doneButton(id);
    } else {
      this.setState({ selectedTicket: id });
    }
  }

  scrollEnd() {
    this.scrollView.scrollToEnd();
  }

  render() {
    console.log("tickets render");
    return (
      <View style={box}>
        <ScrollView
          ref={scrollView => (this.scrollView = scrollView)}
          onContentSizeChange={this.scrollEnd}
          contentContainerStyle={{
            height: "100%",
            flexDirection: "row",
            flexWrap: "wrap",
            borderBottomWidth: 0.25
          }}
        >
          {this.props.orders.slice(0, 8).map((item, i) => {
            return (
              <AnimatedTicket
                key={item.id}
                orderId={item.id}
                width={this.props.width}
                height="50%"
                orders={this.state.orders}
                selectTicket={id => this.selectTicket(id)}
                done={id => this.props.doneButton(id)}
                item={item}
                typeColors={this.props.typeColors}
                employees={this.props.employees}
                orderTypes={this.props.orderTypes}
                style={{ borderBottomWidth: 0.25 }}
                buttonIcon={require("../icons/done.png")}
                buttonLabel="DONE"
              />
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

export default Tickets;

const box = { height: "90%" };

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
