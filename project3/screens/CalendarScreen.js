import React from 'react';
import {View} from 'react-native';
import CalendarComponent from '../components/CalendarComponent';

export default class CalendarScreen extends React.Component {
    static navigationOptions = {
        title: 'Calendar',
    };

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <CalendarComponent/>
            </View>
        );
    }
}
