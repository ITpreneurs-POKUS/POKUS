import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingScreen from "../screens/LandingScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import HomeScreen from "../screens/HomeScreen";

import Todolist from "../screens/Features/Todolist/pages/home/index";
import AddNotes from "../screens/Features/Todolist/pages/AddNotes/index";

// FLASHCARDS
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DeckList from "../screens/Features/FlashCards/src/components/DeckList";
import AddDeck from "../screens/Features/FlashCards/src/components/AddDeck";
import DeckDetail from "../screens/Features/FlashCards/src/components/DeckDetail";
import AddCard from "../screens/Features/FlashCards/src/components/AddCard";
import Quiz from "../screens/Features/FlashCards/src/components/Quiz";
import ChatBot from "../screens/Features/ChatBot";

import DrawerContent from "../DrawerContent/DrawerContent";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { DrawerActions, useNavigation } from "@react-navigation/native";
import EditProfileScreen from "../screens/EditProfileScreen";
import React, { createContext, useState, useEffect } from 'react';
import { firebase } from '../../../firebase';
import { LogBox } from "react-native";
import SendEmailScreen from "../screens/SendEmailScreen";
import NoteProvider from "../screens/Features/NoteTaker/contexts/NoteProvider";
import NoteScreen from "../screens/Features/NoteTaker/screens/NoteScreen";
import NoteDetail from "../screens/Features/NoteTaker/components/NoteDetail";
import TimerTab from "../screens/Features/Timer";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

function AuthStack() {
  LogBox.ignoreAllLogs();
  const AuthStack = createNativeStackNavigator();

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);

    // Check AsyncStorage for user credentials
    const checkStoredCredentials = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem('user_email');
        const savedPassword = await AsyncStorage.getItem('user_password');

        if (savedEmail && savedPassword) {
          // Use the saved email and password for login
          await handleLogin({ email: savedEmail, password: savedPassword });
        } else {
          // No saved email or password, proceed with regular login
          if (initializing) setInitializing(false);
        }
      } catch (error) {
        console.error('Error checking stored credentials:', error);
      }
    };

    checkStoredCredentials();

    return subscriber;
  }, []);

  const handleLogin = async (values) => {
    try {
      const { email, password } = values;
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  if (initializing) return null;

  return (
    <AuthContext.Provider value={user}>
      <AuthStack.Navigator
        screenOptions={{ headerShown: false, statusBarColor: "#050A30" }}
      >
        {user ? (
          <AuthStack.Screen name="HomeDrawer" options={{ gestureEnabled: false }}>
            {(props) => <HomeDrawer {...props} user={user} />}
          </AuthStack.Screen>
        ) : (
          <>
            <AuthStack.Screen name="Landing" component={LandingScreen} />
            <AuthStack.Screen name="Login" component={LoginScreen}/>
            <AuthStack.Screen name="Signup" component={SignUpScreen} />
            <AuthStack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
            />
          </>
        )}
      </AuthStack.Navigator>
    </AuthContext.Provider>
  );
}


function HomeDrawer({ user }) {
  const HomeDrawer = createDrawerNavigator();
  return (
    <HomeDrawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <HomeDrawer.Screen name="HomeStack">
        {(props) => <HomeStack {...props} user={user} />}
      </HomeDrawer.Screen>
    </HomeDrawer.Navigator>
  );
}


function HomeStack() {
  const HomeStack = createNativeStackNavigator();
  const navigation = useNavigation();

  return (
    <NoteProvider>
      <HomeStack.Navigator
        initialRouteName="HomeDrawer"
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
        <HomeStack.Screen name="Todolist" component={Todolist} />
        <HomeStack.Screen
          name="AddNotes"
          component={AddNotes}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen name="NoteTaker" component={NoteScreen}/>
        <HomeStack.Screen
          name="NoteDetail"
          component={NoteDetail}
          options={{
            headerLeft: () => (
              <Icon
                name="arrow-left"
                onPress={() => navigation.navigate('NoteTaker')}
                size={30}
                color="#fff"
                style={{ marginLeft: 10 }}
              />
            ),
          }}
        />

        <HomeStack.Screen name="Timer" component={TimerTab} />
        <HomeStack.Screen name="ChatBot" component={ChatBot} />

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
        <HomeStack.Screen name="Email" component={SendEmailScreen} />
        <HomeStack.Screen
          name="Profile"
          component={EditProfileScreen}
          options={{
            headerLeft: () => (
              <Icon
                name="arrow-left"
                onPress={() => navigation.goBack()}
                size={30}
                color="#fff"
                style={{ marginLeft: 10 }}
              />
            ),
          }}
        />
      </HomeStack.Navigator>
    </NoteProvider>
  );
}

import { useTheme } from 'react-native-paper';

function BottomTabs() {
  const Tab = createMaterialBottomTabNavigator();

  const theme = useTheme();
    theme.colors.secondaryContainer = "transperent"
    
  return (
    <Tab.Navigator
      initialRouteName="DeckList"
      activeColor="white"
      barStyle={{ backgroundColor: '#050A30' }}
    >
      <Tab.Screen
        name="Deck"
        component={DeckList}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="format-list-bulleted" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AddDeck"
        component={AddDeck}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="playlist-plus" size={30} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return <AuthStack />;
}
