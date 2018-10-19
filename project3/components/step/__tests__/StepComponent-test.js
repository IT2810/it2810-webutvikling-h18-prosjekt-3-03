import React from 'react';
import {Image, Text, View} from 'react-native';
import ShallowRenderer from 'react-test-renderer/shallow';
import StepComponent from '../StepComponent';
import styles from '../../../stylesheets/step/StepStylesheet.js';

it('renders correctly shallowly', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<StepComponent/>);
    const result = renderer.getRenderOutput();

    expect(result.props.children).toEqual([
        <View style={styles.container}>
            <Text style={styles.todayHeader}>
                Today
            </Text>
            <Text style={styles.todayText}>
                {result.props.children[0].props.children[1].props.children}
            </Text>
            <Text style={styles.todayText}>
                {result.props.children[0].props.children[2].props.children}
            </Text>
            <Text style={styles.todayText}>
                {result.props.children[0].props.children[3].props.children}
            </Text>
        </View>,
        <View style={styles.container}>
            <Image style={styles.img} source={require('../../../assets/run_big.png')}/>
        </View>,
    ]);
});
