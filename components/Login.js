import React from "react";
import styled from "styled-components";
import {
  Animated,
  Image,
  View,
  Text,
  WebView,
  AsyncStorage
} from "react-native";
import QueryString from "qs";
import { URL } from "url";

class Login extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  onNavigationStateChange = navState => {
    urlCheck =
      "https://sandbox.dev.clover.com/oauth/authorize?client_id=BHQ5NARB3RR3C";
    if (urlCheck !== navState.url) {
      url = navState.url;
      urlCheck = url;
      const parsedUrl = QueryString.parse(url.split("?")[1]);

      if (
        url.includes("rocky") &&
        parsedUrl["code"] &&
        parsedUrl["merchant_id"] &&
        parsedUrl["employee_id"]
      ) {
        const parsedUrl = QueryString.parse(url.split("?")[1]);

        merchantId = parsedUrl["merchant_id"];
        code = parsedUrl["code"];

        // get token from

        this.storeItem("merchantId", merchantId);
        this.storeItem("code", code);

        this.props.loggedInToggle();
      }
    }
  };

  async storeItem(key, value) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <Container style={{ borderTopLeftRadius: 12 }}>
        <Cover>
          <WebView
            source={{
              uri:
                "https://sandbox.dev.clover.com/oauth/authorize?client_id=BHQ5NARB3RR3C"
            }}
            onNavigationStateChange={this.onNavigationStateChange}
            style={{ padding: 60 }}
            scrollEnabled={true}
          ></WebView>
        </Cover>
        <LoginContainer>
          <View></View>
          <TextContainer placeholder="email" />
          <TextContainer placeholder="password" />
        </LoginContainer>
      </Container>
    );
  }
}

export default Login;

const Container = styled.View`
  position: absolute;
  background: white;
  width: 100%;
  height: 100%;
  align-self: flex-end;
  flex-direction: row;
`;

const Cover = styled.View`
  height: 100%;
  width: 100%;
  background: #5f8ac7;
  border-bottom-width: 1;
`;

const LoginContainer = styled.View`
  padding-top: 25%;
  background: #edf4ff;
  width: 33%;
  height: 100%;
  align-items: center;
`;

const TextContainer = styled.TextInput`
  width: 80%;
  border: 1px;
  padding: 12px;
  padding-left: 24px;
`;

const IconContainer = styled.View`
  width: 25%;
  align-items: flex-end;
  padding: 12px;
`;

const Icon = styled.Image`
  height: 50px;
  width: 50px;
`;

const LabelContainer = styled.View`
  width: 75%;
  padding: 12px;
`;
const Label = styled.Text`
  font-size: 18;
`;

const tabs = [
  {
    icon: require("../icons/user.png"),
    label: "Account"
  },
  {
    icon: require("../icons/display.png"),
    label: "Display"
  },
  {
    label: "Completed Orders"
  },
  {
    label: "Help"
  }
];
