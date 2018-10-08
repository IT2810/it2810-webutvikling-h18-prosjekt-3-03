import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StepInfoComponent from './components/StepInfoComponent.js';
import FlatListBasics from './components/StepLogComponent.js';
//import FlatListDemo from './components/testComp.js';

export default class App extends React.Component {
/*
<StepLogComponent />
<FlatListBasics />
<Text>Open up App.js to start working on your app!</Text>*/

  render() {
    return (
      <View style={styles.container}>
<StepInfoComponent />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
