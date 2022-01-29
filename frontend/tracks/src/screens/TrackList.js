import React, { useContext, useEffect } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { ListItem } from "react-native-elements";
import { NavigationEvents } from "react-navigation";

import { Context as TrackContext } from "../context/Track";

export default function TrackList({ navigation }) {
  const {
    state: { tracks },
    fetchTracks,
  } = useContext(TrackContext);

  return (
    <View>
      <NavigationEvents onWillFocus={() => fetchTracks()} />
      <FlatList
        data={tracks}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("TrackDetails", { state: item })
              }
            >
              <ListItem style={{ marginBottom: 10 }}>
                <ListItem.Content>
                  <ListItem.Title>{item.name}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
