import React from "react";
import styled from "styled-components";
import {
  Animated,
  Image,
  View,
  Text,
  Button,
  AsyncStorage,
  TouchableOpacity,
  Dimensions
} from "react-native";
import {
  WebView
} from 'react-native-webview'
import QueryString from "qs";
import { URL } from "url";
import { connect } from 'react-redux'
import { LOGIN } from '../actions/login'
import { AuthSession, ScreenOrientation } from 'expo'

import { LinearGradient } from "expo-linear-gradient";

const client_id = 'BHQ5NARB3RR3C'
const width = Dimensions.get("window").width

class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { result: null, success: null }
  }

  handlePressAsync = async () => {
    let redirectUrl = AuthSession.getRedirectUrl()

    let result = await AuthSession.startAsync(
      {
        authUrl:
          `https://sandbox.dev.clover.com/oauth/authorize?client_id=BHQ5NARB3RR3C&state=${redirectUrl}`,
      }
    );
    this.setState({ result });

    if (result.type === 'success') {
      // Just simple way to store the token in this examples
      this.props.login(result.params)
      this.state.success = true


      // sleep for 3 seconds

      this.props.loggedInToggle()


    } else {
      return
    }
  }

  async storeItem(key, value) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  }


  render() {
    return (
      <Container style={{ borderTopLeftRadius: 12, backgroundColor: '#edf7ff' }}>
        <Image source={require('../pngs/splash.png')} resizeMode={'contain'} style={{ width: '100%', alignSelf: 'center', position: 'absolute' }} />
        <View style={{ width: '60%', alignSelf: 'center' }}>

          <Image source={require('../pngs/aspect.png')} resizeMode={'contain'} style={{ width: '60%', alignSelf: 'center' }} />


          <View style={{ justifyContent: 'center', alignSelf: 'center', }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}></Text>
          </View>
        </View>

        <View style={{ height: '100%', width: '40%', padding: '3%', elevation: 2 }}>

          <View style={{ height: '45%', justifyContent: 'flex-end', }}>

            <View style={{}}>
              <Image
                resizeMode={'contain'}
                style={{ alignSelf: "center", width: width / 5, height: width / 16 }}
                source={require("../icons/clover.png")}
              />
            </View>
            <Text style={{ textAlign: 'center', fontWeight: '800', fontSize: 24 }}>
              Login with Clover to start
            </Text>
          </View>
          <View style={{ height: '15%' }} />
          <View style={{
            justifyContent: 'center',
            alignContent: 'center',
            alignSelf: 'center',
            height: '20%',
            width: '90%',
          }}>

            <TouchableOpacity onPress={this.handlePressAsync}>
              <View style={{ backgroundColor: '#346199', padding: 22, justifyContent: 'center', borderRadius: 4, elevation: 4 }}>
                <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Authorize</Text>
              </View>
            </TouchableOpacity>
            <View style={{ padding: 12, justifyContent: 'flex-end' }}>
              <Text style={{ textAlign: 'center' }}>
                Sign-up today ->
              </Text>
            </View>


          </View>
        </View>


        {this.state.result ? <Text>Success!</Text> : null}
      </Container >
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
    login: (params) => dispatch({ type: LOGIN, data: params }),
  })
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);

const Container = styled.View`
  background: white;
  width: 100%;
  height: 100%;
  flex-direction: row
  
`;

const Authorize = styled.Button`
  padding: 12 12 12 12
  width: 100%
  height: 50px
`