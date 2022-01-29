import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { Text, Button, Input } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import { Context } from "../context/Auth";

export default function Signup({ navigation }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { email, password } = formData;
  const {
    signUp,
    clearErrorMessage,
    tryLocalSignIn,
    state: { error },
  } = useContext(Context);

  useEffect(() => {
    tryLocalSignIn();
  }, []);
  const handleChange = (newValue, type) => {
    setFormData((data) => ({
      ...data,
      [type]: newValue,
    }));
  };
  const handleSignin = () => {
    navigation?.navigate("Signin");
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <NavigationEvents onWillFocus={() => clearErrorMessage()} />
      <Text h3 style={styles.header}>
        SignUp for Tracker
      </Text>
      <Input
        label="Email"
        value={formData.email}
        onChangeText={(text) => handleChange(text, "email")}
        autoCapitalize="none"
      />
      <Input
        label="Password"
        value={formData.password}
        secureTextEntry
        onChangeText={(text) => handleChange(text, "password")}
        autoCapitalize="none"
      />
      <Button title="Signup" onPress={() => signUp({ email, password })} />
      {error !== "" && <Text style={styles.error}>{error}</Text>}
      <Text style={styles.disclaimer} onPress={handleSignin}>
        Already have an account? Signin
      </Text>
    </SafeAreaView>
  );
}

Signup.navigationOptions = () => ({
  headerShown: false,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
    marginBottom: 200,
  },
  header: {
    marginVertical: 10,
    textAlign: "center",
  },
  disclaimer: {
    marginVertical: 10,
    color: "blue",
  },
  error: {
    marginVertical: 10,
    color: "red",
  },
});
