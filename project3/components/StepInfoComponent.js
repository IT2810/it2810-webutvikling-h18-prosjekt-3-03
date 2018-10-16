import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StepComponent from "./StepComponent.js";
import FlatListBasics from './StepLogComponent.js';
// https://www.flaticon.com/free-icon/walk_1096458
// Icon made by [Freepik] from www.flaticon.com
class StepInfoComponent extends React.Component{
  constructor(props) {
      super(props);
      this.state={
        data: [],
      };
      this.getStepsFromDates = this.getStepsFromDates.bind(this);
}

getStepsFromDates(newData){
  //console.log(newData);
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
        <FlatListBasics data={this.state.data}/>

      </View>

    );
  }


}

const styles = StyleSheet.create({
container: {
flex: 1,
marginTop: 0,
marginLeft: 0,
alignItems: "flex-start",
justifyContent: "flex-start"
}
});

export default StepInfoComponent;
