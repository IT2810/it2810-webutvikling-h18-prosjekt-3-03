import React, {Component} from 'react';
import {View} from 'react-native';
import TodoModel from './TodoModel';
import OmniBox from './OmniBox';
import SortableListView from 'react-native-sortable-listview';
import ListViewItem from './ListViewItem';
import Utils from './Utils';

let dataList = [
    new TodoModel('Check to complete a todo'),
    new TodoModel('Long press, drag and drop a todo to sort'),
];
for (let i = 1; i < 15; i++)
    dataList.push(new TodoModel('' + i));

function moveItem(listView, fromIndex, toIndex) {
    Utils.move(dataList, parseInt(fromIndex), parseInt(toIndex));
    if (listView.forceUpdate)
        listView.forceUpdate();
}

class ListView extends Component {
    constructor(props) {
        super(props);
        this._updateDataList = this._updateDataList.bind(this);
        this._onCompletedChange = this._onCompletedChange.bind(this);
        this._onRemove = this._onRemove.bind(this);

        this.state = {
            dataList: dataList,
        };
    }

    _updateDataList(dataList) {
        this.setState({dataList: dataList});
    }

    _onCompletedChange(dataItem, index) {
        const toIndex = dataItem.completed ? dataList.length - 1 : 0;
        moveItem(this, index, toIndex);
    }

    _onRemove(index) {
        dataList.splice(index, 1); // removes 1 element starting at index
        this._updateDataList(dataList);
    }

    render() {
        let listView = (<View/>);
        if (this.state.dataList.length) {
            listView = (
                <SortableListView
                    ref='listView'
                    style={{flex: 1}}
                    data={this.state.dataList}
                    onRowMoved={e => moveItem(this, e.from, e.to)}
                    renderRow={(dataItem, section, index) =>
                        <ListViewItem data={dataItem}
                                      dataIndex={index}
                                      onCompletedChange={this._onCompletedChange}
                                      onRemove={this._onRemove}
                        />
                    }
                />
            );
        }

        return (
            <View style={{flex: 1, marginLeft: 10, marginRight: 10}}>
                <OmniBox
                    data={dataList}
                    updateDataList={this._updateDataList}
                />
                {listView}
            </View>
        );
    }
}

module.exports = ListView;
