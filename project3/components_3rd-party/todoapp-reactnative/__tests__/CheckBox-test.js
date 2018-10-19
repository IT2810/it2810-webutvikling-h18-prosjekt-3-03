import React from 'react';
import {View} from 'react-native';
import renderer from 'react-test-renderer';
import CheckBox from '../CheckBox';
import TodoModel from "../TodoModel";

it('renders correctly', () => {
    const tree = renderer
        .create(<View>
            <CheckBox data={new TodoModel("", false, new Date(0))}/>
            <CheckBox data={new TodoModel("", false, new Date(0))} color={'#000'}/>
            <CheckBox data={new TodoModel("", false, new Date(0))} color={'#C5C8C9'}/>
        </View>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
