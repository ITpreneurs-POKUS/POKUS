import { StyleSheet, View, BackHandler } from 'react-native';
import React, {useEffect} from 'react';
import ForgotPasswordForm from '../forms/ForgotPasswordForm';


export default function ForgotPasswordScreen(props) {

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      // Do nothing when the back button is pressed
      return true;
    });

    // Cleanup the event listener when the component unmounts
    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <ForgotPasswordForm {...props}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#050A30',
  },
});