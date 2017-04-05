import React, {Component, PropTypes} from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight, Platform, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import find from 'lodash/find';
import moment from 'moment';

import 'moment/locale/ru';

import SearchFormCalendar from './SearchFormCalendar';
import SearchFormMasterType from './SearchFormMasterType';
import SearchFormBlockManicure from './SearchFormBlockManicure';
import SearchFormBlockPedicure from "./SearchFormBlockPedicure";

import { FilterLabel } from '../../components/FilterLabel';
import FilterTab from '../../components/Filter';
import FilterCheckBox from '../../components/FilterCheckBox';
import ButtonControl from '../../components/ButtonControl';

import vars from '../../vars';
import i18n from '../../i18n';
import {capitalizeFirstLetter} from '../../utils';

export default class SearchFormShort extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
        serviceManicure: PropTypes.object.isRequired,
        servicePedicure: PropTypes.object.isRequired,
        general: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.tomorrow = moment().add(1, 'd');

        this.state = {
            selectedDate: this.tomorrow,
            showShortForm: true,
            showMasterCalendarModal: false,
            showMasterTypeModal: false
        };
    }

    toggleForm = () => {
        this.setState({ showShortForm: !this.state.showShortForm });
    };

    onChange = sectionName => (value, modelName) => {
        this.props.actions.setFieldParam(modelName, 'active', value, sectionName);
    };

    toggleMasterTypeModal = () => this.setState({ showMasterTypeModal: !this.state.showMasterTypeModal });

    toggleCalendarModal = () => this.setState({ showMasterCalendarModal: !this.state.showMasterCalendarModal });

    onSelectMasterType = (value, id, modelName) => {
        this.props.actions.setItemById(modelName, id, 'general');
        this.toggleMasterTypeModal();
    };

    onSelectCalendarDate = selectedDate => {
        this.setState({ selectedDate });
        this.toggleCalendarModal();
    };

    getSelectedDateTitle = () => {
        return capitalizeFirstLetter(moment(this.state.selectedDate).calendar(null, {
            lastDay : '[Вчера]',
            sameDay : '[Сегодня]',
            nextDay : '[Завтра]',
            lastWeek : '[last] dddd',
            nextWeek : 'dddd',
            sameElse : 'L'
        }))
    };

    render() {
        const { serviceManicure, servicePedicure, general } = this.props;
        const {
            showShortForm,
            showMasterTypeModal,
            showMasterCalendarModal,
            selectedDate
        } = this.state;

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
                    <FilterTab
                        title={this.getSelectedDateTitle()}
                        onChange={this.toggleCalendarModal}
                    />
                    <SearchFormCalendar
                        showCalendar={showMasterCalendarModal}
                        selectedDate={selectedDate}
                        onDateSelect={this.onSelectCalendarDate}
                        containerWidth={170}
                    />

                    {/*Где принимает мастер*/}
                    <FilterLabel text={i18n.search.masterPlace} />
                    <FilterTab title="Город" subtitle="Москва" />
                    <FilterTab
                        onChange={Actions.masterLocation}
                        title="Искать рядом с"
                        subtitle="Мое текущее месторасположение"
                    />
                    <FilterCheckBox title={i18n.search.masterToHome} />

                    <FilterLabel text={i18n.search.generalInfo} />
                    <FilterTab
                        title={i18n.filters.masterType.title}
                        subtitle={find(general.masterType.items, {active: true}).label}
                        onChange={this.toggleMasterTypeModal}
                    />
                    <SearchFormMasterType
                        showMasterTypeModal={showMasterTypeModal}
                        toggleMasterTypeModal={this.toggleMasterTypeModal}
                        masterType={general.masterType}
                        onSelectMasterType={this.onSelectMasterType}
                    />

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
