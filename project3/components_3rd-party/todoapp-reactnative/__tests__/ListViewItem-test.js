import React from 'react';
import renderer from 'react-test-renderer';
import ListViewItem from '../ListViewItem';
import TodoModel from '../TodoModel';

it('renders correctly', () => {
    const tree = renderer
        .create(<ListViewItem data={new TodoModel("Test title", false, new Date(0))}
                              dataIndex={0}
        />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
