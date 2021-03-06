// @flow

import React, { PureComponent } from 'react';
import {
  InteractionManager,
  Platform,
  ScrollView,
  SegmentedControlIOS,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import findIndex from 'lodash/findIndex';
import each from 'lodash/each';

import { formatNumber } from '../../utils';

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
  homeDepartureField: Object,
  isSalon: boolean,
  manicureCustomServices: Object,
  pedicureCustomServices: Object,
  serviceManicure: Object,
  servicePedicure: Object,
};

type TState = {
  allFieldsRequired: boolean,
  fillPedicureSection: boolean,
  renderLoader: boolean,
  tabActiveKey: string,
  tabs: Array<{ title: string, key: string, }>,
};

const sections = {
  serviceManicure: 'serviceManicure',
  servicePedicure: 'servicePedicure',
};

export default class MasterEditorService extends PureComponent<TProps, TState> {
  state = {
    allFieldsRequired: false,
    fillPedicureSection: false,
    renderLoader: true,
    tabActiveKey: 'serviceManicure',
    tabs: [
      { title: i18n.manicure, key: sections.serviceManicure },
      { title: i18n.pedicure, key: sections.servicePedicure },
    ],
  };

  constructor(props) {
    super(props);

    this.actionPressedName = 'unknown';
  }

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

    if (item.key === sections.serviceManicure) {
      return;
    }

    if (this.props.isSalon) {
      trackEvent('step2SalonSelectPedicure');
    } else {
      trackEvent('step2PrivateSelectPedicure');
    }
  };

  onChange = (active: boolean, modelName: string) => {
    this.props.actions.toggleService(modelName, 'active', active, this.state.tabActiveKey);
  };

  onChangePrice = (price: number, modelName: string) => {
    this.props.actions.setServiceParam(modelName, 'price', price, this.state.tabActiveKey);
  };

  onAtHomeChange = (price: string, modelName: string) => {
    this.props.actions.setServiceParam(modelName, 'price', Number(price), 'services');
  };

  onChangeDuration = (duration: string, modelName: string) => {
    this.props.actions.setServiceParam(modelName, 'duration', duration, this.state.tabActiveKey);
  };

  onValidationError = ({ type }) => {
    if (type === 'VALIDATION_ERRORS') {
      this.setState({ allFieldsRequired: true });
    }

    if (type === 'FILL_PEDICURE_SECTION') {
      this.setState({ fillPedicureSection: true });
    }
  };

  createServices = () =>
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
            trackEvent('step2PrivatePedicureCustomServicesCount', { labelValue: this.getActiveModelsCount(this.props.pedicureCustomServices.items) });
          }
        } else {
          trackEvent('changeServices');
        }
      }

      return res;
    });

  onNextPress = () => {
    this.actionPressedName = 'next';
    this.props.actions.validateServices()
      .then(this.props.actions.routeToHandlingTools)
      .catch(this.onValidationError);
  };

  onSavePress = () => {
    this.actionPressedName = 'save';
    this.props.actions.validateServices()
      .then(this.createServices)
      .then((res) => {
        if (res.result === 'success') {
          if (this.props.cardType === 'create') {
            this.props.actions.routeToHandlingTools();
          } else {
            this.props.actions.routeToProfile();
          }
        }
      })
      .catch(this.onValidationError);
  };

  onValidationModalClose = () => {
    this.setState({ allFieldsRequired: false });
  };

  onPedicureAttentionContinue = () => {
    this.setState({ fillPedicureSection: false });
    this.createServices().then((res) => {
      if (this.props.cardType === 'create') {
        this.props.actions.routeToHandlingTools();
      } else {
        if (this.actionPressedName === 'next') {
          this.props.actions.routeToHandlingTools();
        } else {
          this.props.actions.routeToProfile();
        }
      }
    });
  };

  onPedicureAttentionFill = () => {
    this.setState({
      fillPedicureSection: false,
      tabActiveKey: sections.servicePedicure,
    }, () => {
      this.scrollViewRef.scrollTo({ y: 0, animated: false });
    });
  };

  setScrollViewRef = (ref: any) => (this.scrollViewRef = ref);

  render() {
    const {
      renderLoader,
      allFieldsRequired,
      fillPedicureSection,
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
      homeDepartureField,
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
        <Modal isVisible={allFieldsRequired}>
          <Text style={validationStyles.alertText}>{i18n.fillAllRequiredFields}</Text>
          <TouchableWithoutFeedback onPress={this.onValidationModalClose}>
            <View style={validationStyles.button}>
              <Text style={validationStyles.text}>{i18n.ok}</Text>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <Modal isVisible={fillPedicureSection}>
          <Text style={pedicureModalStyles.title}>{i18n.fillPedicureSection}</Text>
          <View style={pedicureModalStyles.buttonsContainer}>
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
        {Platform.select({
          android: (
            <View>
              <Label text={i18n.yourServices} spacing />
              <Tabs tabs={tabs} tabActiveKey={tabActiveKey} onPress={this.onServicesPress} />
            </View>
          ),
          ios: (
            <View style={styles.segmentContainer}>
              <SegmentedControlIOS
                values={tabs.map(tab => tab.title)}
                selectedIndex={findIndex(tabs, tab => tab.key === tabActiveKey)}
                onChange={(event) => {
                  const activeTab = this.state.tabs[event.nativeEvent.selectedSegmentIndex];
                  this.setState({ tabActiveKey: activeTab.key });
                }}
                tintColor={vars.color.red}
              />
            </View>
          ),
        })}
        <ScrollView ref={this.setScrollViewRef} style={styles.inner}>
          <StateMachine visible={tabActiveKey === sections.servicePedicure}>
            <ServicesListPedicure models={servicePedicure} {...filterHandlers} />
          </StateMachine>
          <StateMachine visible={tabActiveKey === sections.serviceManicure}>
            <ServicesListManicure models={serviceManicure} {...filterHandlers} />
          </StateMachine>
          <View style={styles.sectionPadding} />
          <Input
            {...homeDepartureField}
            debounce
            debounceTimer={500}
            formatValue={formatNumber}
            inputWrapperStyle={styles.homeDeparture}
            keyboardType="numeric"
            onChange={this.onAtHomeChange}
            replaceReg={/[^0-9]/g}
            sign={` ${i18n.currency.roubleSign}`}
            value={homeDepartureField.price}
          />
          <View style={styles.sectionPadding} />
          <FilterLabel text={i18n.filters.otherServices} style={styles.sectionTitle} />
          <StateMachine visible={tabActiveKey === sections.servicePedicure}>
            <CustomServices key="pedicure" type="pedicure" />
          </StateMachine>
          <StateMachine visible={tabActiveKey === sections.serviceManicure}>
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
  homeDeparture: {
    paddingLeft: 11,
    ...Platform.select({
      android: {
        marginBottom: 4,
      },
      ios: {
        borderTopWidth: 1,
        borderColor: vars.color.cellSeparatorColorIOS,
        borderBottomWidth: 1,
      },
    }),
  },
  sectionTitle: {
    ...Platform.select({
      ios: {
        backgroundColor: vars.color.white,
        borderTopWidth: 1,
        borderColor: vars.color.cellSeparatorColorIOS,
      },
    }),
  },
  sectionPadding: {
    ...Platform.select({
      ios: {
        borderTopWidth: 10,
        borderColor: vars.color.lightGrey,
      },
    }),
  },
  segmentContainer: {
    paddingTop: 8,
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 8,
  },
});

const validationStyles = StyleSheet.create({
  alertText: {
    ...Platform.select({
      ios: {
        padding: 16,
      },
    }),
  },
  button: {
    ...Platform.select({
      android: {
        marginTop: 15,
        alignItems: 'flex-end',
      },
      ios: {
        borderTopWidth: 1,
        borderColor: vars.color.cellSeparatorColorIOS,
        alignItems: 'center',
        padding: 12,
      },
    }),
  },
  text: {
    ...Platform.select({
      android: {
        color: vars.color.red,
      },
      ios: {
        color: vars.color.blue,
      },
    }),
  },
});

const pedicureModalStyles = StyleSheet.create({
  title: {
    ...Platform.select({
      android: {
        lineHeight: 25,
      },
      ios: {
        padding: 16,
      },
    }),
  },
  button: {
    ...Platform.select({
      android: {
        marginTop: 15,
        marginLeft: 15,
      },
      ios: {
        borderTopWidth: 1,
        borderColor: vars.color.cellSeparatorColorIOS,
        alignItems: 'center',
        padding: 12,
      },
    }),
  },
  text: {
    ...Platform.select({
      android: {
        color: vars.color.red,
      },
      ios: {
        color: vars.color.blue,
      },
    }),
  },
  buttonsContainer: {
    ...Platform.select({
      android: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
      },
    }),
  },
});
