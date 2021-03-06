import React, {Component} from 'react';
import {TextInput, Keyboard} from 'react-native';
import TodoModel from './TodoModel';
import Utils from './Utils';

class OmniBox extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmitEditing = this.onSubmitEditing.bind(this);

        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', OmniBox._keyboardDidHide);
    }

    componentWillMount() {
        this.setState({
            newValue: '',
        });
    }

    onChange(event) {
        const title = event.nativeEvent.text;
        const dataList = this.props.data.filter((item) => item.title.match(new RegExp('.*' + title + '.*', 'gi')));

        this.setState({newValue: title});
        this.props.updateSearchResults(dataList);
    }

    onSubmitEditing(event) {
        // if (event.nativeEvent.key === 'Enter' && this.state.newValue) {

        // Hides keyboard and removes focus (from TextInput)
        Keyboard.dismiss();

        const newDataItem = new TodoModel(this.state.newValue);

        const dataList = this.props.data;
        const dataItem = Utils.findTodo(newDataItem, dataList);
        if (dataItem)
            Utils.move(dataList, (dataList.indexOf(dataItem)), 0);
        else
            dataList.unshift(newDataItem);

        this.setState({newValue: ''});
        this.props.updateDataList(dataList);
        // }
    }

    static _keyboardDidHide() {
        // Removes focus (from TextInput)
        Keyboard.dismiss();
    }

    render() {
        return (
            <TextInput style={{
                height: 36,
                padding: 4,
                marginBottom: 0,
                fontSize: 16,
                borderWidth: 1,
                borderColor: '#eee',
                borderRadius: 8,
                backgroundColor: '#fff',
            }}
                       underlineColorAndroid='transparent'
                       placeholder='Add a todo or Search'
                       blurOnSubmit={false}
                       value={this.state.newValue}
                // onKeyPress={this.onKeyPress}
                       onSubmitEditing={this.onSubmitEditing}
                       onChange={this.onChange}
            />
        );
    }
}

module.exports = OmniBox;
