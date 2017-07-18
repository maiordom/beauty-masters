// @flow

import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, InteractionManager, Text, TouchableWithoutFeedback } from 'react-native';

import Tabs from '../Tabs';
import ButtonControl from '../ButtonControl';
import ServicesListManicure from '../ServicesListManicure';
import ServicesListPedicure from '../ServicesListPedicure';
import Label from '../Label';
import Input from '../Input';
import Modal from '../Modal';
import { FilterLabel } from '../FilterLabel';

import CustomServices from '../../containers/CustomServices';

import i18n from '../../i18n';
import vars from '../../vars';

type Props = {
  actions: Object,
  homeAllowanceField: Object,
  serviceManicure: Object,
  servicePedicure: Object,
};

export default class MasterEditorService extends Component {
  props: Props;

  state = {
    tabActiveKey: 'serviceManicure',
    tabs: [
      { title: i18n.manicure, key: 'serviceManicure' },
      { title: i18n.pedicure, key: 'servicePedicure' },
    ],
    renderLoader: true,
  };

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ renderLoader: false });
    });
  }

  onServicesPress = (item: Object) => {
    this.setState({ tabActiveKey: item.key });
  };

  onChange = (active: boolean, modelName: string) => {
    this.props.actions.toogleService(modelName, 'active', active, this.state.tabActiveKey);
  };

  onChangePrice = (price: number, modelName: string) => {
    this.props.actions.setServiceParam(modelName, 'price', Number(price), this.state.tabActiveKey);
  };

  onChangeDuration = (duration: string, modelName: string) => {
    this.props.actions.setServiceParam(modelName, 'duration', duration, this.state.tabActiveKey);
  };

  onPressNext = () => {
    this.props.actions.validateServices().catch(() => {
      this.setState({ showAllFieldsRequiredModal: true });
    });
  };

  onModalClose = () => {
    this.setState({ showAllFieldsRequiredModal: false });
  };

  render() {
    const {
      renderLoader,
      showAllFieldsRequiredModal,
      tabs,
      tabActiveKey,
    } = this.state;

    if (renderLoader) {
      return null;
    }

    const {
      serviceManicure,
      servicePedicure,
      homeAllowanceField,
    } = this.props;

    const {
      onChange,
      onChangeDuration,
      onChangePrice,
    } = this;

    const filterHandlers = {
      onChange,
      onChangeDuration,
      onChangePrice,
    };

    let servicesList = null;
    let customServices = null;

    if (tabActiveKey === 'servicePedicure') {
      servicesList = <ServicesListPedicure models={servicePedicure} {...filterHandlers} />;
      customServices = <CustomServices key="pedicure" type="pedicure" />;
    } else {
      servicesList = <ServicesListManicure models={serviceManicure} {...filterHandlers} />;
      customServices = <CustomServices key="manicure" type="manicure" />;
    }

    return (
      <View style={styles.container}>
        {showAllFieldsRequiredModal && (
          <Modal>
            <Text>{i18n.fillAllRequiredFields}</Text>
            <TouchableWithoutFeedback onPress={this.onModalClose}>
              <View style={styles.applyButton}>
                <Text style={styles.applyButtonText}>OK</Text>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        )}
        <ScrollView>
          <Label text={i18n.yourServices} spacing />
          <Tabs tabs={tabs} onPress={this.onServicesPress} />
          {servicesList}
          <Input {...homeAllowanceField} inputWrapperStyle={styles.homeAllowance} />
          <FilterLabel text={i18n.filters.otherServices} />
          {customServices}
        </ScrollView>
        <ButtonControl onPress={this.onPressNext} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  homeAllowance: {
    paddingLeft: 11,
    marginBottom: 4,
  },
  applyButton: {
    marginTop: 15,
    alignItems: 'flex-end',
  },
  applyButtonText: {
    color: vars.color.red,
  }
});
