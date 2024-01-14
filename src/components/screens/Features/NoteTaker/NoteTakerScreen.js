import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from 'react-native-vector-icons';
import NoteScreen from './screens/NoteScreen';
import NoteDetail from './components/NoteDetail';
import NoteProvider from './contexts/NoteProvider';
import TimerTab from './screens/TimerTab';
import { View } from 'react-native';

const Stack = createStackNavigator();

export default function NoteTakerScreen() {

  return (
      <NoteProvider>
        <Stack.Navigator
          screenOptions={{ headerTransparent: true}}
        >
          <Stack.Screen options={{headerShown: false}}name="NoteScreen" component={NoteScreen} />
          <Stack.Screen options={{headerTitle: ''}}  name="NoteDetail" component={NoteDetail} />
          <Stack.Screen 
            options={{
              headerTitle: '',
              headerBackImage: () => (
                <View style={{ marginLeft: 30 }}>
                  <Ionicons name="arrow-back" size={24} color="white" />
                </View>
              ),}}  name="TimerTab" component={TimerTab}
              />
        </Stack.Navigator>
      </NoteProvider>
  );
}