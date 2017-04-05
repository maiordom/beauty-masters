import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import Input from '../Input';

import vars from '../../vars';
import i18n from '../../i18n';

export default class MasterEditorGeneral extends Component {
    onChange = (value, modelName) => {

    };

    render() {
        const {
        } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.inner}>
                    <Input placeholder="Введите адрес" onChange={this.onChange} />
                    <TouchableWithoutFeedback onPress={() => {}}>
                        <View style={styles.tab}>
                            <Text style={styles.tabText}>{i18n.location.here}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => {}}>
                        <View style={styles.tab}>
                            <Text style={styles.tabText}>{i18n.location.meters(500, true)}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => {}}>
                        <View style={styles.tab}>
                            <Text style={styles.tabText}>{i18n.location.meters(1)}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => {}}>
                        <View style={styles.tab}>
                            <Text style={styles.tabText}>{i18n.location.meters(2)}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inner: {
        flex: 1,
        paddingTop: 8,
        paddingLeft: 16,
        paddingRight: 16
    },
    selectCalendar: {
        flex: 1,
    },
    tab: {
        height: 48,
        paddingLeft: 5,
        justifyContent: 'center',
    },
    tabText: {
        fontSize: 16,
        color: vars.color.black,
    }
});
