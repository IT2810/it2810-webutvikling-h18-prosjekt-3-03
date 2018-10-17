import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TabNavigation from './navigation/TabNavigation';

export default class App extends React.Component {
  render() {
    return (
      <TabNavigation/>
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

//AppRegistry.registerComponent('Hello App', () => App);
