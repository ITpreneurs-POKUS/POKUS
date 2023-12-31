import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingScreen from "../screens/LandingScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import HomeScreen from "../screens/HomeScreen";

import Todolist from "../screens/Features/Todolist/pages/home/index";
import AddNotes from "../screens/Features/Todolist/pages/AddNotes/index";

// FLASHCARDS
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DeckList from "../screens/Features/FlashCards/src/components/DeckList";
import AddDeck from "../screens/Features/FlashCards/src/components/AddDeck";
import DeckDetail from "../screens/Features/FlashCards/src/components/DeckDetail";
import AddCard from "../screens/Features/FlashCards/src/components/AddCard";
import Quiz from "../screens/Features/FlashCards/src/components/Quiz";
// import NoteTaker from "../screens/Features/NoteTaker/NoteTaker";
import ChatBot from "../screens/Features/ChatBot";

// import SearchTab from "../screens/Features/NoteTaker/BottomTabs/SearchTab";
// import AddTab from "../screens/Features/NoteTaker/BottomTabs/AddTab";
// import TimerTab from "../screens/Features/NoteTaker/BottomTabs/TimerTab";
// import DNDTab from "../screens/Features/NoteTaker/BottomTabs/DNDTab";

import DrawerContent from "../DrawerContent/DrawerContent";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { DrawerActions, useNavigation } from "@react-navigation/native";
// import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
// import { useTheme } from "react-native-paper";
import EditProfileScreen from "../screens/EditProfileScreen";
import NoteTakerScreen from "../screens/Features/NoteTaker/NoteTakerScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function AuthStack() {
  const AuthStack = createNativeStackNavigator();

  return (
    <AuthStack.Navigator
      screenOptions={{ headerShown: false, statusBarColor: "#050A30" }}
    >
      <AuthStack.Screen name="Landing" component={LandingScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Signup" component={SignUpScreen} />
      <AuthStack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
      />
      <AuthStack.Screen name="HomeDrawer" component={HomeDrawer} />
    </AuthStack.Navigator>
  );
}

function HomeStack() {
  const HomeStack = createNativeStackNavigator();
  const navigation = useNavigation();

  return (
    <HomeStack.Navigator
      screenOptions={{
        statusBarColor: "#050A30",
        headerStyle: {
          backgroundColor: "#050A30",
        },
        headerTintColor: "#fff",
        headerTitleAlign: "center",

        headerLeft: () => {
          return (
            <Icon
              name="menu"
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              size={30}
              color="#fff"
            />
          );
        },
      }}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="FlashCard" component={BottomTabs} />
      <HomeStack.Screen name="DeckList" component={DeckList} />
      <HomeStack.Screen
        name="DeckDetail"
        component={DeckDetail}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="AddCard"
        component={AddCard}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Quiz"
        component={Quiz}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen name="Todolist" component={Todolist} />
      <HomeStack.Screen
        name="AddNotes"
        component={AddNotes}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen name="NoteTaker" component={NoteTakerScreen} />
      <HomeStack.Screen name="ChatBot" component={ChatBot} />
      <HomeStack.Screen name="Profile" component={EditProfileScreen} />
      <HomeStack.Screen
        options={{ headerShown: false }}
        name="BackToLanding"
        component={AuthStack}
      />
    </HomeStack.Navigator>
  );
}

function HomeDrawer() {
  const HomeDrawer = createDrawerNavigator();
  return (
    <HomeDrawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <HomeDrawer.Screen
        name="HomeStack"
        component={HomeStack}
        options={{ gestureEnabled: false }}
      />
    </HomeDrawer.Navigator>
  );
}

function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="DeckList"
      screenOptions={({ route }) => ({
        activeTintColor: "tomato",
        inactiveTintColor: "grey",
        labelStyle: { paddingBottom: 10, fontSize: 10 },
      })}
    >
      <Tab.Screen
        name="Deck"
        component={DeckList}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="format-list-bulleted" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AddDeck"
        component={AddDeck}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="playlist-plus" size={30} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// function NoteTakerTabNavigator() {
//   const Tab = createMaterialBottomTabNavigator();

//   const theme = useTheme();
//   theme.colors.secondaryContainer = "transparent";

//   return (
//     <Tab.Navigator
//       initialRouteName="Notes"
//       activeColor="white"
//       barStyle={{ backgroundColor: "#050A30" }}
//       labeled={false}
//     >
//       <Tab.Screen
//         name="HomeTab"
//         component={NoteTaker}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <Icon name="home" size={30} color={color} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Search"
//         component={SearchTab}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <Icon name="magnify" size={30} color={color} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="AddTab"
//         component={AddTab}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <Icon name="plus" size={30} color={color} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="TimerTab"
//         component={TimerTab}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <Icon name="clock" size={30} color={color} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="DNDTab"
//         component={DNDTab}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <Icon name="moon-waxing-crescent" size={30} color={color} />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// }

export default function AppNavigator() {
  return <HomeDrawer />;
}
