import React from "react";
import {
    View,
    Dimensions,
    Text,
    AsyncStorage,
    Animated,
    LayoutAnimation,
    StatusBar
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import axios from "axios";

import Login from "./Login";
import Header from "./Header";
import Tickets from "./Tickets";
import Footer from "./Footer";
import Menu from "./Menu/Menu";
import Loading from "./Loading";
import _ from 'lodash'

import { ADD_NEW, UPDATE } from '../actions/tickets'
import { connect } from 'react-redux'

const screenHeight = Dimensions.get('screen').height;
const windowHeight = Dimensions.get('window').height;
const navbarHeight = screenHeight - windowHeight + StatusBar.currentHeight;


class RootContainer extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            width: Math.round(Dimensions.get("window").width / 5.01),
            height: Dimensions.get("window").height,
            loggedIn: false,
            loading: false,
            menu: false,
            showTickets: true,
            display8: true,
            checkLimit: false
        };

        this.menuToggle = this.menuToggle.bind(this);
        this.refresh = this.refresh.bind(this);
        this.loggedInToggle = this.loggedInToggle.bind(this);
        this.checkOrders = this.checkOrders.bind(this);
        this.limit = this.limit.bind(this);
        this.setupWebSocket = this.setupWebSocket.bind(this)
    }

    refresh() {

    }
    // login wait 2 seconds after websocket show login string


    setupWebSocket() {
        websocket = new WebSocket(
            "wss://rocky-thicket-13861.herokuapp.com/ws/merchant/",
            this.props.account.merchantId
        );

        websocket.onopen = evt => {
            this.onOpen();

            websocket.send(
                JSON.stringify({
                    type: "receive",
                    merchantId: this.props.account.merchantId,
                    code: this.props.account.code,
                    datafrom: "none"
                })
            );
            this.setState({ loggedIn: true });
            this.setState({ showTickets: true });
            ;
            // while going show loading screen
        };

        websocket.onmessage = evt => {
            console.log("websocket received");
            var parsed = JSON.parse(evt.data);
            console.log(parsed);
            var message = parsed['message']
            var object_type = message['object_type']
            var order_type = message['order_type']

            if (object_type == "E") {
                this.setState({ employees: parsed["message"]["employees"] });
            } else if (object_type == "O") {
                if (order_type == 'CREATE') {
                    this.props.ADD_NEW(parsed['message']['ticket'])
                } else if (order_type == 'UPDATE') {
                    this.props.UPDATE(parsed['message']['ticket'])
                }



            } else if (object_type == "D") {
                ticketsPerHour = parsed['message']['tickets_per_hour']
                sales = parsed['message']['sales']
                averageWait = parsed['message']['average_wait']
                console.log(ticketsPerHour, sales, averageWait)
            }
        }


        websocket.onclose = () => {
            (this.state.message = "closed... attempting to reconnect",
                this.setupWebSocket())
        }
    }


    onOpen(evt) {
        this.setState({ message: "Opened websocket" });
    }

    limit() {
        this.setState({ checkLimit: false });
    }

    checkOrders() {
        console.log(this.state.checkLimit)
        if (this.state.checkLimit === false) {

            this.setState({ checkLimit: true });
            console.log("checked");
            var pastHour = Math.round((Date.now() - 3600000) / 1000);
            var totalOrders = this.props.tickets.pending.concat(this.props.tickets.completed);
            var hourOrders = totalOrders.filter(
                h => h.createdTime / 1000 >= pastHour
            );
            var hourIds = hourOrders.map(o => o.id);
            websocket.send(
                JSON.stringify({
                    type: "receive",
                    merchantId: this.props.account.merchantId,
                    code: this.props.account.code,
                    token: this.props.account.token,
                    datafrom: "check",
                    hourOrders: hourIds
                })
            )
        } else {
            return
        }

    }

    menuToggle() {
        var ticketToggle = !this.state.showTickets;
        this.setState({ showTickets: ticketToggle });
        var toggle = !this.state.menu;
        this.setState({ menu: toggle });
        console.log('Menu Toggled')
    }

    async getStorage(key) {
        try {
            const result = await AsyncStorage.getItem(key);

            this.setState({ [key]: JSON.parse(result) });

            var date = new Date();
        } catch (error) {
            console.log(error);
        }
    }

    getEmployees() {
        var self = this;
        axios
            .get(`https://rocky-thicket-13861.herokuapp.com/oauth/employees/`, {
                params: {
                    merchant_id: `${this.state.merchantId}`,
                    code: `${this.state.code}`
                }
            })
            .then(response => {
                var employees = JSON.parse(response.data);
                self.setState({ employees: employees });
                console.log("employees: " + JSON.stringify(employees));
            })
            .catch(function (err) {
                console.log("error: ", err);
            });
    }

    getOrderTypes() {
        var self = this;
        axios
            .get(`https://rocky-thicket-13861.herokuapp.com/oauth/orderTypes/`, {
                params: {
                    merchant_id: `${this.state.merchantId}`,
                    code: `${this.state.code}`
                }
            })
            .then(response => {
                var orderTypes = JSON.parse(response.data);
                self.setState({ orderTypes: orderTypes });
                console.log("orderTypes: " + JSON.stringify(orderTypes));
                var typeColors = {};
                i = 0;
                for (let value of Object.keys(orderTypes)) {
                    typeColors[value] = this.state.colors[i];
                    i += 1;
                }
                self.setState({ typeColors: typeColors });
                console.log("typeColors: " + JSON.stringify(typeColors));
                self.setState({ loggedIn: !this.state.loggedIn });
            })
            .catch(function (err) {
                console.log("error: ", err);
            });
    }

    loggedInToggle() {

        this.setState({ loggedIn: !this.state.loggedIn })
    }



    startWebsocket = () => (this.setupWebSocket())

    render() {
        console.log('root rendered')
        return (
            <View style={{ height: '100%', }}>
                {this.state.loggedIn ? (

                    <Header
                        menuToggle={this.menuToggle}
                        refresh={this.checkOrders}
                        loading={this.state.loggedIn}
                    />
                ) : null}


                {this.state.menu ? (
                    <Menu
                        menuToggle={this.menuToggle}
                        width={this.state.width}
                        merchantId={this.state.merchantId}
                        code={this.state.code}
                        loggedInToggle={this.loggedInToggle}
                    />) : null}
                {this.state.loading ? <Loading></Loading> : null}
                {!this.state.loggedIn ? (
                    <View style={{ height: "100%" }}>
                        <Login loggedInToggle={(this.loggedInToggle, this.startWebsocket)} />
                    </View>
                ) : (
                        null
                    )}
                {this.state.showTickets ? (
                    <LinearGradient
                        start={[1, 1]}
                        colors={["#edf4ff", "#edf7ff"]}
                        style={{ paddingTop: 4, paddingBottom: navbarHeight }}
                    >
                        <Tickets
                            width={this.state.width}
                            display8={this.state.display8}
                        />

                        <Footer message={this.state.message} note={this.state.note} />



                    </LinearGradient>
                ) : (null)}
            </View>

        );
    }
}

const mapStateToProps = state => ({
    tickets: state.tickets,
    account: state.account
})

function mapDispatchToProps(dispatch, ownProps) {
    return ({
        ADD_NEW: (ticket) => dispatch({ type: ADD_NEW, data: ticket }),
        UPDATE: (ticket) => dispatch({ type: UPDATE, data: ticket })
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)





const Colors = [
    ["#4c85ba", "#346199"],
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
