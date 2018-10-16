import React from 'react';
import { Text, View } from 'react-native';

export default class GaolsScreen extends React.Component {
    static navigationOptions = {
        title: 'Goals'
    };

    render() {
        return(
            <View style={{flex: 1,alignItems: 'center', justifyContent: 'center'}}>
                <Text>Goals screen</Text>
            </View>
        );
    }

}