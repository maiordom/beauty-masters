import React from 'react';
import { Text, View, StyleSheet, Modal } from 'react-native';

import RadioGroup from '../RadioGroup';

import vars from '../../vars';
import i18n from '../../i18n';
import { hexToRgba } from '../../utils';

const SearchFormMasterType = ({
    showMasterTypePopup,
    toggleMasterTypePopup,
    masterType,
    selectMasterType
}) => (
    <Modal
        animationType={"fade"}
        transparent
        visible={showMasterTypePopup}
        onRequestClose={toggleMasterTypePopup}
    >
        <View style={styles.container}>
            <View style={styles.modalContainer}>
                <Text style={styles.title}>
                    {i18n.filters.masterType.title}
                </Text>
                <RadioGroup {...masterType} onChange={selectMasterType}/>
            </View>
        </View>
    </Modal>
);

export default SearchFormMasterType;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: hexToRgba(vars.color.black, 40)
    },
    modalContainer: {
        height: 208,
        width: 280,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: vars.color.white,
        borderRadius: 2,
    },
    title: {
        paddingTop: 24,
        paddingLeft: 24,
        paddingBottom: 14,
        fontSize: 20,
        color: vars.color.black
    }
});
