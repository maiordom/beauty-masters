// @flow

import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Platform } from 'react-native';

import { SubLabel } from '../SubLabel';
import ActivityIndicator from '../../containers/ActivityIndicator';
import ButtonControl from '../ButtonControl';
import Input from '../Input';
import Label from '../Label';
import Switch from '../Switch';
import EditControl from '../EditControl';

import i18n from '../../i18n';
import vars from '../../vars';
import { trackEvent } from '../../utils/Tracker';

type TProps = {
  actions: Object,
  cardType: string,
  isSalon: boolean,
  modelParamName: string,
  models: Object,
  queryParamName: string,
  sectionName: string,
};

export default class MasterEditorHandlingTools extends Component<TProps, void> {
  onChange = (state: boolean, modelName: string) => {
    const { modelParamName, sectionName } = this.props;

    this.props.actions.toggleService(
      modelName,
      modelParamName,
      state,
      sectionName,
    );
  };

  onChangeOtherMethod = (value: string, modelName?: string) => {
    const { queryParamName, sectionName } = this.props;

    this.props.actions.setServiceParam(
      modelName,
      queryParamName,
      value,
      sectionName,
    );
  };

  onNextPress = () => {
    this.props.actions.createMasterServices().then((res) => {
      if (res.result === 'success') {
        if (this.props.cardType === 'create') {
          if (this.props.isSalon) {
            trackEvent('step3Salon');
          } else {
            trackEvent('step3Private');
          }
        } else {
          trackEvent('changeHandlingTools');
        }

        this.props.actions.routeToCalendars();
      }
    });
  };

  onSavePress = () => {
    this.props.actions.createMasterServices().then((res) => {
      if (res.result === 'success') {
        this.props.actions.routeToProfile();
        trackEvent('changeHandlingTools');
      }
    });
  };

  render() {
    const { cardType } = this.props;
    const {
      boilingMethod,
      disinfectionMethod,
      dryHotMethod,
      glasperlenovySterilizerMethod,
      hotSteamMethod,
      sterileOtherMethod,
      ultraSoundMethod,
      ultraVioletMethod,
    } = this.props.models;

    return (
      <View style={styles.container}>
        <ActivityIndicator position="absolute" />
        <ScrollView style={styles.inner}>
          {Platform.select({
            android: (
              <Label text={i18n.handlingTool} subText={i18n.specifyHowYouSterilizeTools} />
            ),
            ios: (
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{i18n.specifyHowYouSterilizeTools}</Text>
              </View>
            ),
          })}
          <View style={styles.sectionBlock}>
            <SubLabel customStyle={styles.subLabel} label={i18n.disinfection} />
            <Switch {...ultraSoundMethod} onChange={this.onChange} />
            <Switch {...ultraVioletMethod} onChange={this.onChange} />
            <Switch {...disinfectionMethod} onChange={this.onChange} customStyles={{ container: styles.lastSwitch }} />
          </View>
          <View style={styles.sectionSeparator} />
          <View style={styles.sectionBlock}>
            <SubLabel customStyle={styles.subLabel} label={i18n.handlingToolMethods.sterilization} />
            <Switch {...glasperlenovySterilizerMethod} onChange={this.onChange} />
            <Switch {...hotSteamMethod} onChange={this.onChange} />
            <Switch {...dryHotMethod} onChange={this.onChange} />
            <Switch {...boilingMethod} onChange={this.onChange} />
            <Switch {...sterileOtherMethod} onChange={this.onChange} />
            <Input
              value={sterileOtherMethod.description}
              placeholder={sterileOtherMethod.placeholder}
              modelName={sterileOtherMethod.modelName}
              editable={sterileOtherMethod.value}
              onChange={this.onChangeOtherMethod}
            />
          </View>
        </ScrollView>
        {cardType === 'create'
          ? <ButtonControl onPress={this.onNextPress} />
          : <EditControl
            onNextPress={this.onNextPress}
            onSavePress={this.onSavePress}
          />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    ...Platform.select({
      android: {
        paddingLeft: 15,
        paddingRight: 15,
      },
    }),
  },
  lastSwitch: {
    ...Platform.select({
      ios: {
        borderBottomWidth: 0,
      },
    }),
  },
  sectionBlock: {
    ...Platform.select({
      ios: {
        borderBottomWidth: 1,
        borderBottomColor: vars.color.cellSeparatorColorIOS,
        borderTopWidth: 1,
        borderTopColor: vars.color.cellSeparatorColorIOS,
        paddingLeft: 16,
      },
    }),
  },
  subLabel: {
    ...Platform.select({
      android: {
        height: 48,
      },
      ios: {
        borderBottomWidth: 1,
        borderBottomColor: vars.color.cellSeparatorColorIOS,
      },
    }),
  },
  sectionSeparator: {
    ...Platform.select({
      ios: {
        backgroundColor: vars.color.lightGrey,
        height: 10,
      },
    }),
  },
  title: {
    ...Platform.select({
      ios: {
        color: vars.color.grey,
        textAlign: 'center',
      },
    }),
  },
  titleContainer: {
    ...Platform.select({
      ios: {
        flex: 1,
        backgroundColor: vars.color.lightGrey,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      },
    }),
  },
});
