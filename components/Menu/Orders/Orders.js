import React from "react";
import styled from "styled-components";
import {
  Animated,
  Image,
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import SwitchToggle from "react-native-switch-toggle";
import Header from "../../Header";
import AnimatedTicket from "../../AnimatedTicket";
import CompletedOrders from "./CompletedOrders";

const Orders = props => (
  <SettingsContainer>
    <CompletedOrders
      done={props.doneButton}
      width={props.width}
      typeColors={props.typeColors}
      employees={props.employees}
      orderTypes={props.orderTypes}
      selectItem={props.selectItem}
      selectedItem={props.selectedItem}
      pages={props.pages}
      selectPage={props.selectPage}
      selectedPage={props.selectedPage}
    />
    <View style={{ flexDirection: "row", paddingHorizontal: 24 }}>
      <View style={{ paddingRight: 12 }}>
        <SettingsCard>
          <Text>Dashboard</Text>
        </SettingsCard>
      </View>
      <View>
        <SettingsCard>
          <Text>Completed Orders </Text>
        </SettingsCard>
      </View>
    </View>
  </SettingsContainer>
);

export default Orders;

const SettingsContainer = styled.View`
  width: 100%;
  height: 100%;
`;

const SettingsCard = styled.View`
  background: white;
  padding: 12px;
  border-radius: 6px;
  elevation: 4;
  box-shadow: 0 5px 0 rgba(0, 0, 0, 0.8);
`;

const CatIcon = styled.Image`
  align-self: center;
  height: 20px;
  width: 20px;
`;
const TableRow = styled.View`
  background: white;
  padding: 18px;
  border-radius: 6px;
  elevation: 2;
  box-shadow: 0 5px 0 rgba(0, 0, 0, 0.8);
  flex-direction: row;
`;

const Time = styled.View`
  width: 25%;
`;

const OrderNumber = styled.View`
  width: 15%;
`;

const OrderType = styled.View`
  width: 25%;
`;

const Server = styled.View`
  width: 20%;
`;

const LineItems = styled.View`
  width: 35%;
  flex-direction: row;
`;

const TableText = styled.Text``;

const orders = [
  {
    id: "1",
    createdTime: 1574561334000,
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
