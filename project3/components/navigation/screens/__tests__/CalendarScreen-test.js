import React from 'react';
import renderer from 'react-test-renderer';
import CalendarScreen from '../CalendarScreen.js';

it('renders correctly', () => {
    // TODO: test shallowly to avoid having to recreate snapshot if subcomponents change
    const tree = renderer.create(<CalendarScreen/>);
    expect(tree.toJSON().children[0].children.length).toBe(3);
    expect(tree.toJSON().children[0].type).toBe('View');
    expect(tree).toMatchSnapshot();
});
