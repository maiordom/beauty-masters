import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import Tabs from '../Tabs';
import ButtonControl from '../ButtonControl';
import ServicesListManicure from '../ServicesListManicure';
import ServicesListPedicure from '../ServicesListPedicure';
import Label from '../Label';
import Input from '../Input';
import { FilterLabel } from '../FilterLabel';

import CustomServices from '../../containers/CustomServices';

import i18n from '../../i18n';

export default class MasterEditorService extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabActiveKey: 'serviceManicure',
      tabs: [
        { title: i18n.manicure, key: 'serviceManicure' },
        { title: i18n.pedicure, key: 'servicePedicure' },
      ],
    };
  }

  onServicesPress = item => {
    this.setState({ tabActiveKey: item.key });
  };

  onChange = (active, modelName) => {
    this.props.actions.toogleService(modelName, 'active', active, this.state.tabActiveKey);
  };

  onChangePrice = (price, modelName) => {
    this.props.actions.setServiceParam(modelName, 'price', Number(price), this.state.tabActiveKey);
  };

  onChangeDuration = (duration, modelName) => {
    this.props.actions.setServiceParam(modelName, 'duration', duration, this.state.tabActiveKey);
  };

  render() {
    const { tabs, tabActiveKey } = this.state;
    const {
      serviceManicure,
      servicePedicure,
      homeAllowanceField,
    } = this.props;
    const { onChange, onChangePrice, onChangeDuration } = this;
    const filterHandlers = {
      onChange,
      onChangePrice,
      onChangeDuration,
    };
    let servicesList = null;
    let customServices = null;

    if (tabActiveKey === 'servicePedicure') {
      servicesList = <ServicesListPedicure {...servicePedicure} {...filterHandlers} />;
      customServices = <CustomServices type="pedicure" />;
    } else {
      servicesList = <ServicesListManicure {...serviceManicure} {...filterHandlers} />;
      customServices = <CustomServices type="manicure" />;
    }

    return (
      <View style={styles.container}>
        <ScrollView>
          <Label text={i18n.yourServices} spacing />
          <Tabs tabs={tabs} onPress={this.onServicesPress} />
          {servicesList}
          <Input {...homeAllowanceField} inputWrapperStyle={styles.homeAllowance} />
          <FilterLabel text={i18n.filters.otherServices} />
          {customServices}
          <ButtonControl onPress={this.props.onNextPress} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  homeAllowance: {
    marginBottom: 4,
  },
});
