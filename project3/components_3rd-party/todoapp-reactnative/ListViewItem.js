import React, {Component} from 'react';
import {TouchableHighlight, View, Text} from 'react-native';
import {Button, Icon} from 'native-base';
import CheckBox from './CheckBox';

class ListViewItem extends Component {
    constructor(props) {
        super(props);
        this._onCheckBoxPressed = this._onCheckBoxPressed.bind(this);
        this.state = {
            data: this.props.data
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            data: props.data
        })
    }

    _onCheckBoxPressed() {
        const data = this.state.data;
        data.completed = !data.completed;
        this.setState({
            data: data
        });

        this.props.onCompletedChange(data, this.props.dataIndex);
    }

    render() {
        let data = this.state.data;
        let color = data.completed ? '#C5C8C9' : '#000';
        let textDecorationLine = data.completed ? 'line-through' : 'none';
        return (
            <TouchableHighlight underlayColor={'#eee'} style={{
                paddingTop: 6,
                paddingBottom: 6,
                backgroundColor: "#F8F8F8",
                borderBottomWidth: 1,
                borderColor: '#eee'
            }} {...this.props.sortHandlers}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <CheckBox data={data} color={color} onCheckBoxPressed={this._onCheckBoxPressed}/>
                    <Text
                        style={{fontSize: 18, color: color, textDecorationLine: textDecorationLine}}>{data.title}</Text>
                    <Button
                        transparent
                        onPress={() => this.props.onRemove(this.props.dataIndex)}
                        style={{marginLeft: 'auto'}}>
                        <Icon name={"trash"}/>
                    </Button>
                </View>
            </TouchableHighlight>
        )
    }
}

module.exports = ListViewItem;
