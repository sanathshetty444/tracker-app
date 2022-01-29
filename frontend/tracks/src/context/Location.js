import AsyncStorage from "@react-native-async-storage/async-storage";
import tracker from "../api/tracker";
import { navigate } from "../navigationRef";
import CreateContext from "./CreateContext";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "Add_Current_Location": {
      return {
        ...state,
        currentLocation: payload,
      };
    }
    case "Add_Location":
      return {
        ...state,
        locations: [...state.locations, payload],
      };
    case "Change_Name":
      return {
        ...state,
        name: payload,
      };
    case "Start_Recording":
      return { ...state, recording: true };
    case "Stop_Recording":
      return { ...state, recording: false };
    case "Reset":
      return { ...state, locations: [], name: "", recording: false };
    default:
      return state;
  }
};

const mapActions = (dispatch) => ({
  changeName: (name) => {
    dispatch({ type: "Change_Name", payload: name });
  },
  startRecording: () => {
    dispatch({ type: "Start_Recording" });
  },
  stopRecording: () => {
    dispatch({ type: "Stop_Recording" });
  },
  addLocation: (location, recording) => {
    dispatch({ type: "Add_Current_Location", payload: location });
    if (recording) {
      console.log("recording");
      dispatch({ type: "Add_Location", payload: location });
    }
  },
  reset: () => {
    dispatch({ type: "Reset" });
  },
});

export const { Provider, Context } = CreateContext(reducer, mapActions, {
  name: "",
  recording: false,
  locations: [],
  currentLocation: null,
});
