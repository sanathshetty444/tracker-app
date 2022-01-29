import React, { useContext } from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-elements";
import { Context } from "../context/Auth";
import { FontAwesome } from "@expo/vector-icons";

export default function Account() {
  const { signOut } = useContext(Context);
  return (
    <View>
      <Text>Account</Text>
      <Button title={"Sign out"} type="outline" onPress={signOut} />
    </View>
  );
}

Account.navigationOptions = () => ({
  title: "Account",
  headerShown: true,
  tabBarIcon: <FontAwesome name="user" size={20} />,
});
