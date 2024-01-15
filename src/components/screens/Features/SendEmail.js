import { StyleSheet, Text, View, ToastAndroid, Linking } from 'react-native'
import React from 'react'
import { TextInput, Button, IconButton } from 'react-native-paper';

export default function SendEmail({navigation}) {

    const [email, setEmail] = React.useState('pokus.app.official@gmail.com');

    const showToast = (message = "Something wen't wrong") => {
        ToastAndroid.show(message, 3000);
      };
    

    const sendEmailComplaint = async (email) => {
        try {
            Linking.openURL("mailto: pokus.app.official@gmail.com")

        } catch (error) {
            showToast(error.message || "Something went wrong");
        }
    }


  return (
    <View style={styles.container}>

        <View style={{flex: 0.5}}></View>

        <View style={styles.sendEmailWrapper}>

            <Text style={{textAlign:'center', 
                fontWeight:'bold', 
                fontSize: 35, 
                color: 'white', 
                marginBottom: 40}} 
                variant='displayMedium'
                    >MAKE COMPLAINTS</Text>

            <Text style={{color:'#00E31A', marginLeft: 10, fontWeight:'bold'}}>Here's our official email.</Text>

            <TextInput
            style={styles.textInputStyle}
            value={email}
            mode='outlined'
            onChangeText={(email) => setEmail(email)}
            editable={false}
            />

            <Button 
            onPress={() => {sendEmailComplaint()}}
            style={styles.buttonStyle} 
            mode='contained'
                >SEND MESSAGE
                </Button>

        </View>

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    sendEmailWrapper: {
        flex: 1,
        alignSelf: 'center',
        width: '90%',
    },
    textInputStyle: {
        marginTop: 10,
        fontWeight: 'bold',
    },
    buttonStyle: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        backgroundColor: '#233DFD',
    },
});