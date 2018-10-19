import React from 'react';
import TabNavigation from './components/navigation/TabNavigation';
import CalendarComponent from './components/calendar/CalendarComponent.js';

export default class App extends React.Component {
    render() {
        return (
            <TabNavigation/>
        );
    }
}

//AppRegistry.registerComponent('Hello App', () => App);
