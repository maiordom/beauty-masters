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

import each from 'lodash/each';

import { FilterLabel } from '../FilterLabel';
import ActivityIndicator from '../../containers/ActivityIndicator';
import ButtonControl from '../ButtonControl';
import CustomServices from '../../containers/CustomServices';
import Input from '../Input';
import Label from '../Label';
import Modal from '../Modal';
import ServicesListManicure from '../ServicesListManicure';
import ServicesListPedicure from '../ServicesListPedicure';
import StateMachine from '../StateMachine';
import Tabs from '../Tabs';
import EditControl from '../EditControl';

import i18n from '../../i18n';
import vars from '../../vars';
import { trackEvent } from '../../utils/Tracker';

const localization = {
  continue: Platform.select({
    ios: i18n.continue,
    android: i18n.continue.toUpperCase(),
  }),
  fill: Platform.select({
    ios: i18n.fill,
    android: i18n.fill.toUpperCase(),
  }),
};

type TProps = {
  actions: Object,
  cardType: string,
  homeAllowanceField: Object,
  isSalon: boolean,
  manicureCustomServices: Object,
  pedicureCustomServices: Object,
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

export default class MasterEditorService extends Component<TProps, TState> {
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

  scrollViewRef: any;

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      if (this.props.cardType === 'edit') {
        this.props.actions.getServices().then((res) => {
          if (!res.error) {
            this.setState({ renderLoader: false });
          }
        });
      } else {
        this.setState({ renderLoader: false });
      }
    });
  }

  getActiveModelsCount = (modelsCollection) => {
    let activeCount = 0;

    each(modelsCollection, (model) => {
      if (model.active) {
        activeCount++;
      }
    });

    return activeCount;
  }

  onServicesPress = (item: Object) => {
    this.setState({ tabActiveKey: item.key });
  };

  onChange = (active: boolean, modelName: string) => {
    this.props.actions.toggleService(modelName, 'active', active, this.state.tabActiveKey);
  };

  onChangePrice = (price: number, modelName: string) => {
    this.props.actions.setServiceParam(modelName, 'price', Number(price), this.state.tabActiveKey);
  };

  onChangeAtHome = (price: string, modelName: string) => {
    this.props.actions.setServiceParam(modelName, 'price', Number(price), 'services');
  };

  onChangeDuration = (duration: string, modelName: string) => {
    this.props.actions.setServiceParam(modelName, 'duration', duration, this.state.tabActiveKey);
  };

  onValidationError = ({ type }) => {
    if (type === 'VALIDATION_ERRORS') {
      this.setState({ showAllFieldsRequiredModal: true });
    }

    if (type === 'FILL_PEDICURE_SECTION') {
      this.setState({ showFillPedicureSectionModal: true });
    }
  };

  onNextPress = () => {
    this.props.actions.validateServices()
      .then(this.props.actions.routeToHandlingTools)
      .catch(this.onValidationError);
  };

  createServices = () => {
    this.props.actions.createMasterServices().then((res) => {
      if (res.result === 'success') {
        if (this.props.cardType === 'create') {
          if (this.props.isSalon) {
            trackEvent('step2Salon');
            trackEvent('step2SalonManicureServicesCount', { labelValue: this.getActiveModelsCount(this.props.serviceManicure) });
            trackEvent('step2SalonPedicureServicesCount', { labelValue: this.getActiveModelsCount(this.props.servicePedicure) });
            trackEvent('step2SalonManicureCustomServicesCount', { labelValue: this.getActiveModelsCount(this.props.manicureCustomServices.items) });
            trackEvent('step2SalonPedicureCustomServicesCount', { labelValue: this.getActiveModelsCount(this.props.pedicureCustomServices.items) });
          } else {
            trackEvent('step2Private');
            trackEvent('step2PrivateManicureServicesCount', { labelValue: this.getActiveModelsCount(this.props.serviceManicure) });
            trackEvent('step2PrivatePedicureServicesCount', { labelValue: this.getActiveModelsCount(this.props.servicePedicure) });
            trackEvent('step2PrivateManicureCustomServicesCount', { labelValue: this.getActiveModelsCount(this.props.manicureCustomServices.items) });
            trackEvent('step2PrivatePedicureCustomServicesCount', { labelValue: this.getActiveModelsCount(this.props.services.pedicureCustomServices.items) });
          }
          this.props.actions.routeToHandlingTools();
        } else {
          this.props.actions.routeToProfile();
          trackEvent('changeServices');
        }
      }
    });
  }

  onSavePress = () => {
    this.props.actions.validateServices()
      .then(this.createServices)
      .catch(this.onValidationError);
  };

  onValidationModalClose = () => {
    this.setState({ showAllFieldsRequiredModal: false });
  };

  onPedicureAttentionContinue = () => {
    this.setState({ showFillPedicureSectionModal: false });
    this.createServices();
  };

  onPedicureAttentionFill = () => {
    this.setState({
      showFillPedicureSectionModal: false,
      tabActiveKey: 'servicePedicure',
    }, () => {
      this.scrollViewRef.scrollTo({ y: 0, animated: false });
    });
  };

  setScrollViewRef = (ref: any) => (this.scrollViewRef = ref);

  render() {
    const {
      renderLoader,
      showAllFieldsRequiredModal,
      showFillPedicureSectionModal,
      tabActiveKey,
      tabs,
    } = this.state;

    if (renderLoader) {
      return (
        <View style={styles.container}>
          <ActivityIndicator animating position="absolute" />
        </View>
      );
    }

    const {
      cardType,
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
        <ActivityIndicator position="absolute" />
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
                <Text style={pedicureModalStyles.text}>{localization.continue}</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.onPedicureAttentionFill}>
              <View style={pedicureModalStyles.button}>
                <Text style={pedicureModalStyles.text}>{localization.fill}</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </Modal>
        <ScrollView ref={this.setScrollViewRef} style={styles.inner}>
          <Label text={i18n.yourServices} spacing />
          <Tabs tabs={tabs} tabActiveKey={tabActiveKey} onPress={this.onServicesPress} />
          <StateMachine visible={tabActiveKey === 'servicePedicure'}>
            <ServicesListPedicure models={servicePedicure} {...filterHandlers} />
          </StateMachine>
          <StateMachine visible={tabActiveKey === 'serviceManicure'}>
            <ServicesListManicure models={serviceManicure} {...filterHandlers} />
          </StateMachine>
          <Input
            {...homeAllowanceField}
            inputWrapperStyle={styles.homeAllowance}
            onBlur={this.onChangeAtHome}
          />
          <FilterLabel text={i18n.filters.otherServices} />
          <StateMachine visible={tabActiveKey === 'servicePedicure'}>
            <CustomServices key="pedicure" type="pedicure" />
          </StateMachine>
          <StateMachine visible={tabActiveKey === 'serviceManicure'}>
            <CustomServices key="manicure" type="manicure" />
          </StateMachine>
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
