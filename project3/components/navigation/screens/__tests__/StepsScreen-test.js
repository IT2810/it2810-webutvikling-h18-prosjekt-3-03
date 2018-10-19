import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import StepsScreen from '../StepsScreen';
import StepInfoComponent from '../../../step/StepInfoComponent';

it('renders correctly shallowly', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<StepsScreen/>);
    const result = renderer.getRenderOutput();

    expect(result.props.children).toEqual(<StepInfoComponent/>);
});
