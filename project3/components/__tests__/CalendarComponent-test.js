import React from 'react';
import renderer from 'react-test-renderer';
import CalendarComponent from '../CalendarComponent.js';

describe('Test CalendarComponent', () => {
    test('Testing CalendarComponent', () =>{
        const tree = renderer.create(<CalendarComponent/>);
        const instance = tree.getInstance();
        expect(instance.state.activityText).toBe('');
    })
})