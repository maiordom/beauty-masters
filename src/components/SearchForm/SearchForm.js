import React, {Component} from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight, Platform, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { FilterLabel } from '../../components/FilterLabel';
import FilterTab from '../../components/Filter';
import FilterCheckBox from '../../components/FilterCheckBox';
import ButtonControl from '../../components/ButtonControl';

import vars from '../../vars';
import i18n from '../../i18n';

export default class SearchFormShort extends Component {
    onChange = (value, modelName) => {
        console.log(value)
        console.log(modelName)
        this.props.actions.setFieldParam(modelName, 'active', value, 'serviceManicure');
    };

    render() {
        const {serviceManicure} = this.props;

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

                    <FilterLabel text={i18n.search.masterPlace} />
                    <FilterTab title="Город" subtitle="Москва" />
                    <FilterTab title="Искать рядом с" subtitle="Мое текущее месторасположение" />
                    <FilterCheckBox title={i18n.search.masterToHome} />

                    <FilterLabel text={i18n.search.masterPlace} />
                    <FilterTab title="Тип мастера" subtitle="Все" />
                    <FilterCheckBox
                        {...serviceManicure.manicure}
                        onChange={this.onChange}
                        withInput={false}
                    />
                    <FilterCheckBox title={i18n.pedicure} />
                    <FilterCheckBox title={i18n.filters.nailExtensionShort} />
                    <FilterCheckBox title={i18n.filters.withdrawal} />

                    <ButtonControl
                        label="Расширенный поиск"
                        customStyles={{
                            touchable: {backgroundColor: vars.color.lightGrey},
                            text: {color: vars.color.red}
                        }}
                        onPress={() => {}}
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
