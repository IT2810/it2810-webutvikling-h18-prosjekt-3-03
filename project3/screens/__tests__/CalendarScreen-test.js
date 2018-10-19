import React from 'react';
import renderer from 'react-test-renderer';
import CalendarScreen from '../CalendarScreen.js';

describe('Test CalendarScreen', () => {
    const tree = renderer.create(<CalendarScreen/>);
    test('Test CalendarScreen snapshot', () => {
        expect(tree).toMatchSnapshot;
        expect(tree.toJSON().children[0].children.length).toBe(3);
        expect(tree.toJSON().children[0].type).toBe('View');
    })  


})