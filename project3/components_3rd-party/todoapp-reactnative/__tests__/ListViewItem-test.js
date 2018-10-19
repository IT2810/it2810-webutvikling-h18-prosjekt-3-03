import React from 'react';
import {View} from 'react-native';
import renderer from 'react-test-renderer';
import ListViewItem from '../ListViewItem';
import TodoModel from '../TodoModel';

it('renders correctly', () => {
    // TODO: test shallowly to avoid having to recreate snapshot if subcomponents change
    const tree = renderer
        .create(<View>
            <ListViewItem data={new TodoModel("Test title", false, new Date(0))}
                          dataIndex={0}/>
            <ListViewItem data={new TodoModel("Test title 2", true, new Date(0))}
                          dataIndex={0}/>
        </View>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
