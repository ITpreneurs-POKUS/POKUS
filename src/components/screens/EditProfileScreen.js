import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Dimensions, Text, TouchableOpacity, TextInput, Alert, ToastAndroid } from "react-native";
import { PaperProvider } from "react-native-paper";
import { firebase } from '../../../firebase';

export default function EditProfileScreen({ navigation }) {

  const showToast = (message = "Something wen't wrong") => {
    ToastAndroid.show(message, 3000);
  };

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [initialUserData, setInitialUserData] = useState({});

  useEffect(() => {
    const userDocRef = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid);

    userDocRef.get()
      .then((snapshot) => {
        if (snapshot.exists) {
          const userData = snapshot.data();
          setInitialUserData(userData); // Store initial data separately
          setFirstname(userData.firstname || '');
          setLastname(userData.lastname || '');
          setEmail(userData.email || '');
        } else {
          console.log('User does not exist');
        }
      })
      .catch((error) => {
        console.error('Error fetching user data: ', error);
      });
  }, []);

  const updateUserProfile = () => {
    const userDocRef = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid);

    // Check if any of the required fields (firstname, lastname) is empty
    if (!firstname || !lastname) {
      showToast("Please provide all required information");
      return;
  }
  
    userDocRef
      .set({
        firstname: firstname,
        lastname: lastname,
      }, { merge: true }) // Use merge: true to merge with existing data
      .then(() => {
        console.log('User data updated successfully');
        showToast("User data updated successfully");
        navigation.navigate('Home');
      })
      .catch((error) => {
        console.error('Error updating user data: ', error);
        showToast(error.message || "Failed to update user data");
      });
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <View style={styles.profileImage}>
          <Image
            source={require("././../../../assets/pfp.png")}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.box1}>
          <View style={styles.inputContainer}>
            <TextInput
              mode="outlined"
              placeholder="First Name"
              style={styles.firstnameSettings}
              placeholderTextColor="#888888" 
              value={firstname}
              onChangeText={(text) => setFirstname(text)}
              
            />
            <TextInput
              placeholder="Last Name"
              style={styles.lastnameSettings}
              placeholderTextColor="#888888" 
              value={lastname}
              onChangeText={(text) => setLastname(text)}
              
            />
            <TextInput
              placeholder="Email"
              keyboardType="email-address"
              style={styles.emailSettings}
              placeholderTextColor="#888888" 
              value={email}
              onChangeText={(text) => setEmail(text)}
              editable={false}
            />
          </View>
          <TouchableOpacity onPress={updateUserProfile} style={styles.boxEditProfile}>
            <Text style={styles.editProfileText}>Update Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </PaperProvider>
  );
}

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#050A30",
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  profileImage: {
    marginTop: height * 0.1,
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: width * 0.3,
    overflow: "hidden",
    zIndex: 1,
  },
  box1: {
    marginTop: -70,
    width: width * 0.8,
    height: 300,
    backgroundColor: "#233DFD",
    borderRadius: 10,
  },
  inputContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  firstnameSettings: {
    backgroundColor: "white",
    borderRadius: 30,
    height: 60,
    marginBottom: 10,
    paddingLeft: 20, 
    marginTop:40,
  },
  lastnameSettings: {
    backgroundColor: "white",
    borderRadius: 30,
    height: 60,
    marginBottom: 10,
    paddingLeft: 20, 
  },
  emailSettings: {
    backgroundColor: "white",
    borderRadius: 30,
    height: 60,
    marginBottom: 60,
    paddingLeft: 20, 
  },
  boxEditProfile: {
    backgroundColor: "#233DFD",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  editProfileText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
});