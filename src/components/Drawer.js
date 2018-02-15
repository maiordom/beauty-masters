import React, { PureComponent } from 'react';
import RNDrawer from 'react-native-drawer';
import { DefaultRenderer } from 'react-native-router-flux';

import Sidebar from '../containers/Sidebar';

import { drawerClose } from '../actions/Drawer';
import vars from '../vars';

export default class Drawer extends PureComponent {
  onClose = () => {
    drawerClose();
  };

  render() {
    const state = this.props.navigationState;
    const children = state.children;

    return (
      <RNDrawer
        type="overlay"
        captureGestures="open"
        open={state.open}
        content={<Sidebar {...this.props} />}
        openDrawerOffset={0.125}
        panCloseMask={0.2}
        negotiatePan
        tweenDuration={200}
        onClose={this.onClose}
        tweenHandler={(ratio) => ({
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
