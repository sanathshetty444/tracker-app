import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Account from "./src/screens/Account";
import Signin from "./src/screens/Signin";
import Signup from "./src/screens/Signup";
import TrackCreate from "./src/screens/TrackCreate";
import TrackDetail from "./src/screens/TrackDetail";
import TrackList from "./src/screens/TrackList";
import { Provider as AuthProvider } from "./src/context/Auth";
import { Provider as LocationProvider } from "./src/context/Location";
import { Provider as TrackProvider } from "./src/context/Track";
import { setNavigator } from "./src/navigationRef";
import { FontAwesome } from "@expo/vector-icons";

const trackListFlow = createStackNavigator({
  TrackList: TrackList,
  TrackDetails: TrackDetail,
});

trackListFlow.navigationOptions = () => ({
  tabBarIcon: <FontAwesome name="th-list" size={20} />,
  title: "List",
});
const switchNavigator = createSwitchNavigator({
  loginFlow: createStackNavigator({
    Signup: Signup,
    Signin: Signin,
  }),
  mainFlow: createBottomTabNavigator({
    trackListFlow,
    TrackCreate: TrackCreate,
    Account: Account,
  }),
});

const App = createAppContainer(switchNavigator);

export default () => (
  <TrackProvider>
    <LocationProvider>
      <AuthProvider>
        <App ref={(navigator) => setNavigator(navigator)} />
      </AuthProvider>
    </LocationProvider>
  </TrackProvider>
);
