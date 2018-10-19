import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, AsyncStorage } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { Button, List, ListItem } from 'react-native-elements';
import { uid } from 'react-uid';

let activityList = [];
const ASYNC_STORAGE_KEY = 'STORAGE_KEY';

export default class CalendarComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: this.getToday(new Date()),
            markedDates: {}, 
            activityText: '',
            listOfActivities: activityList
        };
        this.getToday = this.getToday.bind(this);
        this.addActivity = this.addActivity.bind(this);
        this.updateMarkes = this.updateMarks.bind(this);        
    }

    _storeData = async () => {
        try {
            await AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(activityList));
        } catch (error) {
            console.log(error);
        }
    }

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);
            if (value != null) {
                activityList = JSON.parse(value);
                this.setState({listOfActivities: activityList})
            } else {
                this._storeData();
            }
        } catch (error) {
            console.log(error);
        }
    }

    addActivity() {
        if (!(this.state.activityText == '')) {
            // generates a unique "enough" key for list-items, could be better
            let newKey = new Date().getUTCMilliseconds();
            this.state.listOfActivities.push({Key: newKey, date: this.state.selected, atext: this.state.activityText});
            this.setState({activityText: ''});
        }
        this._storeData();
        this.updateMarks();
    }

    getToday(today) {
        let day = today.getDate();
        let month = today.getMonth() + 1;
        let year = today.getFullYear();
        return year + '-' + month + '-' + day;
    }

    // Updates the markings in the calendar which marks which days have activities added
    updateMarks() {
        let newMarkedObj = {};
        this.state.listOfActivities.map((item) => {
            newMarkedObj = {...newMarkedObj, [item.date]: {marked: true}}
        })
        this.setState({ markedDates: newMarkedObj});
    }

    componentWillMount() {
        this._retrieveData().done();
        setTimeout(this.updateMarkes, 1000);
    }

    render () {
        return (
            <View style={styles.wrapper}>

                <View style={styles.calendar}>
                    <CalendarList 
                        theme={{
                            dotColor: '#ffa500'
                        }}
                        horizontal={true}
                        onDayPress= {(day) => {
                            this.setState({selected: day.dateString});
                        } }
                        hideExtraDays={false}
                        markedDates={this.state.markedDates}
                    />
                </View>
                
                <View style={styles.textAndButtonContainer}>
                    <TextInput style={{height: 40, borderWidth: 3, borderColor: '#eee', borderRadius: 8, margin: 5}}
                        placeholder="  Add something"
                        onChangeText={(value) => this.setState({activityText: value})}
                        value={this.state.activityText}
                    />
                    <Button 
                        title='Add activity'
                        onPress={() => {
                            this.addActivity();
                        }}    
                        />
                    <Text style={styles.selectedText}>
                        Selected day: {this.state.selected}
                    </Text>
                </View>
                
                <View style={styles.activityItems}>
                    <ScrollView>
                        <List> 
                            {
                                // loops over the activity list and displays the ones for the curretly selected day
                                this.state.listOfActivities.filter((item) => (item.date == this.state.selected)).map((item) => (
                                <ListItem
                                key={uid(item)}
                                title={item.date}
                                subtitle={item.atext}
                                // hides right arrow, can use for edit?
                                hideChevron={true} 
                                />                                    
                                ))
                            }
                        </List>
                    </ScrollView>
                </View>

            </View>
        );
       
    }
}


const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexDirection: 'column',
    },
    calendar: {
        flex: 1,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#eeeeee'
    },
    activityItems: {
        flex: 0.5
    },
    textAndButtonContainer: {
        flex: 0.4
    },
    selectedText: {
        alignSelf: 'center', 
        color: '#ffa500', 
        fontSize: 15,
        padding: 5
    }
});
