import React from 'react';
import renderer from 'react-test-renderer';
import CalendarScreen from '../CalendarScreen.js';

describe('Test CalendarScreen', () => {
    const tree = renderer.create(<CalendarScreen/>);
    test('Test CalendarScreen snapshot', () => {
        expect(tree).toMatchSnapshot;
    })  


})