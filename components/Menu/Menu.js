import React from "react";
import styled from "styled-components";
import {
  Animated,
  Image,
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
  ScrollView
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../Header";
import Settings from "./Settings/Settings";
import MyAccount from "./MyAccount/MyAccount";
import Orders from "./Orders/Orders";
import Dashboard from "./Dashboard/Dashboard";
import axios from "axios";
import { connect } from 'react-redux'
import { GET_DASHBOARD } from '../../actions/dashboard'
import { LOG_OUT } from '../../actions/settings'

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuPos: new Animated.Value(0),
      switchOn: false,
      selectedPage: 0,
      selectedCategory: 0,
      selectedItem: 'none',
      pages: parseInt(this.props.tickets.completed.length / 9) + 1,
      merchantId: this.props.account.merchantId,
      code: this.props.account.code,
      data: {
        sales: {
          previous: 0,
          total: 0,
          weekly: [0, 0, 0, 0, 0, 0]
        },
        orders: {
          previous: 0
          , total: 0
        },
        bump: {
          previous: 0,
          total: 0
        },
        orders_per_hour: {
          labels: ['0'],
          data: [0]
        },
        category_sales: {
          categories: ['none'],
          series: [0]
        }
      },
      sales: 2423.24,
      averageWait: '5m 3s'
    };
    this.menuToggle = this.props.menuToggle.bind(this);
    this.selectPage = this.selectPage.bind(this);
    this.pageSelect = this.pageSelect.bind(this);
    this.animatedValue = new Animated.Value(-100)


    this.MenuAnimate = this.MenuAnimate.bind(this)
    this.MenuAnimate()
    this.checkCompleted = this.checkCompleted.bind(this)
    this.undo = this.undo.bind(this)
    this.props.GET_DASHBOARD(this.props.account.merchantId, this.props.account.code)
    this.log = this.log.bind(this)
  }

  checkCompleted() {
    this.setState({
      selectedItem: 'none'
    })


  }


  saveBumpDelay() {

    var self = this;
    axios
      .get(`https://rocky-thicket-13861.herokuapp.com/api/saveBumpDelay/`, {
        params: {
          merchant_id: this.props.account.merchantId,
          code: this.props.account.code,
          completed: JSON.stringify(this.props.tickets.completed.slice(0, 50))
        }
      }).catch(function (err) {
        console.log("error: ", err);
      });
  }






  setSelected = async () => {
    try {
      await AsyncStorage.setItem(
        "settings",
        JSON.stringify({
          ticketDisplay: 0,
          displayOptions: 0,
          colorScheme: 0,
          typeColors: {
            "To-Go": 0,
            "Dine-In": 2,
            Delivery: 3,
            "Take-Out": 4
          },
          fontSizes: 1
        })
      ).then(this.getSelected());
    } catch (error) {
      console.log(error);
    }
  };


  switchToggle() {
    this.setState({ switchOn: !this.state.switchOn });
  }

  selectCategory(id) {
    this.setState({ selectedCategory: id });
  }


  selectPage(id) {
    this.setState({ selectedPage: id });
    console.log(id);
  }

  MenuAnimate() {
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 2000
    }).start()
  }

  undo = (id) => this.props.undoSettings(id)
  log = () => (this.props.LOG_OUT(), this.props.menuToggle(), this.props.loggedInToggle())



  pageSelect() {
    if (this.state.selectedCategory === 0) {



      return (

        <Dashboard
          width={this.props.width}
          typeColors={typeColors}
          employees={employees}
          orderTypes={orderTypes}
          selectItem={this.selectItem}
          selectedItem={this.state.selectedItem}
          pages={this.state.pages}
          selectPage={this.selectPage}
          selectedPage={this.state.selectedPage}
          sales={this.state.sales}
          averageWait={this.state.averageWait}
        />
      );



    } else if (this.state.selectedCategory === 1) {
      return (
        <Orders
          width={this.props.width}
          typeColors={this.props.typeColors}
          employees={employees}
          orderTypes={this.props.orderTypes}
          selectItem={this.selectItem}
          selectedItem={this.state.selectedItem}
          pages={this.state.pages}
          selectPage={this.selectPage}
          selectedPage={this.state.selectedPage}
          undoSettings={this.undo}
          checkCompleted={this.checkCompleted}
        />
      );
    } else if (this.state.selectedCategory === 2) {
      return <Settings />;
    } else if (this.state.selectedCategory === 3) {
      return <MyAccount />
    }
  }

  componentDidMount() {
    Animated.timing(this.animatedValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true
    }).start();
  }

  render() {
    const translate_Animation_Object = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 0.75],
      outputRange: [0, 0.5, 1]
    });

    console.log('Menu rerender')

    return (
      <LinearGradient
        colors={["#edf4ff", "#edf4ff"]}
        style={{
          width: "100%",
          height: "100%"
        }}
      >
        <View style={{ flexDirection: 'row', height: '100%' }}>
          <Animated.View
            style={{
              width: "8.5%",
              height: '100%',
              transform: [{ translateX: translate_Animation_Object }],
              //backgroundColor: "#8097b0",
              backgroundColor: "#edf4ff",
              position: "relative"
            }}
          >
            <ContainerRow>
              <Sidebar>
                <View
                  style={{
                    height: "10%",
                    borderBottomWidth: 0.75,
                    borderColor: "#93a9bd",
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Text style={{ color: 'white' }}></Text>
                  <CategoryIcon source={require('../../icons/back(white).png')}></CategoryIcon>
                </View>
                <View
                  style={{
                    height: "2%"
                  }}
                ></View>
                {tabs.map((tab, i) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => this.selectCategory(i)}
                    style={{ height: "12%" }}
                  >
                    {this.state.selectedCategory === i ? (
                      <View
                        style={{
                          width: "100%",
                          height: "100%",
                          alignItems: "center",
                          justifyContent: "center",
                          alignContent: "center"
                        }}
                      >
                        <View
                          style={{
                            alignContent: "center",
                            alignItems: "center",
                            alignSelf: "center",
                            justifyContent: "center",
                            height: "90%",
                            width: "80%",
                            backgroundColor: "#edf4ff",
                            borderRadius: 8
                          }}
                        >
                          <CategoryIcon source={tab.icon}></CategoryIcon>
                          <View style={{ paddingTop: "5%" }}>
                            <Text>{tab.label}</Text>
                          </View>
                        </View>

                        {tab.lines.map((setting, i) => (
                          <SettingsLine key={i}>
                            <SettingsText>{setting}</SettingsText>
                          </SettingsLine>
                        ))}
                      </View>
                    ) : (
                        <View
                          style={{
                            width: "100%",
                            height: "100%",
                            alignItems: "center",
                            justifyContent: "center",
                            alignContent: "center"
                          }}
                        >
                          <View
                            style={{
                              alignContent: "center",
                              alignItems: "center",
                              height: "100%",
                              width: "100%",
                              justifyContent: "center",
                              alignSelf: "center"
                            }}
                          >
                            <CategoryIcon source={tab.iconGrey}></CategoryIcon>
                            <View style={{ paddingTop: "5%" }}>
                              <Text style={{ color: "#B6BAC9" }}>{tab.label}</Text>
                            </View>
                          </View>
                          {tab.lines.map((setting, i) => (
                            <SettingsLine key={i}>
                              <SettingsText>{setting}#B6BAC9</SettingsText>
                            </SettingsLine>
                          ))}
                        </View>
                      )}

                  </TouchableOpacity>

                ))}

                <View style={{ height: '22%' }} />
                <View
                  style={{
                    alignSelf: 'flex-end',
                    alignContent: "center",
                    alignItems: "center",
                    width: "100%",
                    justifyContent: "center",
                    paddingTop: '20%',

                  }}
                >
                  <View
                    style={{
                      height: '37%',
                      width: '80%',
                      borderRadius: 8,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      borderColor: 'white',
                      borderWidth: 1,

                    }}>
                    <TouchableOpacity onPress={this.log}>
                      <View style={{ justifyContent: 'center' }}>
                        <Text style={{ color: "white", textAlign: 'center', fontWeight: 'bold' }}>LOGOUT</Text>
                      </View>
                    </TouchableOpacity>

                  </View>
                </View>
              </Sidebar></ContainerRow>

          </Animated.View>
          <View style={{ width: '91.5%' }}>
            {this.pageSelect()}
          </View>

        </View>


      </LinearGradient >
    );
  }
}
function mapStateToProps(state) {
  return {
    account: state.account,
    tickets: state.tickets,
    dashboard: state.dashboard
  }
}


function mapDispatchToProps(dispatch, ownProps) {
  return ({
    GET_DASHBOARD: (merchantId, code) => dispatch(GET_DASHBOARD(merchantId, code)),
    LOG_OUT: () => dispatch(LOG_OUT())
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);






const orderTypes = { P3TPJPZ0Z21B6: "Togo", "6Z7C2VFZT3ZX2": "Dine-in" };

const typeColors = {
  Togo: ["#4c85ba", "#346199"],
  "Dine-in": ["#4c85ba", "#346199"]
};

const employees = {
  NB0BPBVDEQBKW: "fa",
  EB7B48VASRTAY: "aaron",
  "8SM7XJ48XD70M": "Aaron Okura"
};

const SettingsContainer = styled.View`
  flex-direction: row;
  width: 100%;
  height: 10%;
  background-color: #edf4ff;
  border-bottom-width: 0.25px;
  padding: 12px;
  elevation: 1;
  align-items: center;
`;

const ContainerRow = styled.View`
  flex-direction: row;
  height: 100%
`;

const Container = styled.View`
  flex-direction: row;
  height: 6%;
  background-color: white;
  border-bottom-width: 0.35;
`;

const Sidebar = styled.View`
  width: 100%;
  height: 100%;
  border-color: grey;
  background-color: #24354a;
  padding-right: 1%;
  padding-left: 1%;
`;

const CategoryIcon = styled.Image`
  height: 22px;
  width: 22px;
  align-self: center;
`;

const CategoryText = styled.Text`
  width: 100%;
  font-size: 16px;
  padding: 16px;
  text-align: right;
  color: white;
`;

const SettingsLine = styled.View`
  flex-direction: row;
  padding: 12px;
  background-color: white;
`;

const SettingsText = styled.Text``;

const HeaderText = styled.Text``;

const tabs = [
  {
    icon: require("../../icons/dashboard.png"),
    iconGrey: require("../../icons/dashboard(grey).png"),
    label: "Dashboard",
    lines: []
  },
  {
    icon: require("../../icons/ticket.png"),
    iconGrey: require("../../icons/ticket(grey).png"),
    label: "Orders",
    lines: []
  },
  {
    icon: require("../../icons/gear.png"),
    iconGrey: require("../../icons/gear(grey).png"),
    label: "Settings",
    lines: []
  },


];
