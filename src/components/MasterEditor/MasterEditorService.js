// @flow

import React, { Component } from 'react';
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

const sections = {
  serviceManicure: 'serviceManicure',
  servicePedicure: 'servicePedicure',
};

export default class MasterEditorService extends Component<TProps, TState> {
  state = {
    renderLoader: true,
    showAllFieldsRequiredModal: false,
    showFillPedicureSectionModal: false,
    tabActiveKey: 'serviceManicure',
    tabs: [
      { title: i18n.manicure, key: sections.serviceManicure },
      { title: i18n.pedicure, key: sections.servicePedicure },
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
          this.props.actions.routeToHandlingTools();
        } else {
          this.props.actions.routeToProfile();
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
      tabActiveKey: sections.servicePedicure,
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
          <Text style={validationStyles.alertText}>{i18n.fillAllRequiredFields}</Text>
          <TouchableWithoutFeedback onPress={this.onValidationModalClose}>
            <View style={validationStyles.button}>
              <Text style={validationStyles.text}>{i18n.ok}</Text>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <Modal isVisible={showFillPedicureSectionModal}>
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
          android: (<View>
            <Label text={i18n.yourServices} spacing />
            <Tabs tabs={tabs} tabActiveKey={tabActiveKey} onPress={this.onServicesPress} />
          </View>),
          ios: (<View style={styles.segmentContainer}>
            <SegmentedControlIOS
              values={tabs.map(tab => tab.title)}
              selectedIndex={findIndex(tabs, tab => tab.key === tabActiveKey)}
              onChange={(event) => {
                const activeTab = this.state.tabs[event.nativeEvent.selectedSegmentIndex];
                this.setState({ tabActiveKey: activeTab.key });
              }}
              tintColor={vars.color.red}
            />
          </View>),
        })}
        <ScrollView ref={this.setScrollViewRef} style={styles.inner}>
          <StateMachine visible={tabActiveKey === sections.servicePedicure}>
            <ServicesListPedicure models={servicePedicure} {...filterHandlers} />
          </StateMachine>
          <StateMachine visible={tabActiveKey === sections.serviceManicure}>
            <ServicesListManicure models={serviceManicure} {...filterHandlers} />
          </StateMachine>
          <Input
            {...homeAllowanceField}
            inputWrapperStyle={styles.homeAllowance}
            onBlur={this.onChangeAtHome}
          />
          <FilterLabel text={i18n.filters.otherServices} style={[styles.sectionTitle, styles.sectionPadding]} />
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
  homeAllowance: {
    paddingLeft: 11,
    ...Platform.select({
      android: {
        marginBottom: 4,
      },
      ios: {
        borderTopWidth: 10,
        borderColor: vars.color.cellSeparatorColorIOS,
        borderBottomWidth: 0,
      },
    }),
  },
  sectionTitle: {
    ...Platform.select({
      ios: {
        backgroundColor: vars.color.white,
      },
    }),
  },
  sectionPadding: {
    ...Platform.select({
      ios: {
        borderTopWidth: 10,
        borderColor: vars.color.cellSeparatorColorIOS,
      },
    }),
  },
  segmentContainer: {
    padding: 8,
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
