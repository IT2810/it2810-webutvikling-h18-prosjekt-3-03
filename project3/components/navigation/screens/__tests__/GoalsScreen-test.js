import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import GoalsScreen from '../GoalsScreen';
import ListView from '../../../../components_3rd-party/todoapp-reactnative/ListView';

it('renders correctly shallowly', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<GoalsScreen/>);
    const result = renderer.getRenderOutput();

    expect(result.props.children).toEqual(<ListView/>);
});
