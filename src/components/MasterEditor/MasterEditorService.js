// @flow

import React, { Component } from 'react';
import {
  InteractionManager,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import Tabs from '../Tabs';
import ButtonControl from '../ButtonControl';
import ServicesListManicure from '../ServicesListManicure';
import ServicesListPedicure from '../ServicesListPedicure';
import Label from '../Label';
import Input from '../Input';
import Modal from '../Modal';
import { FilterLabel } from '../FilterLabel';
import StateMachine from '../StateMachine';

import CustomServices from '../../containers/CustomServices';

import i18n from '../../i18n';
import vars from '../../vars';

const i18nContinue = Platform.select({
  ios: i18n.continue,
  android: i18n.continue.toUpperCase(),
});

const i18nFill = Platform.select({
  ios: i18n.fill,
  android: i18n.fill.toUpperCase(),
});

type TProps = {
  actions: Object,
  homeAllowanceField: Object,
  serviceManicure: Object,
  servicePedicure: Object,
};

type TState = {
  renderLoader: boolean,
  showAllFieldsRequiredModal: boolean,
  showFillPedicureSectionModal: boolean,
  tabActiveKey: string,
  tabs: Array<{ title: string, key: string, }>,
};

export default class MasterEditorService extends Component<void, TProps, TState> {
  state = {
    renderLoader: true,
    showAllFieldsRequiredModal: false,
    showFillPedicureSectionModal: false,
    tabActiveKey: 'serviceManicure',
    tabs: [
      { title: i18n.manicure, key: 'serviceManicure' },
      { title: i18n.pedicure, key: 'servicePedicure' },
    ],
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
    this.props.actions.validateServices().catch(({ type }) => {
      if (type === 'VALIDATION_ERRORS') {
        this.setState({ showAllFieldsRequiredModal: true });
      }

      if (type === 'FILL_PEDICURE_SECTION') {
        this.setState({ showFillPedicureSectionModal: true });
      }
    });
  };

  onValidationModalClose = () => {
    this.setState({ showAllFieldsRequiredModal: false });
  };

  onPedicureAttentionContinue = () => {
    this.setState({ showFillPedicureSectionModal: false });
    this.props.actions.next();
  };

  onPedicureAttentionFill = () => {
    this.setState({
      showFillPedicureSectionModal: false,
      tabActiveKey: 'servicePedicure',
    }, () => {
      this.scrollViewRef.scrollTo({ y: 0, animated: false });
    });
  };

  setScrollViewRef = ref => this.scrollViewRef = ref;

  render() {
    const {
      renderLoader,
      showAllFieldsRequiredModal,
      showFillPedicureSectionModal,
      tabActiveKey,
      tabs,
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

    return (
      <View style={styles.container}>
        <Modal isVisible={showAllFieldsRequiredModal}>
          <Text>{i18n.fillAllRequiredFields}</Text>
          <TouchableWithoutFeedback onPress={this.onValidationModalClose}>
            <View style={validationStyles.button}>
              <Text style={validationStyles.text}>OK</Text>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <Modal isVisible={showFillPedicureSectionModal}>
          <Text style={pedicureModalStyles.title}>{i18n.fillPedicureSection}</Text>
          <View style={pedicureModalStyles.row}>
            <TouchableWithoutFeedback onPress={this.onPedicureAttentionContinue}>
              <View style={pedicureModalStyles.button}>
                <Text style={pedicureModalStyles.text}>{i18nContinue}</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.onPedicureAttentionFill}>
              <View style={pedicureModalStyles.button}>
                <Text style={pedicureModalStyles.text}>{i18nFill}</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </Modal>
        <ScrollView ref={this.setScrollViewRef}>
          <Label text={i18n.yourServices} spacing />
          <Tabs tabs={tabs} tabActiveKey={tabActiveKey} onPress={this.onServicesPress} />
          <StateMachine visible={tabActiveKey === 'servicePedicure'}>
            <ServicesListPedicure models={servicePedicure} {...filterHandlers} />
          </StateMachine>
          <StateMachine visible={tabActiveKey === 'serviceManicure'}>
            <ServicesListManicure models={serviceManicure} {...filterHandlers} />
          </StateMachine>
          <Input {...homeAllowanceField} inputWrapperStyle={styles.homeAllowance} />
          <FilterLabel text={i18n.filters.otherServices} />
          <StateMachine visible={tabActiveKey === 'servicePedicure'}>
            <CustomServices key="pedicure" type="pedicure" />
          </StateMachine>
          <StateMachine visible={tabActiveKey === 'serviceManicure'}>
            <CustomServices key="manicure" type="manicure" />
          </StateMachine>
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
});

const validationStyles = StyleSheet.create({
  button: {
    marginTop: 15,
    alignItems: 'flex-end',
  },
  text: {
    color: vars.color.red,
  },
});

const pedicureModalStyles = StyleSheet.create({
  title: {
    lineHeight: 25,
  },
  button: {
    marginTop: 15,
    marginLeft: 15,
  },
  text: {
    color: vars.color.red,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
