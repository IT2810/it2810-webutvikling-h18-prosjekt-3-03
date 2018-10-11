import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar, CalendarList } from 'react-native-calendars';

export default class CalendarComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: '2018-10-09'
        };
    }

    render () {
        return (
            <View style={styles.wrapper}>
                <View style={{height: 50}}></View>
                <CalendarList style={styles.calendar}
                    horizontal={true}
                    pagingEnabled={true}
                    onDayPress={(day) => this.setState({selected: day.dateString}) }
                    hideExtraDays={false}
                    markedDates={{
                        [this.state.selected]: {selected: true, marked: true, selectedColor: 'green'},
                      }}
                />
                <View style={styles.activity}>
                    <Text>Activity</Text>
                    <Text>{this.state.selected}</Text>
                </View>
            </View>
        );
       
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: 'skyblue',
        flexDirection: 'column',
        alignItems: 'stretch'
    },
    calendar: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'black'

    },
    activity: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'black',
    }
});
