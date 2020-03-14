import React from "react";
import styled from "styled-components";
import {
  Animated,
  Image,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const OrderTypeColors = props => (
  <View>
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        padding: 12,
        borderBottomWidth: 0.35
      }}
    >
      <View style={{ paddingLeft: 24, width: "10%", justifyContent: "center" }}>
        <Text>Type</Text>
      </View>
      <View
        style={{
          width: "65%",
          borderColor: "grey",
          flexDirection: "row",
          paddingHorizontal: 12,
          justifyContent: "space-evenly"
        }}
      >
        <Text>Choose Color</Text>
      </View>
      <View
        style={{
          width: "25%",
          justifyContent: "space-evenly"
        }}
      >
        <Text style={{ textAlign: "center" }}>Preview</Text>
      </View>
    </View>

    <View style={{ paddingTop: 12 }}>
      {Object.keys(typeColors).map((type, i) => (
        <View
          key={i}
          style={{
            width: "100%",
            flexDirection: "row",
            padding: 12
          }}
        >
          <View style={{ paddingLeft: 24, width: "10%" }}>
            <Text>{type}</Text>
          </View>
          <View
            style={{
              width: "65%",
              borderColor: "grey",
              flexDirection: "row",
              paddingHorizontal: 12,
              justifyContent: "space-evenly"
            }}
          >
            {colors.map((color, i) => (
              <View key={i} style={{ paddingHorizontal: 12 }}>
                <View style={{ paddingBottom: 9 }}>
                  <LinearGradient
                    colors={color}
                    start={[1, 1]}
                    style={{
                      padding: 12,
                      borderTopLeftRadius: 4,
                      borderRadius: 4,
                      width: "100%"
                    }}
                  />
                </View>
                {selected.typeColors[type] === i ? (
                  <View
                    style={{
                      height: 20,
                      width: 20,
                      borderRadius: 75,
                      borderWidth: 0.35,
                      borderColor: "grey",
                      backgroundColor: "#e8ffe9",
                      padding: 12
                    }}
                  />
                ) : (
                  <View
                    style={{
                      height: 20,
                      width: 20,
                      borderRadius: 75,
                      borderWidth: 0.35,
                      borderColor: "grey",
                      backgroundColor: "white",
                      padding: 12
                    }}
                  />
                )}
              </View>
            ))}
          </View>
          <View
            style={{
              width: "25%",
              borderColor: "grey"
            }}
          >
            <LinearGradient
              colors={typeColors[type]}
              start={[1, 1]}
              style={{
                padding: 12,
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4,
                width: "100%"
              }}
            />
            <View
              style={{
                paddingHorizontal: 12,
                paddingVertical: 6,
                alignItems: "center",
                borderWidth: 0.35,
                borderColor: "grey",
                backgroundColor: "white"
              }}
            >
              <Text
                style={{
                  color: `${typeColors[type][1]}`,
                  fontWeight: "bold"
                }}
              >
                * {type} *
              </Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  </View>
);

export default OrderTypeColors;
