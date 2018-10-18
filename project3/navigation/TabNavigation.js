import React from 'react';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import {MaterialIcons} from '@expo/vector-icons';

import CalendarScreen from '../screens/CalendarScreen';
import StepsScreen from '../screens/StepsScreen';
import GoalsScreen from '../screens/GoalsScreen';

const CalendarStack = createStackNavigator({
    calendar: {
        screen: CalendarScreen,
    },
});

CalendarStack.navigationOptions = {
    tabBarIcon: (
        <MaterialIcons
            name={'event-available'}
            size={25}
        />
    ),
};

const StepsStack = createStackNavigator({
    steps: {screen: StepsScreen},
});

StepsStack.navigationOptions = {
    tabBarIcon: (
        <MaterialIcons
            name={'directions-run'}
            size={25}
        />
    ),
};

const GoalsStack = createStackNavigator({
    goals: {screen: GoalsScreen},
});

GoalsStack.navigationOptions = {
    tabBarIcon: (
        <MaterialIcons
            name={'check'}
            size={25}
        />
    ),
};

export default createBottomTabNavigator({
        Steps: StepsStack,
        Calendar: CalendarStack,
        Goals: GoalsStack,
    },
    {initialRouteName: 'Calendar'},
);
