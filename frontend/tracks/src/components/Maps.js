import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import MapView, { Circle, Polyline } from "react-native-maps";
export default function Maps({ locationState, isDetails }) {
  // const points = [];
  // for (let i = 0; i < 20; i++) {
  //   points.push({
  //     longitude: 73.0995412 + i * 0.001,
  //     latitude: 19.2096492 + i * 0.001,
  //   });
  // }
  const { currentLocation, locations } = locationState;
  if (!isDetails && !currentLocation) {
    return <ActivityIndicator size="large" style={{ marginTop: 200 }} />;
  }
  console.log(locationState);
  const initialCords = !isDetails
    ? currentLocation.coords
    : locationState.locations[0].coords;
  const locationCoords = !isDetails ? locations : locationState.locations;
  return (
    <MapView
      initialRegion={{
        // latitude: 19.2096492,
        // longitude: 73.0995412,
        ...initialCords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      region={{
        //For auto-recentering and zooming the user
        ...initialCords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      style={styles.map}
    >
      <Polyline coordinates={locationCoords.map((loc) => loc.coords)} />
      <Circle
        center={
          !isDetails
            ? initialCords
            : locationCoords[locationCoords.length - 1].coords
        }
        radius={30}
        strokeColor="rgba(158,158,255,1.0)"
        fillColor="rgba(158,158,255,0.3)"
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    height: 300,
  },
});
