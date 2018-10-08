import Expo from "expo";
import React from "react";
import { Pedometer } from "expo";
import { StyleSheet, Text, View } from "react-native";
// https://docs.expo.io/versions/latest/sdk/pedometer#expopedometergetstepcountasyncstart-end

export default class StepComponent extends React.Component {
  state = {
    isPedometerAvailable: "checking",
    pastStepCount: 0,
    currentStepCount: 0,
    testStepCount: 0
  };

  componentDidMount() {
    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      this.setState({
        currentStepCount: result.steps
      });
    });

    Pedometer.isAvailableAsync().then(
      result => {
        this.setState({
          isPedometerAvailable: String(result)
        });
      },
      error => {
        this.setState({
          isPedometerAvailable: "Could not get isPedometerAvailable: " + error
        });
      }
);

const end = new Date();
const start = new Date();
start.setDate(end.getDate() - 1);
Pedometer.getStepCountAsync(start, end).then(
  result => {
    this.setState({ pastStepCount: result.steps });
  },
  error => {
    this.setState({
      pastStepCount: "Could not get stepCount: " + error
    });
  }
);
this.getStepCountForDate(new Date("2018","09","06"));
};

getStepCountForDate(date){
  const end = date;
  const start = new Date();
  start.setDate(end.getDate() - 1);
  start.setHours(0,0,0,0);
  console.log("end: " + end + ", start: " + start);
  Pedometer.getStepCountAsync(start, end).then(
    result => {
      this.setState({ testStepCount: result.steps });
    },
    error => {
      this.setState({
        testStepCount: "Could not get stepCount: " + error
      });
      });
};

_unsubscribe = () => {
this._subscription && this._subscription.remove();
this._subscription = null;
};

render() {
return (
  <View style={styles.container}>
    <Text>
      Pedometer.isAvailableAsync(): {this.state.isPedometerAvailable}
    </Text>
    <Text>
      Steps taken in the last 24 hours: {this.state.pastStepCount}
    </Text>
    <Text>Walk! And watch this go up: {this.state.currentStepCount}</Text>
    <Text>Steps: {this.state.testStepCount}</Text>
  </View>
);
}
}

const styles = StyleSheet.create({
container: {
flex: 1,
marginTop: 15,
alignItems: "center",
justifyContent: "center"
}
});

Expo.registerRootComponent(StepComponent);
