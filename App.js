import React from "react";
import { View, StatusBar, Dimensions } from 'react-native'
import _ from 'lodash'

import configureStore from './store/configureStore'
import { Provider } from 'react-redux'
import RootContainer from "./components/RootContainer";

store = configureStore()


export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <StatusBar hidden />
        <RootContainer />
      </Provider>
    );
  }
}

