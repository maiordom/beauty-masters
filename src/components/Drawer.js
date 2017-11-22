import React, { Component } from 'react';
import RNDrawer from 'react-native-drawer';
import { DefaultRenderer } from 'react-native-router-flux';

import PhotoMaster from '../containers/PhotoMaster';
import WorkTimeSpecification from '../containers/WorkTimeSpecification';
import IntervalStartDate from '../containers/IntervalStartDate';
import Sidebar from '../containers/Sidebar';

import { drawerClose } from '../actions/Drawer';
import vars from '../vars';

export default class Drawer extends Component {
  onClose = () => {
    drawerClose();
  };

  render() {
    const state = this.props.navigationState;
    const children = state.children;
    const { contentKey, openDrawerOffset } = this.props;
    let content;

    switch (contentKey) {
      case 'PhotoMaster': content = <PhotoMaster {...this.props} />; break;
      case 'WorkTimeSpecification': content = <WorkTimeSpecification {...this.props} />; break;
      case 'IntervalStartDate': content = <IntervalStartDate {...this.props} />; break;
      default: content = <Sidebar {...this.props} />;
    }

    return (
      <RNDrawer
        type={'overlay'}
        captureGestures={'open'}
        open={state.open}
        content={content}
        openDrawerOffset={openDrawerOffset || 0}
        panCloseMask={0.2}
        negotiatePan
        tweenDuration={100}
        onClose={this.onClose}
        tweenHandler={ratio => ({
          main: {
            opacity: 1,
          },
          mainOverlay: {
            opacity: ratio / 2,
            backgroundColor: vars.color.black,
          },
        })}
      >
        <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
      </RNDrawer>
    );
  }
}
