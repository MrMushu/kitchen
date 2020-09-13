import React from "react";
import {
  View,
  Dimensions,
  Text,
  AsyncStorage,
  Animated,
  LayoutAnimation,
  StatusBar,
} from "react-native";
import { ADD_NEW, UPDATE } from "../actions/tickets";
import { connect } from "react-redux";
import Success from "./Success";
import RootContainer from "./RootContainer";
import Menu from "./Menu/Menu";
import Header from "./Header";
const screenHeight = Dimensions.get("screen").height;
const windowHeight = Dimensions.get("window").height;
const navbarHeight = screenHeight - windowHeight + StatusBar.currentHeight;
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const MainStack = createStackNavigator();

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
    };

    this.setupWebSocket = this.setupWebSocket.bind(this);
  }
  setupWebSocket() {
    websocket = new WebSocket(
      "wss://rocky-thicket-13861.herokuapp.com/ws/merchant/",
      this.props.account.merchantId
    );

    websocket.onopen = (evt) => {
      this.onOpen();

      websocket.send(
        JSON.stringify({
          type: "receive",
          merchantId: this.props.account.merchantId,
          code: this.props.account.code,
          datafrom: "none",
        })
      );
      this.setState({ loggedIn: true });
      this.setState({ showTickets: true });
      // while going show loading screen
    };

    websocket.onmessage = (evt) => {
      console.log("websocket received");
      var parsed = JSON.parse(evt.data);
      console.log(parsed);
      var message = parsed["message"];
      var object_type = message["object_type"];
      var order_type = message["order_type"];

      if (object_type == "E") {
        this.setState({ employees: parsed["message"]["employees"] });
      } else if (object_type == "O") {
        if (order_type == "CREATE") {
          this.props.ADD_NEW(parsed["message"]["ticket"]);
        } else if (order_type == "UPDATE") {
          this.props.UPDATE(parsed["message"]["ticket"]);
        }
      } else if (object_type == "D") {
        ticketsPerHour = parsed["message"]["tickets_per_hour"];
        sales = parsed["message"]["sales"];
        averageWait = parsed["message"]["average_wait"];
        console.log(ticketsPerHour, sales, averageWait);
      }
    };

    websocket.onclose = () => {
      (this.state.message = "closed... attempting to reconnect"),
        setTimeout(() => {
          this.setupWebSocket();
        }, 5000);
    };
  }

  menuToggle = () => {
    var menuState = !this.state.menu;
    if (menuState) {
      var changeScreen = "Menu";
    } else {
      var changeScreen = "Root";
    }

    this.props.navigation.navigate("Main", { screen: changeScreen });
    this.setState({ menu: menuState });
  };

  render() {
    return (
      <View style={{ height: "100%" }}>
        <Header menuToggle={this.menuToggle} />
        <NavigationContainer independent={true}>
          <MainStack.Navigator screenOptions={{ headerShown: false }}>
            <MainStack.Screen name="Root" component={RootContainer} />
            <MainStack.Screen
              name="Menu"
              component={Menu}
              options={{ gestureDirection: "horizontal-inverted" }}
            />
          </MainStack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  tickets: state.tickets,
  account: state.account,
});

function mapDispatchToProps(dispatch, ownProps) {
  return {
    ADD_NEW: (ticket) => dispatch({ type: ADD_NEW, data: ticket }),
    UPDATE: (ticket) => dispatch({ type: UPDATE, data: ticket }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
