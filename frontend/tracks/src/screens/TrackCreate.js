import React, { useCallback, useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import Maps from "../components/Maps";
import { Context as LocationContext } from "../context/Location";
import {
  requestForegroundPermissionsAsync,
  watchPositionAsync,
  Accuracy,
} from "expo-location";
import "../_mockLocation";
import { NavigationEvents, withNavigation } from "react-navigation";
import useTrack from "../hooks/useTrack";
import { FontAwesome } from "@expo/vector-icons";

function TrackCreate({ navigation: { isFocused } }) {
  const [err, setErr] = useState(null);
  const [shouldTrack, setShouldTrack] = useState(false);

  const { state, addLocation, changeName, stopRecording, startRecording } =
    useContext(LocationContext);
  const [saveTask] = useTrack();

  const helper = useCallback(
    (location) => {
      addLocation(location, state.recording);
    },

    [state.recording]
  );

  useEffect(() => {
    let subscriber = null;
    const startWatching = async () => {
      try {
        const { granted } = await requestForegroundPermissionsAsync();
        subscriber = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 10,
          },
          helper
        );
        await setErr(null);
      } catch (error) {
        setErr(error);
      }
    };

    if (!shouldTrack) {
      subscriber?.remove();
      subscriber = null;
    } else {
      startWatching();
    }
    return () => {
      if (subscriber) subscriber.remove();
    };
  }, [shouldTrack, helper]);

  console.log(state.locations.length);
  return (
    <View>
      <Text h3>TrackCreate</Text>
      {err && <Text>Please enable loction</Text>}
      <NavigationEvents
        onWillFocus={() => setShouldTrack(true)}
        onWillBlur={() => setShouldTrack(false)}
      />
      <Maps locationState={state} />
      <Input
        label="name"
        value={state.name}
        onChangeText={(text) => {
          changeName(text);
        }}
        autoCapitalize="none"
      />

      {state.recording ? (
        <Button
          style={styles.margin}
          title="Stop Recording"
          onPress={() => stopRecording()}
        />
      ) : (
        <Button
          style={styles.margin}
          title="Start Recording"
          onPress={() => startRecording()}
        />
      )}

      {state.recording && state.locations.length > 0 && (
        <View style={styles.margin}>
          <Button
            title="Save Recording"
            onPress={() => saveTask(state.name, state.location)}
          />
        </View>
      )}
    </View>
  );
}

TrackCreate.navigationOptions = () => ({
  title: "Create",
  headerShown: true,
  tabBarIcon: <FontAwesome name="plus" size={20} />,
});

export default withNavigation(TrackCreate);

const styles = StyleSheet.create({
  margin: {
    marginVertical: 10,
  },
});
