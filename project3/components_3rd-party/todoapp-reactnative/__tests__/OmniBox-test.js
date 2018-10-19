import React from 'react';
import renderer from 'react-test-renderer';
import OmniBox from '../OmniBox';

it('renders correctly', () => {
    // TODO: test shallowly to avoid having to recreate snapshot if subcomponents change
    const tree = renderer
        .create(
            <OmniBox
                value={"Test value"}
            />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
