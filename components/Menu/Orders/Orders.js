import React from "react";
import styled from "styled-components";
import {
  Animated,
  Image,
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import SwitchToggle from "react-native-switch-toggle";
import Header from "../../Header";
import AnimatedTicket from "../../AnimatedTicket";
import CompletedOrders from "./CompletedOrders";
import { connect } from 'react-redux'

import { COMPLETED_UNDO } from '../../../actions/tickets'

class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeValue: new Animated.Value(0),
      todayButton: '#346199',
      lastButton: '#edf4ff',
      blue: '#24354a',
      darkgrey: '#858585',
      orange: ["#ffac38", "#ff880f"],
      lightBlue: ["#2cb5d4", "#0890c2"],
      lightGrey: ['#b8b8b8', '#b8b8b8'],
      completedLength: this.props.tickets.completed.length,
      completed: this.props.completed,
      selectedItem: 'none',
      tickets: this.props.tickets

    }
    this.todayToggle = this.todayToggle.bind(this)
    this.lastToggle = this.lastToggle.bind(this)
    this.undo = this.undo.bind(this)
    this.selectItem = this.selectItem.bind(this);
  }

  todayToggle() {
    if (this.state.todayButton === '#edf4ff') {
      console.log('today')
    }
    this.setState({ todayButton: '#346199', lastButton: '#edf4ff' })
  }

  lastToggle() {
    this.setState({ todayButton: '#edf4ff', lastButton: '#346199' })
  }

  undo(id) {
    this.props.completedUndo(id)
    this.setState({ selectedItem: 'none' })
  }


  selectItem(id) {
    console.log(id)
    var find = this.state.tickets.completed.find(order => order.id === id)
    this.setState({
      selectedItem: find,
    });
    console.log("CHECK", this.state.selectedItem)
  }




  render() {
    console.log('Dashboard: ', this.props.dashboard)
    return (
      <SettingsContainer>
        <CompletedOrders
          done={this.props.done}
          width={this.props.width}
          typeColors={this.props.typeColors}
          employees={this.props.employees}
          orderTypes={this.props.orderTypes}
          selectItem={this.selectItem}
          selectedItem={this.state.selectedItem}
          pages={this.props.pages}
          selectPage={this.props.selectPage}
          selectedPage={this.props.selectedPage}
          lastToggle={this.lastToggle}
          todayToggle={this.todayToggle}
          todayColor={this.state.todayButton}
          lastColor={this.state.lastButton}
          undoSettings={this.undo}
          completed={this.props.tickets.completed}
          checkCompleted={this.props.checkCompleted}
        />

        <View style={{ flexDirection: "row", paddingHorizontal: 24 }}>
          <View style={{ paddingRight: 12 }}>
            <SettingsCard>
              <Text>Dashboard</Text>
            </SettingsCard>
          </View>
          <View>
            <SettingsCard>
              <Text>Completed Orders </Text>
            </SettingsCard>
          </View>
        </View>
      </SettingsContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    tickets: state.tickets,
    dashboard: state.dashboard
  }
}

function mapDispatchToProps(dispatch) {
  return ({
    completedUndo: (id) => dispatch({ type: COMPLETED_UNDO, id: id })
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);



const SettingsContainer = styled.View`
  width: 100%;
  height: 100%;
`;

const SettingsCard = styled.View`
  background: white;
  padding: 12px;
  border-radius: 6px;
  elevation: 4;
  box-shadow: 0 5px 0 rgba(0, 0, 0, 0.8);
`;


