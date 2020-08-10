import React from "react";
import styled from "styled-components";
import LottieView from 'lottie-react-native'
import {
    Animated,
    Image,
    View,
    Text,
    Button,
    AsyncStorage,
    TouchableOpacity,
    Dimensions,
    Easing
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
const screenHeight = Dimensions.get("window").height;

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: null,
            success: null,
            opacity: 1,
            top: new Animated.Value(0)
        };
        this.animatedOpacity = new Animated.Value(1)
        this.animatedOpacity2 = new Animated.Value(1)
        this.animatedOpacity3 = new Animated.Value(1)
        this.animatedTop = new Animated.Value(0);
        this.animatedLeft = new Animated.Value(0);
        this.animatedValue = new Animated.Value(-1);

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
            // show success screen!
            setTimeout(() => { this.props.loggedInToggle() }, 3000)


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

    componentDidMount() {
        if (this.props.loading === true) {

        }
        // splash opacity





    }

    componentDidUpdate() {

    }

    render() {
        if (this.props.loading === true) {
            setTimeout(() => {
                Animated.timing(this.animatedOpacity, {
                    toValue: 0.0,
                    duration: 600,
                    useNativeDriver: true,
                }).start();
            }, 2000);

            // rounded moving to top
            setTimeout(() => {
                Animated.timing(this.animatedLeft, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,


                }).start();
            }, 4000);

            // checkbox render
            setTimeout(() => {
                this.animation.play();
            }, 750);

            // full container opacity
            setTimeout(() => {

                Animated.timing(this.animatedOpacity2, {
                    toValue: 0,
                    duration: 900,
                    useNativeDriver: true
                }).start()
            }, 5000);


            setTimeout(() => {

                Animated.timing(this.animatedTop, {
                    toValue: screenHeight,
                    duration: 1000,
                    useNativeDriver: true,
                    easing: Easing.elastic(.5)
                }).start()
            }, 8000);
            setTimeout(() => {

                Animated.timing(this.animatedOpacity3, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true
                }).start()
            }, 9000);

        }

        const translate_Animation_Object = this.animatedLeft.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -screenHeight * .93]
        });

        const translate_Animation_Opacity = this.animatedOpacity2.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
        });

        const translate_Animation_Opacity2 = this.animatedOpacity3.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
        });


        return (
            <AnimatedContainer style={{
                transform: [{ translateY: this.animatedTop },], position: 'absolute', justifyContent: 'center',
            }}>



                <AnimatedContainer style={{ height: '100%', width: '100%', left: '0%', top: 0, position: 'absolute', opacity: translate_Animation_Opacity2 }}>

                    <LinearGradient
                        start={[1, 1]}
                        colors={["#edf4ff", "#edf7ff"]}
                        style={{ top: '7%', height: '93%', width: '100%', justifyContent: 'center' }}

                    >

                    </LinearGradient>
                    <AnimatedContainer style={{ position: 'absolute', transform: [{ translateY: translate_Animation_Object }], opacity: translate_Animation_Opacity }}>
                        <LinearGradient
                            start={[1, 1]}
                            colors={["#5f8ac7", "#3d6cad"]}
                            style={{ paddingHorizontal: '2%', flexDirection: 'row', height: '100%', width: '100%' }}
                        ></LinearGradient>

                    </AnimatedContainer>



                    <Text style={{ fontSize: 24 }}></Text>

                </AnimatedContainer>
                <View style={{ backgroundColor: 'white', paddingTop: '2%', width: '35%', height: '35%', alignSelf: 'center', borderRadius: 16, elevation: 4 }}>

                    <View style={{ justifyContent: 'center', }}>

                    </View>
                    <LottieView
                        style={{ alignSelf: 'center', height: '60%' }}
                        source={require('../assets/success.json')}
                        loop={false}
                        ref={animation => {
                            this.animation = animation
                        }}
                        speed={.9}
                    />
                    <View style={{ justifyContent: 'center', }}>
                        <Text style={{ textAlign: 'center', fontWeight: '800', fontSize: 32 }}>
                            Success!
                        </Text>
                        <Text style={{ textAlign: 'center', }}>
                            Loading app...
                        </Text>
                    </View>


                </View>

            </AnimatedContainer >

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

  width: 100%;
  height: 100%;
  flex-direction: row
  
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container)