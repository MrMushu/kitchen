import React from "react";
import styled from "styled-components";
import { Animated, Image, View, TouchableOpacity, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { connect } from 'react-redux'
import { UNDO, CLEAR_ALL } from '../actions/tickets'

class Footer extends React.Component {


  render() {
    console.log('FOOTER rerender')
    return (
      <LinearGradient
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: '1%',
          alignItems: "center",
          alignContent: "center",
          width: '100%',
          height: '6%'
        }}
        start={[1, 1]}
        colors={["#edf4ff", "#edf7ff"]}
      >
        <View>
          <Text>
            {this.props.message} - {this.props.note}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', width: '50%', justifyContent: 'flex-end', }}>
          <TouchableOpacity style={{ flexDirection: "row", paddingHorizontal: '1%' }} onPress={this.props.undo}>
            <View
              style={{
                backgroundColor: "green",
                paddingHorizontal: '1%',
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
            onPress={this.props.clearAll}
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
          </TouchableOpacity></View>

      </LinearGradient>

    )
  }
}

function mapStateToProps(state) {
  return {
    tickets: state.tickets
  }
}

function mapDispatchToProps(dispatch) {
  return ({
    undo: () => dispatch({ type: UNDO }),
    clearAll: () => dispatch({ type: CLEAR_ALL })
  })
}



export default connect(mapStateToProps, mapDispatchToProps)(Footer);

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
