import Expo from "expo";
import React from "react";
import { Pedometer } from "expo";
import { StyleSheet, Text, View, AsyncStorage, Image, TextInput } from "react-native";
import styles from '../stylesheets/StepStylesheet.js';
// https://docs.expo.io/versions/latest/sdk/pedometer#expopedometergetstepcountasyncstart-end
// Icon ('../assets/run_big.png') is made by Nikita Golubev (https://www.flaticon.com/authors/nikita-golubev) from www.flaticon.com 


export default class StepComponent extends React.Component {
  // The component is a child of StepInfoComponent and shows the step count for today
  // It also creates log data and passes it on to StepInfoComponent

  constructor(props) {
      super(props);

  this.state = {
    isPedometerAvailable: "checking",
    stepCountToday: 0,
    goalToday: 10000,
    data: [],
    readyToSendProps: false,
  };
  this.getStepCountForDate = this.getStepCountForDate.bind(this);
}// End constructor


  componentDidMount() {
    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _subscribe = () => {
    //Determine whether the pedometer is available.
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

// Get today's step count
const end = new Date();
const start = new Date();
start.setHours(0,0,0,0); // Step count from 00:00 - current time

Pedometer.getStepCountAsync(start, end).then( // Gets the step count between two dates.
  result => {
    this.setState({ stepCountToday: result.steps });
  },
  error => {
    this.setState({
      stepCountToday: "Could not get stepCount: " + error
    });
  }
);


this.createLogData(); // Creates step count log and send it to StepInfoComponent (and later to StepLogComponent)

}; // End _subscribe


getStepCountForDate(date){
  // Get step count from date and add to this.state.data

  const end = date; // End date/time for fatching step count
  let today = new Date();
  if(!((end.getFullYear()== today.getFullYear()) && (end.getMonth()== today.getMonth()) && end.getDate()== today.getDate())){
    end.setHours(23,59,59,999); // If not today, set hours to 23:59:59
  };

  const start = new Date(); //Start date/time for fatching step count
  start.setDate(end.getDate());
  start.setHours(0,0,0,0);

  //Get the step count between two dates.
  Pedometer.getStepCountAsync(start, end).then(
    result => {
      let newData = []; // Used to add step count to this.state.data
      newData = this.state.data;

      let achieved = false; // Used to decide whether goal is achieved in StepLogComponent
      if(result.steps>=10000){
        achieved = true;
      }

      newData.push({key: date.toDateString(), steps: result.steps, goal: 10000, achieved: achieved});
      this.setState({ data: newData });
    },
    error => {
        console.log("Could not get stepCount: " + error);
      });
}; // End getStepCountForDate

sendData() {
  // Sends the step count log to StepInfoComponent (and later to StepLogComponent)
      let data = this.state.data;
      this.props.sendData(data);
}

createLogData(){
  // Creates step count log and send it to StepInfoComponent (and later to StepLogComponent)
  for (var i = 1; i < 31; i++){
    var date = new Date();
    date.setDate(date.getDate()-i);
    this.getStepCountForDate(date); // Gets step count for the date and adds to log
  }
  this.setState({ // When the log is finished, it is sent to the StepInfoComponent (and later to StepLogComponent)
    readyToSendProps: true,
  }, this.sendData());
}

_unsubscribe = () => {
this._subscription && this._subscription.remove();
this._subscription = null;
};

render() {
return (
  <View style={styles.mainContainer}>
  <View style={styles.container}>
    <Text style={styles.todayHeader}>
      Today
    </Text>
    <Text style={styles.todayText}>
      Steps: {this.state.stepCountToday}
    </Text>
    <Text style={styles.todayText}>Goal: {this.state.goalToday}</Text>
    <Text style={styles.todayText}>Left: {this.state.goalToday > this.state.stepCountToday ? this.state.goalToday - this.state.stepCountToday : 0}</Text>
</View>
  <View style={styles.container}>
  <Image style={styles.img} source={ require('../assets/run_big.png')} />
  </View>

  </View>
);
}
}// Class end



/*
createTestData(){
  for (var i = 1; i < 5; i++){
    var date = new Date();
    date.setDate(date.getDate()-i);
    date.setHours(0,0,0,0);
    //console.log(date);
    _storeData(date.toString(), (i*1000).toString());
  }
};
*/

/*
<View style={styles.sContainer2}>
 <TextInput
         style={styles.textInput}
         placeholder="change goal"/>
        <Image style={styles.img} source={ require('../assets/checked.png')} />
  </View>




let _storeData = async (key, value) => {
  console.log("Store   key: " + key + " , value: " + value);
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(" Store error: " + error);
  }
};

let _retrieveData = async (key) => {

  try {
    const value = await AsyncStorage.getItem(key);
    console.log("Retrieve   key: " + key + ", value: " + value);
    if (value !== null) {
      // We have data!!
      return(value);
    }
   } catch (error) {
     console.log("Retrieve error: " + error);
   }
};
let _clear = async () =>{
  await AsyncStorage.clear();
};
*/
