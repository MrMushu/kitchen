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



import {
  LineChart,
  BarChart,
} from 'react-native-chart-kit';
import PieChart from 'react-native-pie-chart';
import { connect } from 'react-redux'
import { GET_DASHBOARD } from '../../../actions/dashboard'

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeValue: new Animated.Value(0),
      type: "column2d",
      height: "100%",
      todayButton: '#346199',
      lastButton: '#edf4ff',
      blue: '#24354a',
      darkgrey: '#858585',
      orange: ["#ffac38", "#ff880f"],
      lightBlue: ["#2cb5d4", "#0890c2"],
      lightGrey: ['#b8b8b8', '#b8b8b8'],

    }

    this.todayToggle = this.todayToggle.bind(this)
    this.lastToggle = this.lastToggle.bind(this)
    this.positiveGreenText = this.positiveGreenText.bind(this)
    this.getBumpRate = this.getBumpRate.bind(this)
    this.bounceUpAnimation = this.bounceUpAnimation.bind(this)
    this.getBumpDelay = this.getBumpDelay.bind(this)
    this.getBumpDelay()
    this.bounceUpAnimation()
  }

  getBumpDelay() {
    var month = new Date().getMonth() + 1
    var day = new Date().getDate()
    var year = new Date().getFullYear()
    var date_str = year + '/' + month + '/' + day
    var date = new Date(date_str).getTime() / 1000
    const finished = this.props.tickets.completed.filter(ticket => ticket.createdTime >= date)
    var bumpDelays = []
    for (var key in finished) {
      var obj = finished[key]
      bumpDelays.push(obj.bumpDelay)
    }
    console.log(bumpDelays)
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
    var m = parseInt(this.props.dashboard.data.bump.total / 60)
    var s = this.props.dashboard.data.bump.total - (m * 60)
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

  bounceUpAnimation() {
    Animated.timing(this.state.fadeValue, {
      toValue: 1,
      duration: 1200
    }).start()
  }



  render() {
    return (
      <SettingsContainer>
        <View style={{ flexDirection: 'row', paddingLeft: "4%", paddingRight: '2%', paddingTop: '2%', width: '100%', justifyContent: "space-between", alignItems: 'flex-end' }}>
          <View style={{ width: '50%' }}>


            <Text style={{ fontSize: 22 }}>Dashboard</Text>
            <WidgetHeader style={{ paddingTop: '0%' }} color='darkgrey'>Welcome to your dashboard!</WidgetHeader>


          </View>

          <View style={{ flexDirection: 'row', alignSelf: 'flex-end', width: '50%', justifyContent: 'flex-end', }}>
            <DateRangeButton color={this.state.lastButton} border={this.state.todayButton} onPress={this.lastToggle} style={{ fontWeight: 'bold' }}>
              <Text style={{ color: this.state.todayButton, fontWeight: 'bold' }}>Todays date is April 13</Text>
            </DateRangeButton>
            <DateRangeButton color={this.state.todayButton} border={this.state.lastButton} onPress={this.todayToggle}>
              <Text style={{ color: this.state.lastButton, fontWeight: 'bold' }}>TODAY</Text>
            </DateRangeButton>
          </View>
        </View>

        <View style={{ flexDirection: 'row', height: '20%', width: '100%', marginVertical: '2%', }}>
          <View style={{ paddingVertical: '2%', paddingLeft: '2%', paddingRight: '1%', width: '33%' }}>
            <SettingsCard style={{ flexDirection: 'row', height: "100%", width: "100%", }}>
              <View style={{ backgroundColor: '#346199', padding: '1%', marginLeft: '-2.5%', marginBottom: '-.5%', marginTop: '-1.5%', borderBottomLeftRadius: 8, borderTopLeftRadius: 8 }}></View>

              <View style={{ height: '100%' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '4%', paddingVertical: '2%', height: '25%' }}>
                  <WidgetHeader color={this.state.darkgrey}>Today's Sales</WidgetHeader>

                </View>


                <View style={{
                  justifyContent: 'center', paddingLeft: '4%', paddingRight: '2%', height: '37%'
                }}>
                  <WidgetText color={this.state.blue} style={{ color: `${this.state.blue}` }}>${this.props.dashboard.data.sales.total}</WidgetText>


                  <View style={{ flexDirection: 'row', paddingVertical: '1%', }}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold', paddingLeft: '0%', color: this.positiveGreenText(this.props.dashboard.data.sales.previous) }}>+{this.props.dashboard.data.sales.previous}% </Text>
                    <Text style={{ fontSize: 12, color: this.state.lightGrey[1] }}>Since yesterday</Text>
                  </View>

                </View>
                <View style={{
                  height: '40%',
                  paddingTop: '1%',
                  marginLeft: '-14%'
                }}>
                  <LineChart
                    data={{
                      labels: ["10am", "11am", "12pm", "1pm", "2pm", "3pm"],
                      datasets: [
                        {
                          data: this.props.dashboard.data.sales.weekly,
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
              <View style={{ backgroundColor: this.state.orange[1], padding: '1%', marginLeft: '-2.5%', marginBottom: '-.5%', marginTop: '-1.5%', borderBottomLeftRadius: 8, borderTopLeftRadius: 8 }}></View>

              <View style={{ height: '100%' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '4%', paddingVertical: '2%', height: '25%' }}>
                  <WidgetHeader color={this.state.darkgrey}>Total Orders</WidgetHeader>

                </View>


                <View style={{
                  justifyContent: 'center', paddingLeft: '4%', paddingRight: '2%', height: '37%'
                }}>
                  <WidgetText color={this.state.blue} style={{ color: `${this.state.blue}` }}>{this.props.dashboard.data.orders.total}</WidgetText>


                  <View style={{ flexDirection: 'row', paddingVertical: '1%', }}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold', paddingLeft: '0%', color: this.positiveGreenText(this.props.dashboard.data.sales.previous) }}>+{this.props.dashboard.data.sales.previous}% </Text>
                    <Text style={{ fontSize: 12, color: this.state.lightGrey[1] }}>Since yesterday</Text>
                  </View>

                </View>
                <View style={{
                  height: '40%',
                  paddingTop: '1%',
                  marginLeft: '-14%'
                }}>
                  <LineChart
                    data={{
                      labels: ["10am", "11am", "12pm", "1pm", "2pm", "3pm"],
                      datasets: [
                        {
                          data: this.props.dashboard.data.sales.weekly,
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
                      backgroundGradientFrom: this.state.orange[1],
                      backgroundGradientFromOpacity: 0,
                      backgroundGradientTo: this.state.orange[1],
                      backgroundGradientToOpacity: 0,
                      fillShadowGradient: this.state.orange[1],
                      fillShadowGradientOpacity: .3,

                      color: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
                      labelColor: (opacity = 1) => this.state.orange[1],
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
                </View>

              </View>
            </SettingsCard>
          </View>
          <View style={{ paddingVertical: '2%', paddingRight: '1%', paddingLeft: '1%', width: '33%', height: "100%" }}>
            <SettingsCard style={{ flexDirection: 'row', height: "100%", width: "100%", }}>
              <View style={{ backgroundColor: this.state.lightBlue[1], padding: '1%', marginLeft: '-2.5%', marginBottom: '-.5%', marginTop: '-1.5%', borderBottomLeftRadius: 8, borderTopLeftRadius: 8 }}></View>

              <View style={{ height: '100%' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '4%', paddingVertical: '2%', height: '25%' }}>
                  <WidgetHeader color={this.state.darkgrey}>Order Bump Rate</WidgetHeader>

                </View>


                <View style={{
                  justifyContent: 'center', paddingLeft: '4%', paddingRight: '2%', height: '37%'
                }}>
                  <WidgetText color={this.state.blue} style={{ color: `${this.state.blue}` }}>{this.getBumpRate()}</WidgetText>


                  <View style={{ flexDirection: 'row', paddingVertical: '1%', }}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold', paddingLeft: '0%', color: this.positiveGreenText(this.props.dashboard.data.sales.previous) }}>+{this.props.dashboard.data.sales.previous}% </Text>
                    <Text style={{ fontSize: 12, color: this.state.lightGrey[1] }}>Since yesterday</Text>
                  </View>

                </View>
                <View style={{
                  height: '40%',
                  paddingTop: '1%',
                  marginLeft: '-14%'
                }}>
                  <LineChart
                    data={{
                      labels: ["10am", "11am", "12pm", "1pm", "2pm", "3pm"],
                      datasets: [
                        {
                          data: this.props.dashboard.data.sales.weekly,
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
                      backgroundGradientFrom: this.state.lightBlue[1],
                      backgroundGradientFromOpacity: 0,
                      backgroundGradientTo: this.state.lightBlue[1],
                      backgroundGradientToOpacity: 0,
                      fillShadowGradient: this.state.lightBlue[1],
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
                        stroke: this.state.lightBlue[1]
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
          </View></View>

        <View style={{ flexDirection: "row", padding: "2%", paddingTop: '3%', height: "96%" }}>
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
                    labels: this.props.dashboard.data.orders_per_hour.labels,
                    datasets: [
                      {
                        data: this.props.dashboard.data.orders_per_hour.data
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
                  series={this.props.dashboard.data.category_sales.series}
                  sliceColor={sliceColor}
                  doughnut={true}
                />
              </View>
              <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', paddingVertical: '3%' }}>
                {this.props.dashboard.data.category_sales.series.map((category, i) => (
                  <View key={i} style={{ justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, fontWeight: '900' }}>{parseInt((category / total).toFixed(2) * 100)}%</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                      <View style={{ backgroundColor: sliceColor[i], width: Dimensions.get("window").width / 150, height: Dimensions.get("window").width / 150, borderRadius: 32, }} />
                      <Text style={{ paddingLeft: '1%', fontSize: 14, color: this.state.lightGrey[1], fontWeight: '900' }}>{this.props.dashboard.data.category_sales.categories[i]}</Text>
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

const mapStateToProps = state => ({
  dashboard: state.dashboard,
  tickets: state.tickets,
  account: state.account
})

function mapDispatchToProps(dispatch, ownProps) {
  return ({
    GET_DASHBOARD: (ticket) => dispatch({ type: ADD_NEW, data: ticket }),
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);



const series = [123, 321, 123, 789, 537]
const total = 1893
const sliceColor = ['#3D6DAE', '#0091C2', '#27A462', '#FF8C14', '#FFDE7D']
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
  width: 24%;
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

const WidgetHeader = styled.Text`
  font-size: 14px;
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
  font-size: 28px;
  font-weight: 900;
  color: ${props => props.color};
  paddingTop: 0%
`;

