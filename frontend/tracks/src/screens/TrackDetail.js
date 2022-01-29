import React from "react";
import { Text, View } from "react-native";
import Maps from "../components/Maps";

export default function TrackDetail({ navigation }) {
  const state = navigation.getParam("state");
  return (
    <View>
      <Text>{state.name}</Text>
      <Maps locationState={state} isDetails />
    </View>
  );
}
