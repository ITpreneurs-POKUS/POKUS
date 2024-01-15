import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import DeckDetail from "../components/DeckDetail";
import AddCard from "../components/AddCard";
import Deck from "../components/Deck";
import Quiz from "../components/Quiz";

// Screen names
const DeckDetailName = "DeckDetail";

const Stack = createNativeStackNavigator();

export default function FlashCardContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false, statusBarColor: "#050A30" }}
      >
        <Stack.Screen
          name={DeckDetailName}
          component={DeckDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddCard"
          component={AddCard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Deck"
          component={Deck}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Quiz"
          component={Quiz}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
