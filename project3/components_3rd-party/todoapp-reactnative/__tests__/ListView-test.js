import React, {Component} from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ListView from '../ListView';
import OmniBox from '../OmniBox';

it('renders correctly shallowly', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<ListView/>);
    const result = renderer.getRenderOutput();

    expect(result.props.children[0]).toEqual(
        <OmniBox
            data={[]}
            updateDataList={result.props.children[0].props.updateDataList}
            updateSearchResults={result.props.children[0].props.updateSearchResults}
        />,
    );
    // Doesn't work without stringifying, for some reason
    expect(JSON.stringify(result.props.children[1])).toEqual(
        JSON.stringify(<Component/>),
    );
});
