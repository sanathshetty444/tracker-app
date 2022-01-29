import AsyncStorage from "@react-native-async-storage/async-storage";
import tracker from "../api/tracker";
import { navigate } from "../navigationRef";
import CreateContext from "./CreateContext";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "Set_Tracks":
      return { ...state, tracks: payload };
    default:
      return state;
  }
};

const mapActions = (dispatch) => ({
  fetchTracks: async () => {
    const response = await tracker.get("/tracks");
    dispatch({ type: "Set_Tracks", payload: response.data });
  },
  createTask: async (name, locations) => {
    console.log(name, locations.length);
    await tracker.post("/tracks", { name, locations });
  },
});

export const { Provider, Context } = CreateContext(reducer, mapActions, {
  tracks: [],
});
