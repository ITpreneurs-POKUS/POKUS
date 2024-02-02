import "react-native-gesture-handler";
import { firebase } from './firebase';
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/components/helper/Navigator";
import { StyleSheet } from "react-native";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./src/components/screens/Features/FlashCards/src/reducers";
import { PaperProvider } from "react-native-paper";


const middleware = [thunk, logger];

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
});

const App = () => {

  return (
        <Provider store={store}>
          <PaperProvider>
            <SafeAreaProvider style={styles.container}>
              <NavigationContainer>
                <AppNavigator />
              </NavigationContainer>
            </SafeAreaProvider>
          </PaperProvider>
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