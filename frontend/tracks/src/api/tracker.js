import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const instance = axios.create({
  baseURL: "http://node-tracker-app.herokuapp.com",
});

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("trackerToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
