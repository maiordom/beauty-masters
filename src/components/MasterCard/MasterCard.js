// @flow

import React, { PureComponent } from 'react';
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
  Linking,
} from 'react-native';
import Gallery from 'react-native-gallery';

import isEmpty from 'lodash/isEmpty';

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
import { trackEvent } from '../../utils/Tracker';

import type { MasterCardType, TMapCard } from '../../types/MasterTypes';

const icons = Platform.select({
  android: {
    back: require('../../icons/android/back-arrow.png'),
  },
  ios: {
    back: require('../../icons/ios/back-arrow.png'),
  },
});

icons.masterEmptyPhoto = require('../../icons/android/master-empty.png');

type TProps = MasterCardType & {
  actions: Object,
  addresses?: Array<*>,
  from: 'map' | 'serp',
  snippet: TMapCard,
};

type TState = {
  listHeight: 0,
  renderContent: boolean,
  scrollViewHeight: 0,
  showFirstGroup: boolean,
  showSecondGroup: boolean,
  showWorksGallery: boolean,
  showWorksIndex: number,
};

export default class MasterCard extends PureComponent<TProps, TState> {
  static defaultProps = {
    addresses: [],
    workPhoto: [],
  };

  state = {
    listHeight: 0,
    renderContent: false,
    scrollViewHeight: 0,
    showFirstGroup: false,
    showSecondGroup: false,
    showWorksGallery: false,
    showWorksIndex: 0,
  };

  scrollViewRef: ScrollView;

  componentDidMount() {
    this.props.actions.getMasterById(this.props.id).then((res) => {
      if (!res.error) {
        this.props.actions.getAddresses(this.props.id);
      }
    });

    InteractionManager.runAfterInteractions(() => {
      this.setState({ renderContent: true });
      this.renderComponents();
    });
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

  makeCall = (phone: string) => {
    switch (this.props.from) {
      case 'map': { trackEvent('callPhoneFromMap'); break; }
      case 'serp': { trackEvent('callPhoneFromSerp'); break; }
    }

    Linking
      .openURL(`tel:${phone}`)
      .catch((error) => {
        console.log(`MasterCard::makeCall::${error}`);
      });
  };

  onSocialIconTap = (url: string) => {
    Linking.openURL(url);
  };

  renderComponents = () => {
    const components = ['showFirstGroup', 'showSecondGroup'];

    for (let i = 0; i < components.length; i++) {
      setTimeout(() => this.setState({ [components[i]]: true }), i * 50);
    }
  };

  setContainerRef = (ref: any) => {
    this.scrollViewRef = ref;
  };

  render() {
    const {
      actions,
      addresses,
      handlingTools,
      id,
      isFavorite,
      isSalon,
      masterPhotos,
      salonName,
      groupedServices,
      homeDepartureService,
      snippet,
      username,
      workPhotos,
      phone,
    } = this.props;

    const {
      renderContent,
      showWorksGallery,
      showWorksIndex,
      showFirstGroup,
      showSecondGroup,
    } = this.state;

    if (!renderContent) {
      return null;
    }

    const masterPhotoUri = (masterPhotos && masterPhotos.length > 0)
      ? { uri: masterPhotos[0].sizes.m }
      : null;

    const masterPhoto = masterPhotoUri || icons.masterEmptyPhoto;

    return (
      <View style={styles.container}>
        <ScrollView
          ref={this.setContainerRef}
          style={styles.content}
          onContentSizeChange={(_, contentHeight) => this.setState({ listHeight: contentHeight })}
          onLayout={e => this.setState({ scrollViewHeight: e.nativeEvent.layout.height })}
        >
          <Fade visible={showFirstGroup}>
            <View>
              <ImagePlaceholder
                source={masterPhoto}
                placeholder={icons.masterEmptyPhoto}
                style={styles.masterPhoto}
              />
              <MasterCardNavBar
                id={id}
                actions={actions}
                snippet={snippet}
                isFavorite={isFavorite}
              />
              <MasterCardHeader {...this.props} onSocialIconTap={this.onSocialIconTap} />
            </View>
            {workPhotos && workPhotos.length > 0 && (
              <MasterCardWorks
                onWorksShow={this.onWorksShow}
                workPhotos={workPhotos}
              />
            )}
            {groupedServices && groupedServices.length > 0 && (
              <MasterCardServices
                homeDepartureService={homeDepartureService}
                services={groupedServices}
              />
            )}
          </Fade>
          <Fade visible={showSecondGroup}>
            {handlingTools && handlingTools.length > 0 && (
              <MasterCardEquipment services={handlingTools} />
            )}
            {addresses && addresses.length > 0 && (
              <MasterCardSchedule
                addresses={addresses}
                isSalon={isSalon}
                masterPhoto={masterPhotoUri}
                salonName={salonName}
                scrollToEnd={this.scrollToEnd}
                username={username}
              />
            )}
          </Fade>
        </ScrollView>
        {!isEmpty(phone) && <ButtonControl
          label={i18n.call}
          type="green"
          customStyles={{ nextButton: styles.callButton }}
          onPress={() => { this.makeCall(phone); }}
        />}
        {showWorksGallery && (
          <View style={styles.gallery}>
            <Gallery
              initialPage={showWorksIndex}
              images={workPhotos.map((photo) => photo.sizes.m)}
            />
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
  masterPhoto: {
    width: Dimensions.get('window').width,
    ...Platform.select({
      android: { height: 260 },
      ios: { height: 240 },
    }),
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
