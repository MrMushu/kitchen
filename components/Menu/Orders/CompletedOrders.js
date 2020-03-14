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

const CompletedOrders = props => (
  <View style={{ height: "100%" }}>
    <View style={{ padding: "2%", height: "8%", justifyContent: "center" }}>
      <SettingsCard style={{}}>
        <Text>Orders</Text>
      </SettingsCard>
    </View>

    <View
      style={{
        flexDirection: "row",
        height: "100%",
        width: "100%",
        borderBottomWidth: 0.25
      }}
    >
      <View style={{ flexDirection: "column", width: "65%", padding: "2%" }}>
        <SettingsCard>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 12,
              paddingHorizontal: 24,
              alignItems: "center"
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignSelf: "flex-end"
              }}
            >
              <View>
                <TableText style={{ borderBottomWidth: 1 }}>Today</TableText>
              </View>
              <View style={{}}></View>
            </View>
          </View>

          <View style={{ paddingHorizontal: 12, paddingVertical: 4 }}>
            <View style={{ flexDirection: "row" }}></View>
            <View></View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "100%", paddingHorizontal: 18 }}>
              <Categories
                style={{
                  width: "100%",
                  flexDirection: "row",
                  paddingHorizontal: 24,
                  borderColor: "grey",
                  borderBottomWidth: 0.5
                }}
              >
                <Time>
                  <CategoryText>Time</CategoryText>
                </Time>
                <OrderNumber>
                  <CategoryText>Order #</CategoryText>
                </OrderNumber>
                <OrderType>
                  <CategoryText>Order Type</CategoryText>
                </OrderType>
                <LineItems>
                  <CategoryText>Line-Items</CategoryText>
                </LineItems>
              </Categories>
              <View style={{ paddingTop: 3 }}>
                {orders
                  .slice(props.selectedPage * 9, props.selectedPage * 9 + 9)
                  .map((order, i) => (
                    <View key={i} style={{ paddingVertical: 2 }}>
                      <TouchableOpacity
                        onPress={() => props.selectItem(order.id)}
                      >
                        {props.selectedItem.id === order.id ? (
                          <TableRow style={{ backgroundColor: "#ffde7d" }}>
                            <Time>
                              <TableText>{order.createdTime}</TableText>
                            </Time>
                            <OrderNumber>
                              <TableText>{order.orderNumber}</TableText>
                            </OrderNumber>
                            <OrderType>
                              <TableText>{order.orderType}</TableText>
                            </OrderType>
                            <LineItems>
                              {order.lineItems.map((lineItem, i) => (
                                <TableText key={i}>{lineItem.item}, </TableText>
                              ))}
                            </LineItems>
                            <View>
                              <Text
                                style={{
                                  textAlign: "center",
                                  paddingRight: 12
                                }}
                              >
                                >
                              </Text>
                            </View>
                          </TableRow>
                        ) : (
                          <TableRow>
                            <Time>
                              <TableText>{order.createdTime}</TableText>
                            </Time>
                            <OrderNumber>
                              <TableText>{order.orderNumber}</TableText>
                            </OrderNumber>
                            <OrderType>
                              <TableText>{order.orderType}</TableText>
                            </OrderType>
                            <LineItems>
                              {order.lineItems.map((lineItem, i) => (
                                <TableText key={i}>{lineItem.item}, </TableText>
                              ))}
                            </LineItems>
                            <View>
                              <Text style={{ textAlign: "right" }}></Text>
                            </View>
                          </TableRow>
                        )}
                      </TouchableOpacity>
                    </View>
                  ))}
              </View>
              <View
                style={{
                  paddingTop: 8,
                  alignSelf: "flex-end",
                  flexDirection: "row"
                }}
              >
                {orders
                  .slice(props.selectedPage, props.pages)
                  .map((page, i) => (
                    <View key={i} style={{ paddingLeft: 8 }}>
                      <TouchableOpacity onPress={() => props.selectPage(i)}>
                        <SettingsCard
                          style={{
                            width: 35,
                            height: 35,
                            justifyContent: "center",
                            backgroundColor: "#fffff7"
                          }}
                        >
                          <TableText style={{ textAlign: "center" }}>
                            {i + 1}
                          </TableText>
                        </SettingsCard>
                      </TouchableOpacity>
                    </View>
                  ))}
              </View>
            </View>
          </View>
        </SettingsCard>
      </View>

      <View
        style={{
          width: "35%",
          height: "99.9%",
          alignItems: "center",
          borderLeftWidth: 0,
          borderColor: "grey",
          flexDirection: "column",
          paddingVertical: 12,
          paddingRight: 12
        }}
      >
        <View
          style={{
            alignSelf: "flex-start",
            width: "100%",
            paddingVertical: 12
          }}
        >
          <SettingsCard
            style={{
              alignItems: "center",
              height: "85%",
              backgroundColor: "#fffff7"
            }}
          >
            <View
              style={{
                paddingHorizontal: 18,
                paddingVertical: 12,
                alignSelf: "flex-start"
              }}
            >
              <Text style={{ textAlign: "center", fontSize: 16 }}>
                Selected Ticket
              </Text>
              <Text
                style={{ textAlign: "center", fontSize: 14, color: "grey" }}
              >
                Press UNDO to return it to the kitchen display
              </Text>
            </View>
            <AnimatedTicket
              orderId={props.selectedItem.id}
              item={props.selectedItem}
              done={id => props.doneButton(id)}
              width={props.width}
              height="68%"
              typeColors={props.typeColors}
              employees={props.employees}
              orderTypes={props.orderTypes}
              buttonIcon={require("../../../icons/undo.png")}
              buttonLabel="UNDO"
            />
            <View style={{ alignSelf: "flex-start", padding: 24 }}>
              <View>
                <TableText style={{ textAlign: "left", fontSize: 14 }}>
                  Order ID: {props.selectedItem.id}
                </TableText>
                <TableText style={{ textAlign: "left", fontSize: 14 }}>
                  Server: {props.selectedItem.id}
                </TableText>
                <TableText style={{ textAlign: "left", fontSize: 14 }}>
                  Sales: {props.selectedItem.id}
                </TableText>
              </View>

              <Text
                style={{ textAlign: "left", fontSize: 14, color: "grey" }}
              ></Text>
            </View>
          </SettingsCard>
        </View>
      </View>
    </View>
    <View style={{ flexDirection: "row" }}>
      <View
        style={{ padding: 24, paddingVertical: 12, alignSelf: "flex-start" }}
      >
        <Text style={{ textAlign: "left", fontSize: 16 }}>Order Info</Text>
        <Text style={{ textAlign: "left", fontSize: 14, color: "grey" }}>
          Press UNDO to return it to the kitchen display
        </Text>
      </View>
      <View
        style={{
          flexDirection: "column",
          alignSelf: "flex-start",
          padding: 24,
          borderColor: "grey"
        }}
      >
        <Text style={{ textAlign: "left" }}>
          Time: {props.selectedItem.createdTime}
        </Text>
        <Text style={{ textAlign: "left" }}>
          Order #: {props.selectedItem.orderNumber}
        </Text>
        <Text style={{ textAlign: "left" }}>
          Server: {props.selectedItem.employee}
        </Text>
      </View>
    </View>
  </View>
);

export default CompletedOrders;

const SettingsContainer = styled.View`
  background-color: #fffff7;
  border-radius: 6px;
  elevation: 4;
`;

const SettingsCard = styled.View`
  background: white;
  padding: 12px;
  border-radius: 6px;
  elevation: 3;
  box-shadow: 0 5px 0 rgba(0, 0, 0, 0.8);
`;

const Categories = styled.View`
  background: #399c7d;
  padding: 16px;
  border-radius: 2px;
  elevation: 3;
  flex-direction: row;
`;

const TableRow = styled.View`
  background: white;
  padding: 16px;
  border-radius: 2px;
  elevation: 3;
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
  width: 33%;
  flex-direction: row;
`;

const TableText = styled.Text`
  color: darkslategrey;
  font-size: 12;
`;

const CategoryText = styled.Text`
  font-weight: 800;
  color: white;
  elevation: 3;
`;

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
