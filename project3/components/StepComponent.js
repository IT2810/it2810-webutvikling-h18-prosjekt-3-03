import Expo from "expo";
import React from "react";
import { Pedometer } from "expo";
import { StyleSheet, Text, View } from "react-native";
// https://docs.expo.io/versions/latest/sdk/pedometer#expopedometergetstepcountasyncstart-end
// <div>Icons made by <a href="https://www.flaticon.com/authors/photo3idea-studio" title="photo3idea_studio">photo3idea_studio</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>


export default class StepComponent extends React.Component {
  constructor(props) {
      super(props);



  this.state = {
    isPedometerAvailable: "checking",
    pastStepCount: 0,
    currentStepCount: 0,
    testStepCount: 0,
    goal: 5000,
    data: [],
    readyToSendProps: false,
  };
  this.getStepCountForDate = this.getStepCountForDate.bind(this);
}

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
/*
this.props.sendData([
  {key: new Date("2018","09","06").toDateString(), steps:3000, goal: 5000, achieved: false},
  {key: new Date("2018","09","07").toDateString(), steps:2000, goal: 3000, achieved: false},
  {key: new Date("2018","09","08").toDateString(), steps:7000, goal: 7000, achieved: true},
  {key: new Date("2018","09","09").toDateString(), steps:13000, goal: 10000, achieved: true},
]);
*/
this.createLogData();
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
  //console.log("end: " + end + ", start: " + start);
  Pedometer.getStepCountAsync(start, end).then(
    result => {
      var newData = [];
      newData = this.state.data;
      //console.log("new data: " + newData);
      var achieved = false;
      if(result.steps>=10000){
        achieved = true;
      }
      newData.push({key: date.toDateString(), steps: result.steps, goal: 10000, achieved: achieved});
      this.setState({ data: newData });
    },
    error => {
      this.setState({
        testStepCount: "Could not get stepCount: " + error
      });
      });
};

sendData() {
  /*var length = this.state.data.length;
    var isReady = this.state.readyToSendProps;
    console.log("isReadey: " + isReady + ", length: " + length);
      console.log("it is ready");*/
      var data = this.state.data;
      this.props.sendData(data);
      //this.setState({readyToSendProps: false});

  /*
  console.log("It updated!!");
  console.log("data: " + this.state.data);
  console.log("length: " + this.state.data.length);
    for(var i=0; i< this.state.data.length; i++){
      console.log(i + "key: " + this.state.data[i].key);
      console.log(i + "steps: " + this.state.data[i].steps);
    };*/

}

createLogData(){
  /*var today = new Date();
  var yesterday = new Date();
  yesterday.setDate(yesterday.getDate()-1);
  console.log("Today: " + today );
  console.log("yesterday: " + yesterday);*/
  let list = [];
  let goal = 10000;
  for (var i = 0; i < 30; i++){

    var date = new Date();
    date.setDate(date.getDate()-i);
    //console.log(date);
    this.getStepCountForDate(date);
  }
  this.setState({
    readyToSendProps: true,
  }, this.sendData());
}


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
