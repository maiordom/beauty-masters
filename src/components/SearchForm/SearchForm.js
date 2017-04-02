import React, {Component, PropTypes} from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight, Platform, ScrollView, Modal } from 'react-native';
import { Actions } from 'react-native-router-flux';

import SearchFormBlockManicure from './SearchFormBlockManicure';
import SearchFormBlockPedicure from "./SearchFormBlockPedicure";

import { FilterLabel } from '../../components/FilterLabel';
import FilterTab from '../../components/Filter';
import FilterCheckBox from '../../components/FilterCheckBox';
import ButtonControl from '../../components/ButtonControl';

import RadioGroup from '../RadioGroup';

import vars from '../../vars';
import i18n from '../../i18n';
import { hexToRgba } from '../../utils';

export default class SearchFormShort extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
        serviceManicure: PropTypes.object.isRequired,
        servicePedicure: PropTypes.object.isRequired,
        general: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            showShortForm: true,
            showMasterTypePopup: false
        };
    }

    toggleForm = () => {
        this.setState({ showShortForm: !this.state.showShortForm });
    };

    onChange = sectionName => (value, modelName) => {
        this.props.actions.setFieldParam(modelName, 'active', value, sectionName);
    };

    toggleMasterTypePopup = (value, id, modelName) => {
        this.setState({ showMasterTypePopup: !this.state.showMasterTypePopup });

        if (value) {
            this.props.actions.setItemById(modelName, id, this.props.sectionName);
        }
    };

    render() {
        const { serviceManicure, servicePedicure } = this.props;
        const { showShortForm, showMasterTypePopup } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.navBar}>
                    <TouchableHighlight
                        style={styles.close}
                        onPress={Actions.pop}
                        activeOpacity={1}
                        underlayColor="transparent"
                    >
                        <Image source={require('../../icons/menu.png')} />
                    </TouchableHighlight>
                    <Text style={styles.navTitle}>{i18n.search.searchParams}</Text>
                </View>
                <ScrollView style={styles.content}>
                    <FilterLabel text={i18n.search.vacantDays} />
                    <FilterTab title={i18n.tomorrow} />

                    {/*Где принимает мастер*/}
                    <FilterLabel text={i18n.search.masterPlace} />
                    <FilterTab title="Город" subtitle="Москва" />
                    <FilterTab title="Искать рядом с" subtitle="Мое текущее месторасположение" />
                    <FilterCheckBox title={i18n.search.masterToHome} />

                    <FilterLabel text={i18n.search.generalInfo} />
                    <FilterTab onChange={this.toggleMasterTypePopup} title="Тип мастера" subtitle="Все" />

                    {showShortForm && (
                        <View>
                            <FilterCheckBox
                                {...serviceManicure.manicure}
                                onChange={this.onChange('serviceManicure')}
                                withInput={false}
                            />
                            <FilterCheckBox
                                {...servicePedicure.pedicure}
                                onChange={this.onChange('servicePedicure')}
                                withInput={false}
                            />
                            <FilterCheckBox title={i18n.filters.nailExtensionShort} />
                            <FilterCheckBox title={i18n.filters.withdrawal} />
                        </View>
                    )}

                    {!showShortForm && (
                        <SearchFormBlockManicure service={serviceManicure} onChange={this.onChange('serviceManicure')} />
                    )}

                    {!showShortForm && (
                        <SearchFormBlockPedicure service={servicePedicure} onChange={this.onChange('servicePedicure')} />
                    )}

                    <ButtonControl
                        label={showShortForm ? 'Расширенный поиск' : 'Быстрый поиск'}
                        customStyles={{
                            touchable: {backgroundColor: vars.color.lightGrey},
                            text: {color: vars.color.red}
                        }}
                        onPress={this.toggleForm}
                    />
                    <ButtonControl label="Найти мастера" onPress={() => {}} />
                </ScrollView>

                <Modal
                    animationType={"fade"}
                    transparent
                    visible={showMasterTypePopup}
                    onRequestClose={() => {}}
                >
                    <View style={modalStyles.container}>
                        <View style={modalStyles.modalContainer}>
                            <Text style={modalStyles.title}>Тип мастера</Text>

                            <RadioGroup
                                {...general.masterType}
                                onChange={this.toggleMasterTypePopup}
                            />

                            <TouchableHighlight onPress={this.toggleMasterTypePopup}>
                                <Text>Hide Modal</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: vars.bodyColor,
        alignItems: 'center'
    },
    content: {
        alignSelf: 'stretch',
        backgroundColor: vars.color.white,
    },
    navBar: {
        height: 40,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        ...Platform.select({
            ios: {
                marginTop: 20
            },
            android: {
                height: 56
            }
        })
    },
    navTitle: {
        color: vars.color.white,
        fontSize: 17,
        ...Platform.select({
            android: {
                fontSize: 20
            }
        })
    },
});

const modalStyles = StyleSheet.create({
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
