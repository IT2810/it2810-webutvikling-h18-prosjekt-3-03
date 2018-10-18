import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StepComponent from "./StepComponent.js";
import StepLogComponent from './StepLogComponent.js';
import styles from '../stylesheets/StepInfoStylesheet.js';


class StepInfoComponent extends React.Component{
  // The component is parent to StepComponent and StepLogComponent
  // Main task is to transfer log data from StepComponent to StepLogComponent

  constructor(props) {
      super(props);
      this.state={
        data: [],
      };
      this.getStepsFromDates = this.getStepsFromDates.bind(this);
}

getStepsFromDates(newData){
  // When the log is created in StepComponent,this function will be called and the log will be saved in this.state.data
this.setState({data:newData});
};
/*componentDidUpdate(prevProps, prevState) {
  // only update chart if the data has changed
  if (prevState.data !== this.state.data) {
    for(var i=0; i< this.state.data.length; i++){
      console.log(i + "key: " + this.state.data[i].key);
      console.log(i + "steps: " + this.state.data[i].steps);
      console.log(i + "goal: " + this.state.data[i].goal);
      console.log(i + "achieved: " + this.state.data[i].achieved);
    };

  }
}*/

  render() {
    return (
      <View style = {styles.container}>
        <StepComponent sendData={this.getStepsFromDates}/>
        <StepLogComponent data={this.state.data}/>
      </View>
    );
  }

} // End class


export default StepInfoComponent;
