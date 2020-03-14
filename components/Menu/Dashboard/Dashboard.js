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

const Dashboard = props => (
  <SettingsContainer>
    <View style={{ padding: "2%", height: "8%", justifyContent: "center" }}>
      <SettingsCard style={{}}>
        <Text>Dashboard</Text>
      </SettingsCard>
    </View>

    <View style={{ flexDirection: "row", padding: "2%", height: "92%" }}>
      <SettingsCard style={{ height: "50%", width: "60%" }}>
        <View>
          <Text>Tickets per Hour</Text>
        </View>
      </SettingsCard>
      <View style={{ width: "40%", paddingLeft: "2%", height: "50%" }}>
        <SettingsCard style={{ height: "50%", width: "100%" }}>
          <View>
            <Text>Today's Sales</Text>
          </View>
        </SettingsCard>
        <View style={{ paddingTop: "4%", height: "50%" }}>
          <SettingsCard style={{ height: "100%", width: "100%" }}>
            <View>
              <Text>Average Wait</Text>
            </View>
          </SettingsCard>
        </View>
      </View>
    </View>
  </SettingsContainer>
);

export default Dashboard;

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

const TableText = styled.Text``;

const orders = [
  {
    id: "1",
    createdTime: 1574561334000,
    orderType: "6Z7C2VFZT3ZX2",
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
    id: "3",
    createdTime: 1574561334000,
    orderType: "6Z7C2VFZT3ZX2",
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
          }
        ]
      }
    ]
  },
  {
    id: "2",
    createdTime: 1574561334000,
    orderType: "6Z7C2VFZT3ZX2",
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
          }
        ]
      }
    ]
  },
  {
    id: "2",
    createdTime: 1574561334000,
    orderType: "6Z7C2VFZT3ZX2",
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
          }
        ]
      }
    ]
  },
  {
    id: "2",
    createdTime: 1574561334000,
    orderType: "6Z7C2VFZT3ZX2",
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
          }
        ]
      }
    ]
  },
  {
    id: "2",
    createdTime: 1574561334000,
    orderType: "6Z7C2VFZT3ZX2",
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
          }
        ]
      }
    ]
  },
  {
    id: "2",
    createdTime: 1574561334000,
    orderType: "6Z7C2VFZT3ZX2",
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
          }
        ]
      }
    ]
  },
  {
    id: "2",
    createdTime: 1574561334000,
    orderType: "6Z7C2VFZT3ZX2",
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
          }
        ]
      }
    ]
  }
];
