import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setFieldParam } from '../../actions/master';

import MasterEditorService from '../../components/MasterEditor/MasterEditorService';

const mapStateToProps = state => ({
  serviceManicure: state.masterEditor.serviceManicure,
  servicePedicure: state.masterEditor.servicePedicure,
});

const mapDispatchToProps = dispatch => {
  const actions = bindActionCreators({ setFieldParam }, dispatch);

  return {
    actions,
    onNextPress() {
      Actions.masterEditorHandlingTools();
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MasterEditorService);
