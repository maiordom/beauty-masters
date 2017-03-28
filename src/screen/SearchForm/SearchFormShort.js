import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight, Platform, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { FilterLabel } from '../../components/FilterLabel';
import Filter from '../../components/Filter';
import FilterCheckBox from '../../components/FilterCheckBox';
import ButtonControl from '../../components/ButtonControl';

import vars from '../../vars';
import i18n from '../../i18n';

import { hexToRgba } from '../../utils';

export default class SearchFormShort extends Component {
    render() {
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
                    <Filter title={i18n.tomorrow} />

                    <FilterLabel text={i18n.search.masterPlace} />
                    <Filter title="Город" subtitle="Москва" />
                    <Filter title="Искать рядом с" subtitle="Мое текущее месторасположение" />
                    <FilterCheckBox title={i18n.search.masterToHome} />

                    <FilterLabel text={i18n.search.masterPlace} />
                    <Filter title="Тип мастера" subtitle="Все" />
                    <FilterCheckBox title={i18n.manicure} />
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
    close: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        top: 0,
        width: 40,
        height: 40,
        ...Platform.select({
            android: {
                width: 56,
                height: 56
            }
        })
    },
    logo: {
        marginTop: 56,
        marginBottom: 56,
        ...Platform.select({
            android: {
                marginTop: 40
            }
        })
    },
    tabs: {
        flex: 0,
        flexDirection: 'row'
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tab: {
        fontSize: 17,
        color: hexToRgba(vars.color.white, 70),
        ...Platform.select({
            android: {
                fontSize: 16
            }
        })
    },
    tabActive: {
        fontSize: 17,
        color: vars.color.white,
        ...Platform.select({
            android: {
                fontSize: 16
            }
        })
    },
    tabContent: {
        alignSelf: 'stretch',
        backgroundColor: vars.color.white,
        flex: 1,
        paddingTop: 32
    },
    switchArrow: {
        height: 8,
        alignItems: 'center',
        ...Platform.select({
            android: {
                height: 6
            }
        })
    }
});
