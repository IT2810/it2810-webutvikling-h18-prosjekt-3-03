import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CalendarComponent from './components/CalendarComponent.js';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <CalendarComponent/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
