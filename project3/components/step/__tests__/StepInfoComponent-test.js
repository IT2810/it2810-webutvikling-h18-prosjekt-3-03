import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import StepInfoComponent from '../StepInfoComponent';
import StepComponent from '../StepComponent';
import StepLogComponent from '../StepLogComponent';

it('renders correctly shallowly', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<StepInfoComponent/>);
    const result = renderer.getRenderOutput();

    expect(result.props.children).toEqual([
        <StepComponent sendData={result.props.children[0].props.sendData}/>,
        <StepLogComponent data={[]}/>,
    ]);
});
