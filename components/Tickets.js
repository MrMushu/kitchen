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
  LayoutAnimation,
  Dimensions
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { Transition, animated } from "react-spring/renderprops";
import AnimatedTicket from "./AnimatedTicket";

import { connect } from 'react-redux'

const areEqual = (prevProps, nextProps) => {
  return (prevProps.item.updated === nextProps.item.updated)
};

const DisplayTickets = React.memo(AnimatedTicket, areEqual);


class Tickets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ticketPos: [],
      width: Math.round(Dimensions.get("window").width / 5.01),

    };
    this.scrollEnd = this.scrollEnd.bind(this);
    this.done = this.done.bind(this)

  }



  scrollEnd() {
    this.scrollView.scrollToEnd();
  }

  done = (item) => (this.props.doneButton(item), console.log("props: ", this.props.tickets))




  render() {
    console.log("TICKETS rerender")
    return (
      <View style={box} >
        <ScrollView
          ref={scrollView => (this.scrollView = scrollView)}
          onContentSizeChange={this.scrollEnd}
          contentContainerStyle={{
            height: "100%",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {this.props.tickets.pending.length === 0 ? (
            <View style={{ justifyContent: 'center', alignContent: 'center' }}>
              <Text style={{ textAlign: 'center' }}></Text>
            </View>
          ) : null}
          {this.props.tickets.pending.map((item, i) => (
            <DisplayTickets
              key={item.id}
              orderId={item.id}
              height="49.5%"
              item={item}
              style={{ borderBottomWidth: 0.25 }}
              buttonIcon={require("../icons/done.png")}
              buttonLabel="DONE"
              enabled='true' />
          ))}


        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    tickets: state.tickets
  }
}



export default connect(mapStateToProps)(Tickets)

const box = { height: "95.5%" };

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
