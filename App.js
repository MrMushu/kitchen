import "react-native-gesture-handler";
import React from "react";
import { View, StatusBar, Dimensions } from "react-native";
import _ from "lodash";

import configureStore from "./store/configureStore";
import { Provider } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./components/Login";
import Main from "./components/Main";

store = configureStore();

const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <StatusBar hidden />
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Main" component={Main} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
