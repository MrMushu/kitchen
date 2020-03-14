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

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      switchOn: false,
      selectedPage: 0,
      selectedCategory: 0,
      selectedItem: orders[0],
      pages: parseInt(orders.length / 9) + 1
    };
    this.menuToggle = this.props.menuToggle.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.selectPage = this.selectPage.bind(this);
    this.pageSelect = this.pageSelect.bind(this);
    this.setSelected();
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

  getSelected = async () => {
    try {
      var selectedSettings = await AsyncStorage.getItem("settings");
      if (selectedSettings == null) {
        console.log("nothing");
      } else {
        this.setState({ settings: JSON.parse(selectedSettings) });
        console.log(this.state.settings);
      }
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

  selectItem(id) {
    selected = orders.find(order => order.id === id);
    this.setState({ selectedItem: selected });
  }

  selectPage(id) {
    this.setState({ selectedPage: id });
    console.log(id);
  }

  pageSelect() {
    if (this.state.selectedCategory === 0) {
      return (
        <Dashboard
          done={id => this.props.doneButton(id)}
          width={this.props.width}
          typeColors={typeColors}
          employees={employees}
          orderTypes={orderTypes}
          selectItem={this.selectItem}
          selectedItem={this.state.selectedItem}
          pages={this.state.pages}
          selectPage={this.selectPage}
          selectedPage={this.state.selectedPage}
        />
      );
    } else if (this.state.selectedCategory === 1) {
      return (
        <Orders
          done={id => this.props.doneButton(id)}
          width={this.props.width}
          typeColors={typeColors}
          employees={employees}
          orderTypes={orderTypes}
          selectItem={this.selectItem}
          selectedItem={this.state.selectedItem}
          pages={this.state.pages}
          selectPage={this.selectPage}
          selectedPage={this.state.selectedPage}
        />
      );
    } else if (this.state.selectedCategory === 2) {
      return <Settings settings={this.state.settings} />;
    }
  }

  render() {
    return (
      <LinearGradient
        colors={["#edf4ff", "#edf4ff"]}
        style={{
          width: "100%",
          height: "100%"
        }}
      >
        <View
          style={{
            height: "22%",
            width: "100%",
            backgroundColor: "#8097b0",
            position: "absolute"
          }}
        ></View>
        <ContainerRow>
          <Sidebar>
            <View
              style={{
                height: "8%",
                borderBottomWidth: 0.75,
                borderColor: "#93a9bd"
              }}
            />
            <View
              style={{
                height: "2%"
              }}
            ></View>
            {tabs.map((tab, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => this.selectCategory(i)}
                style={{ height: "10%" }}
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
                        width: "100%",
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
          </Sidebar>

          <View width="91.5%">{this.pageSelect()}</View>
        </ContainerRow>
      </LinearGradient>
    );
  }
}

export default Menu;

const orderTypes = { P3TPJPZ0Z21B6: "Togo", "6Z7C2VFZT3ZX2": "Dine-in" };

const typeColors = {
  P3TPJPZ0Z21B6: ["#4c85ba", "#346199"],
  "6Z7C2VFZT3ZX2": ["#4c85ba", "#346199"]
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
`;

const Container = styled.View`
  flex-direction: row;
  height: 6%;
  background-color: white;
  border-bottom-width: 0.35;
`;

const Sidebar = styled.View`
  width: 8.5%;
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
  {
    icon: require("../../icons/question.png"),
    iconGrey: require("../../icons/question(grey).png"),
    label: "Help",
    lines: []
  },
  {
    icon: require("../../icons/logout.png"),
    iconGrey: require("../../icons/logout(grey).png"),
    label: "Logout",
    lines: []
  }
];
const orders = [
  {
    id: "1",
    createdTime: 1574561334000,
    time: "10:00am",
    orderType: "6Z7C2VFZT3ZX2",
    employee: "NB0BPBVDEQBKW",
    orderNumber: "1",
    lineItems: [
      {
        qty: 3,
        item: "MINI",
        mods: [
          {
            name: "Rice",
            amount: 0,
            qty: 2
          },
          {
            name: "Bean",
            amount: 0,
            qty: 1
          }
        ]
      },
      {
        qty: 1,
        item: "MINI",
        mods: [
          {
            name: "Rice",
            amount: 0,
            qty: 1
          },
          {
            name: "Bean",
            amount: 0,
            qty: 1
          }
        ]
      },
      {
        qty: 1,
        item: "MINI",
        mods: [
          {
            name: "Rice",
            amount: 0,
            qty: 1
          },
          {
            name: "Bean",
            amount: 0,
            qty: 1
          }
        ]
      },
      {
        qty: 1,
        item: "MINI",
        mods: [
          {
            name: "Rice",
            amount: 0,
            qty: 1
          },
          {
            name: "Bean",
            amount: 0,
            qty: 1
          }
        ]
      }
    ]
  },
  {
    id: "3",
    createdTime: 1574561334000,
    orderType: "6Z7C2VFZT3ZX2",
    employee: "NB0BPBVDEQBKW",
    orderNumber: "15",
    lineItems: [
      {
        qty: 1,
        item: "MINI",
        mods: [
          {
            name: "Rice",
            amount: 0,
            qty: 1
          }
        ]
      }
    ]
  },
  {
    id: "2",
    createdTime: 1574561334000,
    orderType: "6Z7C2VFZT3ZX2",
    employee: "NB0BPBVDEQBKW",
    orderNumber: "15",
    lineItems: [
      {
        qty: 1,
        item: "MINI",
        mods: [
          {
            name: "Rice",
            amount: 0,
            qty: 1
          }
        ]
      }
    ]
  },
  {
    id: "2",
    createdTime: 1574561334000,
    orderType: "6Z7C2VFZT3ZX2",
    employee: "NB0BPBVDEQBKW",
    orderNumber: "15",
    lineItems: [
      {
        qty: 1,
        item: "MINI",
        mods: [
          {
            name: "Rice",
            amount: 0,
            qty: 1
          }
        ]
      }
    ]
  },
  {
    id: "2",
    createdTime: 1574561334000,
    orderType: "6Z7C2VFZT3ZX2",
    employee: "NB0BPBVDEQBKW",
    orderNumber: "15",
    lineItems: [
      {
        qty: 1,
        item: "MINI",
        mods: [
          {
            name: "Rice",
            amount: 0,
            qty: 1
          }
        ]
      }
    ]
  },
  {
    id: "2",
    createdTime: 1574561334000,
    orderType: "6Z7C2VFZT3ZX2",
    employee: "NB0BPBVDEQBKW",
    orderNumber: "15",
    lineItems: [
      {
        qty: 1,
        item: "MINI",
        mods: [
          {
            name: "Rice",
            amount: 0,
            qty: 1
          }
        ]
      }
    ]
  },
  {
    id: "2",
    createdTime: 1574561334000,
    orderType: "6Z7C2VFZT3ZX2",
    employee: "NB0BPBVDEQBKW",
    orderNumber: "15",
    lineItems: [
      {
        qty: 1,
        item: "MINI",
        mods: [
          {
            name: "Rice",
            amount: 0,
            qty: 1
          }
        ]
      }
    ]
  },
  {
    id: "2",
    createdTime: 1574561334000,
    orderType: "6Z7C2VFZT3ZX2",
    employee: "NB0BPBVDEQBKW",
    orderNumber: "15",
    lineItems: [
      {
        qty: 1,
        item: "MINI",
        mods: [
          {
            name: "Rice",
            amount: 0,
            qty: 1
          }
        ]
      }
    ]
  }
];
