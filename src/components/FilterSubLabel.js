import React, { Component } from 'react';
import { TouchableHighlight, View, Text, StyleSheet, Platform } from 'react-native';

import { formatNumber } from '../utils';

import Checkbox from '../components/Checkbox';
import Input from '../components/Input';

import vars from '../vars';
import i18n from '../i18n';

import { shouldComponentUpdate } from '../utils';

export default class FilterSubLabel extends Component {
    shouldComponentUpdate = () => false;

    render() {
        const { title } = this.props;

        return (
            <View style={styles.container}>
                <TouchableHighlight
                    underlayColor='transparent'
                    activeOpacity={1}
                    style={styles.button}
                >
                    <View style={styles.buttonContent}>
                        <Text style={styles.title}>{title}</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {},
    button: {
        paddingLeft: 15,
        paddingRight: 15
    },
    buttonContent: {
        height: 44,
        ...Platform.select({
            android: {
                height: 48
            }
        }),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        color: vars.color.grey,
        ...Platform.select({
            android: {
                fontSize: 14
            }
        })
    },
    fields: {
        flexDirection: 'row'
    },
    input: {
        flex: 1,
        paddingLeft: 11,
        paddingRight: 11
    }
});
