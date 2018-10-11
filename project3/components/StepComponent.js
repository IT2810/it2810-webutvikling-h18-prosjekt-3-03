import Expo from "expo";
import React from "react";
import { Pedometer } from "expo";
import { StyleSheet, Text, View } from "react-native";
// https://docs.expo.io/versions/latest/sdk/pedometer#expopedometergetstepcountasyncstart-end
// <div>Icons made by <a href="https://www.flaticon.com/authors/photo3idea-studio" title="photo3idea_studio">photo3idea_studio</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>


export default class StepComponent extends React.Component {
  state = {
    isPedometerAvailable: "checking",
    pastStepCount: 0,
    currentStepCount: 0,
    testStepCount: 0,
    goal: 5000,
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
start.setHours(0,0,0,0);
//console.log("end: " + end + ", start: " + start);
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



//this.getStepCountForDate(new Date("2018","09","07"));
};

getStepCountForDate(date){
  const end = date;
  let today = new Date();
  if(!((end.getFullYear()== today.getFullYear()) && (end.getMonth()== today.getMonth()) && end.getDate()== today.getDate())){
    end.setHours(23,59,59,999);
  };
  const start = new Date();
  start.setDate(end.getDate());
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
      Today:
    </Text>
    <Text>
      Steps: {this.state.pastStepCount}
    </Text>
    <Text>Goal: {this.state.goal}</Text>
    <Text>Left: {this.state.goal > this.state.pastStepCount ? this.state.goal - this.state.pastStepCount : 0}</Text>
  </View>
);
}
}

const styles = StyleSheet.create({
container: {
flex: 1,
marginTop: 20,
marginLeft: 20,
alignItems: "flex-start",
justifyContent: "flex-start"
}
});

//Expo.registerRootComponent(StepComponent);
