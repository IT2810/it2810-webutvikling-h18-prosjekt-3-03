import React from 'react';
import {StyleSheet, View} from 'react-native';
import StepInfoComponent from '../../step/StepInfoComponent.js';

export default class StepssScreen extends React.Component {
    static navigationOptions = {
        title: 'Steps',
    };

    render() {
        return (
            <View style={styles.container}>
                <StepInfoComponent/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginBottom: 0,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
});
