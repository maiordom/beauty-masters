import React, { Component } from 'react';
import RNDrawer from 'react-native-drawer';
import { DefaultRenderer } from 'react-native-router-flux';
import { Text } from 'react-native';

import PhotoMaster from '../containers/PhotoMaster';
import WorkTimeSpecification from '../containers/WorkTimeSpecification';
import IntervalStartDate from '../containers/IntervalStartDate';

import { drawerClose } from '../actions/drawer';
import { hexToRgba } from '../utils';
import vars from '../vars';

export default class Drawer extends Component {
  onClose = () => {
    drawerClose();
  };

  render() {
    const state = this.props.navigationState;
    const children = state.children;
    const { contentKey } = this.props;
    let content;

    switch (contentKey) {
      case 'PhotoMaster': content = <PhotoMaster {...this.props} />; break;
      case 'WorkTimeSpecification': content = <WorkTimeSpecification {...this.props} />; break;
      case 'IntervalStartDate': content = <IntervalStartDate {...this.props} />; break;
    }

    return (
      <RNDrawer
        ref="navigation"
        type="overlay"
        styles={{ drawer: {
          backgroundColor: hexToRgba(vars.color.black, 40),
        } }}
        captureGestures="closed"
        open={state.open}
        content={content}
        openDrawerOffset={0}
        panCloseMask={0.7}
        negotiatePan
        tweenDuration={100}
        onClose={this.onClose}
        tweenHandler={ratio => ({
          main: {
            opacity: Math.max(0.54, 1 - ratio),
          },
        })}
      >
        <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
      </RNDrawer>
    );
  }
}
