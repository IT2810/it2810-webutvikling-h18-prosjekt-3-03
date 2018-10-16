import React from 'react';
import { Text, View } from 'react-native';

export default class StepssScreen extends React.Component {
    static navigationOptions = {
        title: 'Steps'
    };

    render() {
        return(
            <View style={{flex: 1,alignItems: 'center', justifyContent: 'center'}}>
                <Text>Steps screen</Text>
            </View>
        );
    }

}