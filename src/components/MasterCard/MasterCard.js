// @flow

import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  InteractionManager,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Gallery from 'react-native-gallery';

import ImagePlaceholder from '../ImagePlaceholder';
import Fade from '../Fade';

import MasterCardEquipment from './MasterCardEquipment';
import MasterCardHeader from './MasterCardHeader';
import MasterCardNavBar from './MasterCardNavBar';
import MasterCardSchedule from './MasterCardSchedule';
import MasterCardServices from './MasterCardServices';
import MasterCardWorks from './MasterCardWorks';

import ButtonControl from '../ButtonControl';

import i18n from '../../i18n';
import vars from '../../vars';

import type { MasterCardType, TMapCard } from '../../types/MasterTypes';

const icons = Platform.select({
  android: {
    back: require('../../icons/android/back-arrow.png'),
  },
  ios: {},
});

type DefaultProps = {
  addresses: Array<void>,
  workPhoto: Array<void>,
};

type Props = MasterCardType & {
  actions: Object,
  addresses?: Array<*>,
  snippet: TMapCard,
};

type State = {
  showWorksGallery: boolean,
  showWorksIndex: number,
  scrollViewHeight: 0,
  listHeight: 0,
  showFirstGroup: boolean,
  showSecondGroup: boolean,
};

export default class MasterCard extends Component<DefaultProps, Props, State> {
  static defaultProps = {
    addresses: [],
    workPhoto: [],
  };

  state = {
    showWorksGallery: false,
    showWorksIndex: 0,
    scrollViewHeight: 0,
    listHeight: 0,
    showFirstGroup: false,
    showSecondGroup: false,
  };

  scrollViewRef: ScrollView;

  componentDidMount() {
    const { actions, id } = this.props;
    actions.getMasterById(id);

    InteractionManager.runAfterInteractions(() => this.renderComponents());
  }

  onWorksShow = (index: string) => {
    this.setState({
      showWorksGallery: true,
      showWorksIndex: Number(index),
    });
  };

  onWorksHide = () => this.setState({ showWorksGallery: false });

  scrollToEnd = () => InteractionManager.runAfterInteractions(() => {
    const bottomOfList = this.state.listHeight - this.state.scrollViewHeight;

    this.scrollViewRef.scrollTo({ y: bottomOfList, animated: true });
  });

  renderComponents = () => {
    const components = ['showFirstGroup', 'showSecondGroup'];

    for (let i = 0; i < components.length; i++) {
      setTimeout(() => this.setState({ [components[i]]: true }), i * 50);
    }
  };

  render() {
    const {
      actions,
      addresses,
      handlingTools,
      id,
      isFavorite,
      masterPhoto,
      services,
      snippet,
      workPhoto,
    } = this.props;

    const {
      showWorksGallery,
      showWorksIndex,
      showFirstGroup,
      showSecondGroup,
    } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView
          ref={component => (this.scrollViewRef = component)}
          style={styles.content}
          onContentSizeChange={(_, contentHeight) => this.setState({ listHeight: contentHeight })}
          onLayout={e => this.setState({ scrollViewHeight: e.nativeEvent.layout.height })}
        >
          <Fade visible={showFirstGroup}>
            <View>
              <ImagePlaceholder
                source={{ uri: masterPhoto }}
                placeholder={require('../../icons/android/master-empty.png')}
                style={{ height: 260, width: Dimensions.get('window').width }}
              />
              <MasterCardNavBar
                id={id}
                actions={actions}
                snippet={snippet}
                isFavorite={isFavorite}
              />
              <MasterCardHeader {...this.props} />
            </View>
            {workPhoto && workPhoto.length > 0 && (
              <MasterCardWorks
                onWorksShow={this.onWorksShow}
                workPhoto={workPhoto}
              />
            )}
            {services && services.length > 0 && (
              <MasterCardServices services={services} />
            )}
          </Fade>
          <Fade visible={showSecondGroup}>
            {handlingTools && handlingTools.length > 0 && (
              <MasterCardEquipment services={handlingTools} />
            )}
            {addresses && addresses.length > 0 && (
              <MasterCardSchedule
                addresses={addresses}
                scrollToEnd={this.scrollToEnd}
              />
            )}
          </Fade>
        </ScrollView>
        <ButtonControl
          label={i18n.call}
          type="green"
          customStyles={{ nextButton: styles.callButton }}
          onPress={() => {}}
        />
        {showWorksGallery && (
          <View style={styles.gallery}>
            <Gallery initialPage={showWorksIndex} images={workPhoto} />
            <TouchableOpacity
              activeOpacity={1}
              onPress={this.onWorksHide}
              style={styles.galleryNavBar}
            >
              <Image source={icons.back} />
              <Text style={styles.galleryBack}>{i18n.masterWorks}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  content: {
    alignSelf: 'stretch',
    backgroundColor: vars.color.white,
  },
  gallery: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    backgroundColor: 'black',
  },
  galleryNavBar: {
    position: 'absolute',
    flexDirection: 'row',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 16,
    paddingLeft: 16,
    height: 60,
    backgroundColor: 'black',
  },
  galleryBack: {
    marginLeft: 32,
    fontSize: 20,
    color: vars.color.white,
  },
  call: {
    alignSelf: 'stretch',
  },
  callButton: {
    backgroundColor: vars.color.green,
  },
});
