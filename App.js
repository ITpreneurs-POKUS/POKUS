import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/components/helper/Navigator";
import { StyleSheet } from "react-native";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./src/components/screens/Features/FlashCards/src/reducers";
import { setLocalNotification } from "../POKUS/src/components/screens/Features/FlashCards/src/utils/helpers";
import { useEffect } from "react";
import { firebase } from './firebase';

const middleware = [thunk, logger];

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
});

const App = () => {
  useEffect(() => {
    setLocalNotification();
  }, []);
  return (
      <Provider store={store}>
        <SafeAreaView style={styles.container}>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </SafeAreaView>
      </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050A30",
  },
});

export default App;