import React from 'react';
import renderer from 'react-test-renderer';
import ListView from '../../components_3rd-party/todoapp-reactnative/ListView';

describe('Test GoalsScreen', () => {
    const tree = renderer.create(<ListView/>);
    test('Test GoalsScreen snapshot', () => {
        expect(tree).toMatchSnapshot;
    })  
})