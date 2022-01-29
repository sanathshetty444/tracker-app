import AsyncStorage from "@react-native-async-storage/async-storage";
import tracker from "../api/tracker";
import { navigate } from "../navigationRef";
import CreateContext from "./CreateContext";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "SignIn":
    case "SignUp":
      return { ...state, token: payload.token, isSignedIn: true, error: "" };
    case "Error":
      return { ...state, error: payload };
    case "Reset Error":
      return { ...state, error: "" };
    case "SignOut":
      return { ...state, token: null };
    default:
      return state;
  }
};

const mapActions = (dispatch) => ({
  signIn: async ({ email, password }) => {
    try {
      const response = await tracker.post("/signin", { email, password });
      await AsyncStorage.setItem("trackerToken", response.data.token);
      dispatch({ type: "SignIn", payload: { token: response.data.token } });
      navigate("TrackList");
    } catch (error) {
      console.log(error.message);
      dispatch({ type: "Error", payload: "Something went wrong" });
    }
  },
  signUp: async ({ email, password }) => {
    try {
      const response = await tracker.post("/signup", { email, password });
      await AsyncStorage.setItem("trackerToken", response.data.token);
      dispatch({ type: "SignUp", payload: { token: response.data.token } });
      navigate("TrackList");
    } catch (error) {
      console.log(error.message);
      dispatch({ type: "Error", payload: "Something went wrong" });
    }
  },
  signOut: async () => {
    try {
      await AsyncStorage.removeItem("trackerToken");
      dispatch({ type: "SignOut" });
      navigate("loginFlow");
    } catch (error) {
      console.log(error.message);
    }
  },
  clearErrorMessage: () => {
    dispatch({ type: "Reset Error" });
  },
  tryLocalSignIn: async () => {
    const token = await AsyncStorage.getItem("trackerToken");
    if (token) {
      dispatch({ type: "SignIn", payload: { token } });
      navigate("mainFlow");
    } else {
      navigate("loginFlow");
    }
  },
});

export const { Provider, Context } = CreateContext(reducer, mapActions, {
  isSignedIn: false,
  token: null,
  error: "",
});
