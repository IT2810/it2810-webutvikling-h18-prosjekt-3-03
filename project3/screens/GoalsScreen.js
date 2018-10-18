import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import ListView from '../components_3rd-party/todoapp-reactnative/ListView';

export default class GaolsScreen extends React.Component {
    static navigationOptions = {
        title: 'Goals',
    };

    render() {
        return (
            <View style={styles.container}>
                <ListView/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        paddingTop: 30,
        paddingBottom: 10,
        paddingLeft: 2,
        paddingRight: 2,
        backgroundColor: '#F8F8F8',
    },
});
