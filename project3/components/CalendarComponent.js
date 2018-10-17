import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { asyncStorage } from 'react-native';
import { List, ListItem, FlatList } from 'react-native-elements';
 
export default class CalendarComponent extends React.Component {

    /*
    Needs:
    -currently selected date (selected)
    -list with activities connected to each date
        {date: (description1, description2)}
    -asyncStorage for stored activities
    -textinput to add activity

    function: 
    -when onDayPress() is triggered for a date it should trigger another function
    -this function should go through activityList and display all activities that match datestring 
    */

    list = [
        {
         date: '2018-10-09',
         text: 'An activity'},
        {
         date: '2018-10-16',
         text: 'A second activity'}];

    constructor(props) {
        super(props);
        this.state = {
            selected: '2018-10-09',
            markedDates: [
                {'': 'An activity'}
            ]
        };
    }


    getActivities() {
        // iterates over list and shows items for selected date
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
                    <List>
                        {
                            this.list.filter((item) => (item.date == this.state.selected)).map((item) => (
                                <ListItem
                                key={item.text}
                                title={item.text}
                                // hides right arrow, can use for edit?
                                hideChevron={true} 
                                />
                            ))
                        }
                    </List>
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
