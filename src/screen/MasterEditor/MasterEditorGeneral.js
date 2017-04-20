import React from 'react';
import { View } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { setFieldValue } from '../../actions/master';

import MasterEditorGeneral from '../../components/MasterEditor/MasterEditorGeneral';
import NavBar from '../../components/NavBar';

const mapStateToProps = state => ({
  ...state.masterEditor.generalSection,
});

const mapDispatchToProps = dispatch => {
  const actions = bindActionCreators({ setFieldValue }, dispatch);

  return {
    onNextPress: Actions.masterEditorService,
    actions,
  };
};

const Scene = props => (
  <View style={{flex: 1}}>
    <NavBar {...props} />
    <MasterEditorGeneral {...props} />
  </View>
);

export default connect(mapStateToProps, mapDispatchToProps)(Scene);
