import * as Location from "expo-location";
const tenMeters = 0.0001;
const getLocation = (increment) => {
  return {
    timestamp: 10000000,
    coords: {
      speed: 0,
      heading: 0,
      accuracy: 0,
      altitudeAccuracy: 5,
      altitude: 5,
      latitude: 19.2096492 + increment * tenMeters,
      longitude: 73.0995412 + increment * tenMeters,
    },
  };
};

let counter = 0;
setInterval(() => {
  Location.EventEmitter.emit("Expo.locationChanged", {
    watchId: Location._getCurrentWatchId(),
    location: getLocation(counter),
  });
  counter++;
}, 1000);
