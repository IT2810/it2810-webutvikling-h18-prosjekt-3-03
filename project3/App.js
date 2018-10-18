import React from 'react';
import TabNavigation from './navigation/TabNavigation';
import CalendarComponent from './components/CalendarComponent.js';

export default class App extends React.Component {
    render() {
        return (
            <TabNavigation/>
        );
    }
}

//AppRegistry.registerComponent('Hello App', () => App);
