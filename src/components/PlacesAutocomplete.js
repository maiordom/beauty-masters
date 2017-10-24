/* @flow */

import React, { Component } from "react";
import debounce from "lodash/debounce";
import {
  ListView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import Input from "./Input";

import vars from "../vars";
import i18n from "../i18n";

type TProps = {
  actions: {
    placesReset: () => void,
    searchPlace: (value: string) => void,
    selectPlace: (place: Object) => void
  },
  distances: Array<{ label: string }>,
  places: Array<{ label: string }>
};

type TState = {
  dataSource: Object
};

export default class PlacesAutocomplete extends Component<TProps, TState> {
  static defaultProps = {
    places: [],
    distances: []
  };

  onChange = (value: string) => this.searchPlace(value);

  ds: Object;

  searchPlace = debounce(value => this.props.actions.searchPlace(value), 300);

  constructor(props: TProps) {
    super(props);

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      dataSource: this.ds.cloneWithRows(props.places)
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        });
      },
      error => {
        this.setState({ error: error.message });
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  componentWillReceiveProps(nextProps: TProps) {
    if (this.props.places !== nextProps.places) {
      this.setState({
        dataSource: this.ds.cloneWithRows(nextProps.places)
      });
    }
  }

  componentWillUnmount() {
    this.props.actions.placesReset();
  }

  onPlaceSelect = (place: Object) => {
    this.props.actions.selectPlace(place);
  };

  render() {
    const { distances, places } = this.props;

    return (
      <View style={styles.container}>
        <Text>Latitude: {this.state.latitude}</Text>
        <Text>Longitude: {this.state.longitude}</Text>
        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
        <GooglePlacesAutocomplete
          placeholder="Введите адрес"
          minLength={2}
          autoFocus={false}
          returnKeyType={"search"}
          fetchDetails
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: "AIzaSyD7u--7uoorLS369FEIpdwjxB5fMPjrrnU",
            language: "ru", // language of the results
            types: "address" // default: 'geocode'
          }}
          styles={{
            textInputContainer: {
              backgroundColor: "rgba(0,0,0,0)",
              borderTopWidth: 0,
              borderBottomWidth: 0
            },
            textInput: {
              marginLeft: 0,
              marginRight: 0,
              height: 38,
              color: "#5d5d5d",
              fontSize: 16
            },
            predefinedPlacesDescription: {
              color: "#1faadb"
            }
          }}
          currentLocation
          nearbyPlacesAPI="GooglePlacesSearch"
        />
      </View>
    );
    // return (
    //   <View style={styles.container}>
    //     <View style={styles.inner}>
    //       <Input
    //         debounce
    //         debounceTimer={1000}
    //         onChange={this.onChange}
    //         placeholder={i18n.enterAddress}
    //       />
    //       {places.length === 0 &&
    //         distances.map(location => (
    //           <TouchableWithoutFeedback key={location.label} onPress={() => {}}>
    //             <View style={styles.tab}>
    //               <Text style={styles.tabText}>{location.label}</Text>
    //             </View>
    //           </TouchableWithoutFeedback>
    //         ))}
    //       {places.length > 0 && (
    //         <ListView
    //           dataSource={this.state.dataSource}
    //           renderRow={place => (
    //             <TouchableWithoutFeedback
    //               onPress={() => this.onPlaceSelect(place)}
    //               key={place.label}
    //             >
    //               <View style={styles.tab}>
    //                 <Text style={styles.tabText}>{place.label}</Text>
    //               </View>
    //             </TouchableWithoutFeedback>
    //           )}
    //         />
    //       )}
    //     </View>
    //   </View>
    // );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inner: {
    flex: 1,
    paddingTop: 8,
    paddingLeft: 16,
    paddingRight: 16
  },
  tab: {
    height: 48,
    paddingLeft: 5,
    justifyContent: "center"
  },
  tabText: {
    fontSize: 16,
    color: vars.color.black
  }
});
