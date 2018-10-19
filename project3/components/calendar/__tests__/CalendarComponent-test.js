import React from 'react';
import renderer from 'react-test-renderer';
import CalendarComponent from '../CalendarComponent.js';

it('renders correctly', () => {
    const tree = renderer.create(<CalendarComponent/>);
    const instance = tree.getInstance();
    expect(instance.state.activityText).toBe('');
});
