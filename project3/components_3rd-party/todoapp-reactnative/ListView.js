import React, {Component} from 'react';
import {View, AsyncStorage} from 'react-native';
import OmniBox from './OmniBox';
import SortableListView from 'react-native-sortable-listview';
import ListViewItem from './ListViewItem';
import Utils from './Utils';

let _storeData = async () => {
    try {
        await AsyncStorage.setItem(dataListName, JSON.stringify(dataList));
    } catch (error) {
        console.error(error);
    }
};

const _retrieveData = async () => {
    try {
        const value = await AsyncStorage.getItem(dataListName);
        if (value !== null)
            dataList = JSON.parse(value);
        else {
            // Should only happen the first time the app is used
            _storeData();
        }
    } catch (error) {
        console.error(error);
    }
};

let dataList = [];
const dataListName = "@Todo:dataList";

function moveItem(listView, fromIndex, toIndex) {
    Utils.move(dataList, parseInt(fromIndex), parseInt(toIndex));
    if (listView.forceUpdate)
        listView.forceUpdate();
    _storeData();
}

class ListView extends Component {
    constructor(props) {
        super(props);
        this._updateDataList = this._updateDataList.bind(this);
        this._updateSearchResults = this._updateSearchResults.bind(this);
        this._onCompletedChange = this._onCompletedChange.bind(this);
        this._onRemove = this._onRemove.bind(this);

        this.state = {
            dataList: dataList,
        };
        // Kind of awkward way of updating state after AsyncStorage has finished retrieving data
        _retrieveData().then(() => this.setState({dataList: dataList}));
    }

    _updateDataList(dataList) {
        this.setState({dataList: dataList});
        _storeData();
    }

    _updateSearchResults(dataList) {
        // FIXME: Can update AsyncStorage while search results are displayed (e.g. by completing or removing a goal),
        // and wrongly store that state
        console.log(this.state.dataList);
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
                    updateSearchResults={this._updateSearchResults}
                />
                {listView}
            </View>
        );
    }
}

module.exports = ListView;
