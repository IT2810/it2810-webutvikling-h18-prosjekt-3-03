import React, {Component} from 'react';
import {FlatList, Text, View, Image} from 'react-native';
import styles from '../stylesheets/StepLogStylesheet.js';


export default class StepLogComponent extends Component {
    // This component is a child of StepInfoConent and shows the step count for the past 30 days (after subscribing for the first time)

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {key: new Date().toDateString(), steps: 0, goal: 0, achieved: false},  // Default values for log
            ],
            isUpdated: false, // Usage: Only render data from props after they have been received
        };
    }

    renderListSeparator = () => {
        // Seperator between elements in list
        return (
            <View
                style={styles.itemSeperator}
            />
        );
    };

    renderListHeader = () => {
        // List header
        return (
            <View style={styles.listHeader}>
                <Text style={styles.headerText}> Log </ Text></ View>
        );
    };

    componentDidUpdate(prevProps, prevState) {
        // only update chart if the data has changed

        if (prevProps.data !== this.props.data) {
            this.setState({
                isUpdated: true,
            });
            /*
            for(var i=0; i< this.props.data.length; i++){
              console.log(i + "key: " + this.props.data[i].key);
              console.log(i + "steps: " + this.props.data[i].steps);
              console.log(i + "goal: " + this.props.data[i].goal);
              console.log(i + "achieved: " + this.props.data[i].achieved);
            };
            */
        }
    };

    render() {
        let isUpdated = this.state.isUpdated; // Usage: Only render data from props after they have been received

        return (
            <View style={styles.container1}>
                <FlatList
                    ItemSeparatorComponent={this.renderListSeparator}
                    ListHeaderComponent={this.renderListHeader}
                    data={isUpdated ? this.props.data : this.state.data}
                    renderItem={({item}) => <View style={styles.container1}><View style={styles.container2}><Text
                        style={styles.dateText}>{item.key}</Text>
                        <Image style={styles.stepImg} source={require('../assets/run.png')}/><Text
                            style={styles.stepText}>{item.steps}/{item.goal}</Text></ View>
                        {item.achieved ? <Image style={styles.starImg} source={require('../assets/favourites.png')}/> :
                            <Image style={styles.starImg} source={require('../assets/empty.png')}/>}</View>}

                />
            </View>
        );
    }
} // End class
