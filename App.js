import React from "react";
import {
  View,
  Dimensions,
  Image,
  Text,
  AsyncStorage,
  Animated,
  LayoutAnimation,
  setTimeout
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import axios from "axios";

import Login from "./components/Login";
import Header from "./components/Header";
import Tickets from "./components/Tickets";
import Footer from "./components/Footer";
import Menu from "./components/Menu/Menu";
import { exportDefaultSpecifier } from "@babel/types";
import Loading from "./components/Loading";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: Math.round(Dimensions.get("window").width / 4.05),
      height: Dimensions.get("window").height,
      loggedIn: false,
      loading: false,
      message: "",
      note: "",
      completed: [],
      menu: false,
      showTickets: true,
      display8: true,
      orders: order,
      merchantId: "QA6N92XP4MTQ1",
      token: "",
      employees: employees,
      typeColors: typeColors,
      colors: Colors,
      currentTime: "",
      ticketPos: new Animated.Value(900),
      totalIds: [],
      checkLimit: false
    };

    this.menuToggle = this.menuToggle.bind(this);
    this.refresh = this.refresh.bind(this);
    this.loggedInToggle = this.loggedInToggle.bind(this);
    this.undo = this.undo.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.checkOrders = this.checkOrders.bind(this);
    this.limit = this.limit.bind(this);
  }

  refresh() {
    this.setState({ loggedIn: !this.state.loggedIn }) && this.setupWebSocket();
  }
  // login wait 2 seconds after websocket show login string
  setupWebSocket() {
    websocket = new WebSocket(
      "wss://rocky-thicket-13861.herokuapp.com/ws/merchant/",
      "QA6N92XP4MTQ1"
    );

    websocket.onopen = evt => {
      this.onOpen();

      websocket.send(
        JSON.stringify({
          type: "receive",
          merchantId: this.state.merchantId,
          code: this.state.code,
          datafrom: "none"
        })
      );
      this.setState({ loggedIn: !this.state.loggedIn });
      this.setState({ showTickets: true });
      // while going show loading screen
    };

    websocket.onmessage = evt => {
      console.log("websocket received");
      var parsed = JSON.parse(evt.data);
      console.log(parsed);

      if (parsed["message"]["object_type"] == "E") {
        this.setState({ employees: parsed["message"]["employees"] });
      } else if (parsed["message"]["object_type"] == "O") {
        orderId = parsed["message"]["ticket"]["id"];
        if (this.state.totalIds.includes(orderId) == false) {
          this.setState({
            orders: [...this.state.orders, parsed["message"]["ticket"]],
            totalIds: [...this.state.totalIds, orderId]
          });
          sortedOrders = this.state.orders.sort(a => a.createdTime);
          this.setState({ orders: sortedOrders });
        }
      }
    };

    websocket.onclose = () => {
      this.state.message = "closed";
    };
  }

  onOpen(evt) {
    this.setState({ message: "Opened websocket" });
  }

  limit() {
    this.setState({ checkLimit: !this.state.checkLimit });
  }

  checkOrders(evt) {
    if (this.state.checkLimit === false) {
      console.log("checked");
      var pastHour = Math.round((Date.now() - 3600000) / 1000);
      var totalOrders = this.state.orders.concat(this.state.completed);
      var hourOrders = totalOrders.filter(
        h => h.createdTime / 1000 >= pastHour
      );
      var hourIds = hourOrders.map(o => o.id);
      websocket.send(
        JSON.stringify({
          type: "receive",
          merchantId: this.state.merchantId,
          code: this.state.code,
          token: this.state.token,
          datafrom: "check",
          hourOrders: hourIds
        })
      );
    } else {
      return;
    }
    this.setState({ checkLimit: !this.state.checkLimit });
    setTimeout(this.setState({ checkLimit: !this.state.checkLimit }), 1000);
  }

  onMessage(evt) {}

  doneButton(id) {
    var ind = this.state.orders.findIndex(order => order.id === id);

    var ticketDone = this.state.orders[ind];

    var newOrders = this.state.orders;
    newOrders.splice(
      newOrders.findIndex(item => item.id === id),
      1
    );

    this.setState(
      {
        orders: newOrders
      },
      () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      }
    );

    this.setState({
      completed: [ticketDone, ...this.state.completed]
    });
  }

  undo() {
    if (this.state.completed.length > 0) {
      var ticket = this.state.completed[0];
      var newOrders = [...this.state.orders, ticket];

      var newCompleted = this.state.completed
        .splice(0, 1)
        .concat(this.state.completed.slice(1, this.state.completed.length));

      var newOrder = newOrders.sort((a, b) =>
        parseInt(a.orderNumber) > parseInt(b.orderNumber) ? 1 : -1
      );

      this.setState({ orders: newOrder });
    }
  }

  clearAll() {
    var newCompleted = [...this.state.completed, ...this.state.orders];
    this.setState({ completed: newCompleted, orders: [] });
  }

  menuToggle() {
    var ticketToggle = !this.state.showTickets;
    this.setState({ showTickets: ticketToggle });
    var toggle = !this.state.menu;
    this.setState({ menu: toggle });
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
      .catch(function(err) {
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
      .catch(function(err) {
        console.log("error: ", err);
      });
  }

  addItems() {
    for (var i = 0; i < this.state.orders.length; i++) {
      var order = `order${this.state.orders[i].id}`;
      this.setState({ [order]: true });
    }
  }

  doneTicket(orderId) {
    var order = `order${orderId}`;
    this.setState({ [order]: false });
    this.doneButton(orderId);
  }

  loggedInToggle() {
    this.getStorage("code") &&
      this.getStorage("merchantId") &&
      this.setupWebSocket() &&
      this.setState({ loading: !this.state.loading }) &&
      this.setState({ showTickets: !this.state.showTickets });
  }

  render() {
    return (
      <View style={{ height: "100%" }}>
        <Header
          menuToggle={this.menuToggle}
          refresh={this.checkOrders}
          loading={this.state.loggedIn}
        />

        {this.state.menu && (
          <Menu
            menuToggle={this.menuToggle}
            done={this.doneButton}
            width={this.state.width}
            typeColors={this.state.typeColors}
            employees={this.state.employees}
            orderTypes={this.state.orderTypes}
          />
        )}
        {this.state.loading ? <Loading></Loading> : <View />}
        {!this.state.loggedIn ? (
          <View style={{ height: "100%" }}>
            <Login loggedInToggle={this.loggedInToggle} />
          </View>
        ) : (
          <View />
        )}
        {this.state.showTickets ? (
          <LinearGradient
            start={[1, 1]}
            colors={["#edf4ff", "#edf7ff"]}
            style={{ height: "90%", paddingTop: 4 }}
          >
            <Tickets
              width={this.state.width}
              doneButton={e => this.doneButton(e)}
              display8={this.state.display8}
              employees={this.state.employees}
              typeColors={this.state.typeColors}
              orders={this.state.orders}
            />
            <Text>
              {this.state.message} - {this.state.note}
            </Text>
            <Footer undo={this.undo} clearAll={this.clearAll} />
          </LinearGradient>
        ) : (
          <View />
        )}
      </View>
    );
  }
}

const typeColors = {
  Togo: ["#4c85ba", "#346199"],
  "Dine-in": ["#4c85ba", "#346199"]
};

const employees = {
  NB0BPBVDEQBKW: "fa",
  EB7B48VASRTAY: "aaron",
  "8SM7XJ48XD70M": "Aaron Okura"
};

order = [
  {
    id: "1",
    createdTime: 1574561334000,
    time: "10:00am",
    orderType: "Dine-in",
    employee: "Aaron",
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
    id: "2",
    createdTime: 1574561334000,
    time: "10:00am",
    orderType: "Dine-in",
    employee: "Aaron",
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
    time: "10:00am",
    orderType: "Dine-in",
    employee: "Aaron",
    orderNumber: "3",
    lineItems: [
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
    id: "4",
    createdTime: 1574561334000,
    time: "10:00am",
    orderType: "Dine-in",
    employee: "Aaron",
    orderNumber: "4",
    lineItems: [
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
    id: "5",
    createdTime: 1574561334000,
    time: "10:00am",
    orderType: "Dine-in",
    employee: "Aaron",
    orderNumber: "20",
    lineItems: [
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
    id: "6",
    createdTime: 1574561334000,
    time: "10:00am",
    orderType: "Dine-in",
    employee: "Aaron",
    orderNumber: "32",
    lineItems: [
      {
        qty: 1,
        item: "MINI",
        note: "no onions",
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
  }
];

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
