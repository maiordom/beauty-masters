// @flow
import React, { PureComponent } from 'react';
import { WebView, StyleSheet, View } from 'react-native';

import ActivityIndicator from './ActivityIndicator';

export default class Doc extends PureComponent {
  render() {
    const { uri } = this.props;

    return (
      <WebView
        style={styles.container}
        startInLoadingState
        renderLoading={() => <View style={styles.container}>
          <ActivityIndicator animating position="absolute" />
        </View>}
        source={{ uri }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
