import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import DeckList from "../components/DeckList";
import AddDeck from "../components/AddDeck";
import DeckDetail from "../components/DeckDetail";
import AddCard from "../components/AddCard";
import Deck from "../components/Deck";
import Quiz from "../components/Quiz";

// Screen names
const DeckName = "DeckList";
const AddDeckName = "AddDeck";
const DeckDetailName = "DeckDetail";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName={DeckName}
      screenOptions={({ route }) => ({
        activeTintColor: "tomato",
        inactiveTintColor: "grey",
        labelStyle: { paddingBottom: 10, fontSize: 10 },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === DeckName) {
            iconName = focused ? "ios-list" : "ios-list-outline";
          } else if (rn === AddDeckName) {
            iconName = focused ? "ios-add" : "ios-add-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name={DeckName}
        component={DeckList}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={AddDeckName}
        component={AddDeck}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default function FlashCardContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false, statusBarColor: "#050A30" }}
      >
        <Stack.Screen name="BottomTabs" component={BottomTabs} />
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
