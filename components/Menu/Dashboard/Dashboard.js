import React from "react";
import styled from "styled-components";
import {
  Animated,
  Image,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Button,
  Dimensions
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import SwitchToggle from "react-native-switch-toggle";
import Header from "../../Header";
import AnimatedTicket from "../../AnimatedTicket";
import {
  LineChart,
  BarChart,
} from 'react-native-chart-kit';
import PieChart from 'react-native-pie-chart';


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "column2d",
      width: "100%",
      height: "100%",
      todayButton: '#346199',
      lastButton: '#edf4ff',
      blue: '#24354a',
      darkgrey: '#858585',
      orange: ["#ffac38", "#ff880f"],
      lightBlue: ["#2cb5d4", "#0890c2"],
      lightGrey: ['#b8b8b8', '#b8b8b8'],
      data: {
        'sales': 2634.53,
        'orders_per_hour': 2,
        'total_orders': 42
      }
    }
    this.todayToggle = this.todayToggle.bind(this)
    this.lastToggle = this.lastToggle.bind(this)
    this.positiveGreenText = this.positiveGreenText.bind(this)
    this.getBumpRate = this.getBumpRate.bind(this)
    console.log('data' + Object.keys(this.props.data))
  }

  todayToggle() {
    if (this.state.todayButton === '#edf4ff') {
      console.log('today')
    }

    this.setState({ todayButton: '#346199', lastButton: '#edf4ff' })

  }

  lastToggle() {
    this.setState({ todayButton: '#edf4ff', lastButton: '#346199' })
  }

  getBumpRate() {
    var m = parseInt(this.props.data.bump.total / 60)
    var s = this.props.data.bump.total - (m * 60)
    console.log(m, s)
    return (m + 'm ' + s + 's')
  }

  positiveGreenText(value) {
    if (value > 0) {
      return 'green'
    } else {
      return 'red'
    }
  }

  render() {
    return (
      <SettingsContainer>
        <View style={{ flexDirection: 'row', paddingHorizontal: "3%", paddingTop: '2%', height: "10%", width: '100%', justifyContent: "space-between", alignItems: 'flex-end' }}>
          <View style={{ width: '80%' }}>
            <Text style={{ fontSize: 22 }}>Menu / Dashboard</Text>
            <WidgetHeader style={{ paddingTop: '0%' }} color='darkgrey'>Welcome to your dashboard!</WidgetHeader>
          </View>

          <View style={{ flexDirection: 'row', alignSelf: 'flex-end', width: '50%' }}>
            <DateRangeButton color={this.state.lastButton} border={this.state.todayButton} onPress={this.lastToggle} style={{ fontWeight: 'bold' }}>
              <Text style={{ color: this.state.todayButton, fontWeight: 'bold' }}>THIS WEEK</Text>
            </DateRangeButton>
            <DateRangeButton color={this.state.todayButton} border={this.state.lastButton} onPress={this.todayToggle}>
              <Text style={{ color: this.state.lastButton, fontWeight: 'bold' }}>TODAY</Text>
            </DateRangeButton>
          </View>
        </View>

        <View style={{ flexDirection: 'row', height: '20%', width: '100%', marginVertical: '2%', }}>
          <View style={{ paddingVertical: '2%', paddingLeft: '2%', paddingRight: '1%', width: '33%' }}>
            <SettingsCard style={{ flexDirection: 'row', height: "100%", width: "100%", }}>
              <View style={{ backgroundColor: '#346199', padding: '.75%', marginLeft: '-2.5%', marginBottom: '-.5%', marginTop: '-1.5%', borderBottomLeftRadius: 8, borderTopLeftRadius: 8 }}></View>

              <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '4%', paddingTop: '3%' }}>
                  <WidgetHeader color={this.state.darkgrey}>Today's Sales</WidgetHeader>

                </View>


                <View style={{
                  justifyContent: 'center', paddingLeft: '4%', paddingRight: '2%', paddingTop: '1%'
                }}>
                  <WidgetText color={this.state.blue} style={{ color: `${this.state.blue}` }}>${this.props.data.sales.total}</WidgetText>


                  <View style={{ flexDirection: 'row', paddingVertical: '1%' }}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold', paddingLeft: '0%', color: this.positiveGreenText(this.props.data.sales.previous) }}>+{this.props.data.sales.previous}% </Text>
                    <Text style={{ fontSize: 12, color: this.state.lightGrey[1] }}>Since yesterday</Text>
                  </View>
                  <View style={{
                    position: 'absolute',
                    left: '76%',
                    top: '-25%',
                    width: '10%',
                    height: '52%',
                    backgroundColor: 'white',
                    alignSelf: 'center',
                    borderRadius: 32,
                    justifyContent: 'center',
                    borderColor: '#24354a',
                    borderWidth: 2.5,
                    opacity: .2
                  }}>
                    <Image
                      style={{ alignSelf: "center", width: '65%', height: '65%' }}
                      source={require("../../../icons/dollar(blue).png")}
                    />
                  </View>
                </View>
                <View style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '-1%',
                  marginLeft: '-15%'
                }}>
                  <LineChart
                    data={{
                      labels: ["10am", "11am", "12pm", "1pm", "2pm", "3pm"],
                      datasets: [
                        {
                          data: [
                            4, 3, 7, 2, 4, 7
                          ],
                          strokeWidth: 5,

                        }
                      ]
                    }}
                    width={Dimensions.get("window").width / 2.8} // from react-native
                    height={Dimensions.get('window').height / 16}
                    withVerticalLabels={false}
                    withHorizontalLabels={false}
                    withInnerLines={false}
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{

                      backgroundColor: `transparent`,
                      backgroundGradientFrom: "#346199",
                      backgroundGradientFromOpacity: 0,
                      backgroundGradientTo: "white",
                      backgroundGradientToOpacity: 0,
                      fillShadowGradient: "#346199",
                      fillShadowGradientOpacity: .3,

                      color: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
                      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      style: {
                        borderRadius: 16,
                        opacity: 0,

                      },
                      propsForDots: {
                        r: "2",
                        strokeWidth: "2",
                        stroke: "#346199"
                      }
                    }}
                    bezier
                    style={{
                      borderRadius: 16
                    }}
                  />
                </View>

              </View>
            </SettingsCard>
          </View>

          <View style={{ paddingVertical: '2%', paddingHorizontal: '1%', width: '33%', height: "100%" }}>
            <SettingsCard style={{ flexDirection: 'row', height: "100%", width: "100%", }}>
              <View style={{ backgroundColor: this.state.orange[1], padding: '.75%', marginLeft: '-2.2%', marginBottom: '1%', marginTop: '-2%', borderBottomLeftRadius: 6, borderTopLeftRadius: 6 }}></View>

              <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '4%', paddingTop: '3%' }}>
                  <WidgetHeader color={this.state.darkgrey} >Total Orders</WidgetHeader>

                </View>


                <View style={{
                  justifyContent: 'center', paddingLeft: '4%', paddingRight: '2%', paddingTop: '1%'
                }}>
                  <WidgetText color={this.state.blue}>{this.props.data.orders.total}</WidgetText>
                  <View style={{ flexDirection: 'row', paddingVertical: '1%' }}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold', paddingLeft: '0%', color: this.positiveGreenText(this.props.data.orders.previous) }}>+{this.props.data.orders.previous}% </Text>
                    <Text style={{ fontSize: 12, color: this.state.lightGrey[1] }}>Since yesterday</Text>
                  </View>
                  <View style={{
                    position: 'absolute',
                    left: '76%',
                    top: '-25%',
                    width: '10%',
                    height: '52%',
                    backgroundColor: 'white',
                    alignSelf: 'center',
                    borderRadius: 32,
                    justifyContent: 'center',
                    borderColor: '#24354a',
                    borderWidth: 2,
                    opacity: .3
                  }}>
                    <Image
                      style={{ alignSelf: "center", width: '62%', height: '62%' }}
                      source={require("../../../icons/list(blue).png")}
                    />
                  </View>
                </View>
                <View style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '-0%',
                  marginLeft: '-10%'
                }}>
                  <LineChart
                    data={{
                      labels: ["10am", "11am", "12pm", "1pm", "2pm", "3pm"],
                      datasets: [
                        {
                          data: [
                            5, 2, 2, 7, 3, 4
                          ],
                          strokeWidth: 5,

                        }
                      ]
                    }}
                    width={Dimensions.get("window").width / 2.9} // from react-native
                    height={Dimensions.get('window').height / 15}
                    withVerticalLabels={false}
                    withHorizontalLabels={false}
                    withInnerLines={false}
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{

                      backgroundColor: `transparent`,
                      backgroundGradientFrom: this.state.orange[1],
                      backgroundGradientFromOpacity: 0,
                      backgroundGradientTo: "#55bd93",
                      backgroundGradientToOpacity: 0,
                      fillShadowGradient: this.state.orange[1],
                      fillShadowGradientOpacity: .3,

                      color: (opacity = 1) => `white`,
                      labelColor: (opacity = 1) => `${this.state.orange[1]}`,
                      style: {
                        borderRadius: 16,
                        opacity: 0,

                      },
                      propsForDots: {
                        r: "2",
                        strokeWidth: "2",
                        stroke: this.state.orange[1]
                      }
                    }}
                    bezier
                    style={{
                      borderRadius: 16
                    }}
                  />
                </View></View>
            </SettingsCard>
          </View>
          <View style={{ paddingVertical: '2%', paddingRight: '1%', paddingLeft: '1%', width: '33%', height: "100%" }}>
            <SettingsCard style={{ flexDirection: 'row', height: "100%", width: "100%", }}>
              <View style={{ backgroundColor: this.state.lightBlue[1], padding: '.75%', marginLeft: '-2.2%', marginBottom: '1%', marginTop: '-2%', borderBottomLeftRadius: 6, borderTopLeftRadius: 6 }}></View>

              <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '4%', paddingTop: '3%' }}>
                  <WidgetHeader color={this.state.darkgrey} >Order Bump Rate</WidgetHeader>

                </View>


                <View style={{
                  justifyContent: 'center', paddingLeft: '4%', paddingRight: '2%', paddingTop: '1%'
                }}>
                  <WidgetText color={this.state.blue}>{this.getBumpRate()}</WidgetText>
                  <View style={{ flexDirection: 'row', paddingVertical: '1%' }}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold', paddingLeft: '0%', color: this.positiveGreenText(4) }}>+{this.props.data.bump.previous}% </Text>
                    <Text style={{ fontSize: 12, color: this.state.lightGrey[1] }}>Since yesterday</Text>
                  </View>
                  <View style={{
                    position: 'absolute',
                    left: '76%',
                    top: '-25%',
                    width: '10%',
                    height: '52%',
                    backgroundColor: 'white',
                    alignSelf: 'center',
                    borderRadius: 32,
                    justifyContent: 'center',
                    borderColor: '#24354a',
                    borderWidth: 2,
                    opacity: .3
                  }}>
                    <Image
                      style={{ alignSelf: "center", width: '65%', height: '65%' }}
                      source={require("../../../icons/hourglass(darkBlue).png")}
                    />
                  </View>
                </View>
                <View style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '-0%',
                  marginLeft: '-10%'
                }}>
                  <LineChart
                    data={{
                      labels: ["10am", "11am", "12pm", "1pm", "2pm", "3pm"],
                      datasets: [
                        {
                          data: [
                            2, 2, 7, 9, 12, 3
                          ],
                          strokeWidth: 5,

                        }
                      ]
                    }}
                    width={Dimensions.get("window").width / 2.9} // from react-native
                    height={Dimensions.get('window').height / 15}
                    withVerticalLabels={false}
                    withHorizontalLabels={false}
                    withInnerLines={false}
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{

                      backgroundColor: this.state.lightBlue[1],
                      backgroundGradientFrom: this.state.lightBlue[1],
                      backgroundGradientFromOpacity: 0,
                      backgroundGradientTo: this.state.lightBlue[1],
                      backgroundGradientToOpacity: 0,
                      fillShadowGradient: this.state.lightBlue[1],
                      fillShadowGradientOpacity: .3,

                      color: (opacity = 1) => `white`,
                      labelColor: (opacity = 1) => `${this.state.lightBlue[1]}`,
                      style: {
                        borderRadius: 16,
                        opacity: 0,

                      },
                      propsForDots: {
                        r: "2",
                        strokeWidth: "2",
                        stroke: this.state.lightBlue[1]
                      }
                    }}
                    bezier
                    style={{
                      borderRadius: 16
                    }}
                  />
                </View></View>
            </SettingsCard>
          </View></View>

        <View style={{ flexDirection: "row", padding: "2%", paddingTop: '3%', height: "92%" }}>
          <View style={{ height: "50%", width: "60%", paddingRight: '1%' }}>
            <SettingsCard style={{ height: '100%', backgroundColor: 'white' }}>

              <View style={{ padding: '2%', flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                  <WidgetHeader color={this.state.darkgrey} >Orders per Hour</WidgetHeader>
                  <DescriptionText color={this.state.lightGrey[1]}>Average weekly orders</DescriptionText>
                </View>
                <Image
                  style={{ padding: '2%', width: '2%', height: '2%' }}
                  source={require("../../../icons/send.png")}
                />
              </View>
              <View style={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginRight: '4%', paddingVertical: '2%' }}>
                <BarChart
                  data={{
                    labels: ["10am", "11am", "12pm", "1pm", "2pm", "3pm", '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm'],
                    datasets: [
                      {
                        data: [
                          4, 3, 7, 12, 4, 2, 6, 12, 8, 5, 6, 3, 6
                        ]
                      }
                    ]
                  }}
                  width={Dimensions.get("window").width / 2.2} // from react-native
                  height={Dimensions.get('window').height / 3.2}

                  withInnerLines={false}
                  yAxisInterval={1} // optional, defaults to 1

                  chartConfig={{
                    fillShadowGradient: '#4747b5',
                    backgroundGradientFrom: 'white',
                    backgroundGradientTo: 'white',

                    color: (opacity = 1) => `rgba(71, 71, 181, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(71, 71, 181, ${opacity})`,
                    barPercentage: .9,
                    backgroundGradientFromOpacity: 0,
                    strokeWidth: 1,
                    style: {
                      borderRadius: 16,

                    },


                    propsForDots: {
                      r: "3",
                      strokeWidth: "5",
                      stroke: "#ffa726"
                    }
                  }}

                  style={{
                    borderRadius: 16
                  }}
                />
              </View>

            </SettingsCard>
          </View>
          <View style={{ width: "40%", paddingLeft: "2%", height: "100%" }}>

            <SettingsCard style={{ height: '50%', padding: '3%' }}>
              <View style={{ padding: '4%', paddingHorizontal: '4%', flexDirection: 'row', justifyContent: 'space-between' }}>
                <WidgetHeader color={this.state.darkgrey} >Category Sales</WidgetHeader>

              </View>
              <View style={{ alignItems: 'center', paddingVertical: '3%' }}>
                <PieChart
                  chart_wh={Dimensions.get('window').height / 4.5}
                  series={series}
                  sliceColor={sliceColor}
                  doughnut={true}
                />
              </View>
              <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', paddingVertical: '3%' }}>
                {series.map((category, i) => (
                  <View key={i} style={{ justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, fontWeight: '900' }}>{parseInt((category / total).toFixed(2) * 100)}%</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                      <View style={{ backgroundColor: sliceColor[i], width: Dimensions.get("window").width / 150, height: Dimensions.get("window").width / 150, borderRadius: 32, }} />
                      <Text style={{ paddingLeft: '1%', fontSize: 14, color: this.state.lightGrey[1], fontWeight: '900' }}>{categories[i]}</Text>
                    </View>

                  </View>
                ))}

              </View>
            </SettingsCard>
          </View>

        </View>
      </SettingsContainer >
    )
  }
}


export default Dashboard;
const series = [123, 321, 123, 789, 537]
const total = 1893
const sliceColor = ['#F44336', '#2196F3', '#FFEB3B', '#4CAF50', '#FF9800']
const categories = ['Meals', 'Entrees', 'Sides', 'Other', 'Party Paks']
const linedata = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      strokeWidth: 2, // optional
    },
  ],
};

const DateRangeButton = styled.TouchableOpacity`
  width: 20%;
  height: 2%;
  padding: 2%;
  background-color: ${props => props.color};
  border-color: ${props => props.border};
  border-width: .5;
  border-radius: 4;
  elevation: 0;
  align-items: center
`


const SettingsContainer = styled.View`
  width: 100%;
  height: 100%;
`;

const SettingsCard = styled.View`
  background: white;
  padding: 2%;
  border-radius: 6px;
  elevation: 4;
  box-shadow: 0 5px 0 rgba(0, 0, 0, 0.8);
`;

const TableText = styled.Text``;

const WidgetHeader = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: ${props => props.color};
  paddingTop: 1%
`;

const DescriptionText = styled.Text`
  font-size: 12px;
  font-weight: 900;
  color: ${props => props.color};

`;

const WidgetText = styled.Text`
  font-size: 32px;
  font-weight: 900;
  color: ${props => props.color};
  paddingTop: 0%
`;

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

const pieData = [
  {
    name: "Seoul",
    population: 21500000,
    color: "rgba(131, 167, 234, 1)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Toronto",
    population: 2800000,
    color: "#F00",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Beijing",
    population: 527612,
    color: "red",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "New York",
    population: 8538000,
    color: "#ffffff",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Moscow",
    population: 11920000,
    color: "rgb(0, 0, 255)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  }
];