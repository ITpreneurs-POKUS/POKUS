import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingScreen from "../screens/LandingScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import HomeScreen from "../screens/HomeScreen";

import Todolist from "../TodoApp/pages/Todolist";
import AddNotes from "../TodoApp/pages/AddNotes";
import NoteTaker from "../screens/NoteTaker";

import SearchTab from "../BottomTabs/SearchTab";
import AddTab from "../BottomTabs/AddTab";
import TimerTab from "../BottomTabs/TimerTab";
import DNDTab from "../BottomTabs/DNDTab";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DrawerContent from "../DrawerContent/DrawerContent";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { DrawerActions, useNavigation } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { useTheme } from "react-native-paper";

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
      <HomeStack.Screen name="Notes" component={NoteTakerTabNavigator} />
      <HomeStack.Screen
        name="Todolist"
        component={Todolist}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="AddNotes"
        component={AddNotes}
        options={{ headerShown: false }}
      />
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




function NoteTakerTabNavigator() {
  const Tab = createMaterialBottomTabNavigator();

  const theme = useTheme();
  theme.colors.secondaryContainer = "transperent";

  return (
    <Tab.Navigator
      initialRouteName="Notes"
      activeColor="white"
      barStyle={{ backgroundColor: "#050A30" }}
      labeled={false}
    >
      <Tab.Screen
        name="HomeTab"
        component={NoteTaker}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchTab}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="magnify" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AddTab"
        component={AddTab}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="plus" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="TimerTab"
        component={TimerTab}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="clock" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="DNDTab"
        component={DNDTab}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="moon-waxing-crescent" size={30} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return <AuthStack />;
}
