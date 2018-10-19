import React from 'react';
import {View} from 'react-native';
import renderer from 'react-test-renderer';
import StepLogComponent from '../StepLogComponent';

it('renders correctly', () => {
    const tree = renderer
        .create(<View>
            <StepLogComponent
                data={[]}
            />
            <StepLogComponent
                data={[{key: new Date(0).toDateString(), steps: 0, goal: 10000, achieved: false}]}
            />
            <StepLogComponent
                data={[{key: new Date(1).toDateString(), steps: 10001, goal: 10000, achieved: true}]}
            />
            <StepLogComponent
                data={[
                    {key: new Date(2).toDateString(), steps: 2, goal: 10000, achieved: false},
                    {key: new Date(3).toDateString(), steps: 10003, goal: 10000, achieved: true},
                ]}
            />
        </View>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
