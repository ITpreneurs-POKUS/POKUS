import { StyleSheet, View, Image, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import { firebase } from '../../../firebase';



export default function Landing({navigation}) {

const LogoImage = require('../../../assets/LogoPokus.png');

  return (
    <View style={styles.container}>
    

    <View style={styles.imageContainer}>
        <Image source={LogoImage} style={styles.imageStyle}></Image>

        <Text style={{color:'white', fontSize: 18, fontStyle: 'italic', marginBottom: 50}}>Unlock Your Potential, Beat Distraction,{'\n'} and Stay Focused with Pokus!</Text>
    </View>

      <Button
      style={[styles.buttonStyle, styles.signupBotton]}
      icon='account-plus'
      mode='contained'
      buttonColor='#FFFFFF'
      textColor='#FFFFFF'
      onPress={() => navigation.navigate('Signup')}
        >SIGNUP
        </Button>

      <View style={styles.loginContainer}>
        <Text style={styles.textStyle}>Already Have an Account?</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={[styles.textStyle, styles.loginTextStyle]}>Login Here</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyle: {
        height: 150,
        width: 400,
        // resizeMode: 'contain',
    },
    buttonStyle: {
        padding: 10,
        textAlign: 'center',
        width: 350,
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
    },
    signupBotton: {
      backgroundColor: '#233DFD',
    },
    loginContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      width: 300,
      marginTop: 30,
    },
    textStyle: {
      fontSize: 15,
      color: 'white',
      fontWeight: 'bold',
    },
    loginTextStyle:{
      textDecorationLine: 'underline',
      color: '#233DFD',
    },
});