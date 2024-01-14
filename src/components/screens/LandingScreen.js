import { StyleSheet, View, BackHandler, Alert, ToastAndroid } from 'react-native';
import React, { useEffect, useRef } from 'react';
import Landing from '../forms/Landing';

export default function LandingScreen(props) {
  const lastBackPressed = useRef(0);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
    const currentTime = new Date().getTime();

      if (lastBackPressed.current + 2000 >= currentTime) {
        // Show an alert when the back button is pressed twice
        Alert.alert(
          'Exit App',
          'Are you sure you want to exit?',
          [
            { text: 'Cancel', onPress: () => null, style: 'cancel' },
            { text: 'OK', onPress: () => BackHandler.exitApp() },
          ],
          { cancelable: false }
        );
        return true; 
      } else {
        lastBackPressed.current = currentTime;
        // Provide feedback to the user (optional)
        ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
        return true; 
      }
    });


    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Landing {...props}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#050A30',
  },
});
