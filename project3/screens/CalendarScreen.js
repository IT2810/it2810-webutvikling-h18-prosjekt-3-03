import React from 'react';
import { View, Text } from 'react-native';


export default class CalendarScreen extends React.Component {
    static navigationOptions = {
        title: 'Calendar',
    };
    
    render() {
        return(
            <View style={{flex: 1,alignItems: 'center', justifyContent: 'center'}}>
                <Text>Calendar screen</Text>
            </View>
        );
    }

}