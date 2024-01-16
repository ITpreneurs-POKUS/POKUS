import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Dimensions, Text, TouchableOpacity, TextInput, Alert, ToastAndroid } from "react-native";
import { PaperProvider } from "react-native-paper";
import { firebase } from '../../../firebase';
import * as ImagePicker from 'expo-image-picker';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


export default function EditProfileScreen({ navigation }) {

  const showToast = (message = "Something wen't wrong") => {
    ToastAndroid.show(message, 3000);
  };
  
  const [profileImage, setProfileImage] = useState(null);

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
          setProfileImage(userData.profileImage || null);
        } else {
          console.log('User does not exist');
        }
      })
      .catch((error) => {
        console.error('Error fetching user data: ', error);
      });
  }, []);

  const uploadImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        console.error('Permission to access media library denied');
        showToast("Permission to access media library denied");
        return;
      }

      const imagePickerResponse = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!imagePickerResponse.cancelled) {
        // Handle the image picker response
        const uri = imagePickerResponse.uri;
        setProfileImage(uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      showToast("Error picking image");
    }
  };

  const updateUserProfile = async () => {
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
    
      try {
        if (profileImage) {
          const response = await fetch(profileImage);
          const blob = await response.blob();
    
          const storage = firebase.storage();
          const storageRef = storage.ref();
          const fileName = `profile_images/${firebase.auth().currentUser.uid}/${Date.now()}.jpg`;
    
          const uploadTask = storageRef.child(fileName).put(blob);
    
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(`Upload is ${progress}% done`);
            },
            (error) => {
              console.error('Error uploading image:', error);
            },
            () => {
              uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                userDocRef.update({ profileImage: downloadURL });
              });
            }
          );
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        showToast("Failed to update profile image");
      }
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
          <View style={styles.profileImage}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.image} resizeMode="cover" />
            ) : (
              <Image source={require("././../../../assets/pfp.png")} style={styles.image} resizeMode="cover" />
            )}
            <TouchableOpacity onPress={uploadImage} style={styles.changeImageButton}>
              <MaterialCommunityIcons name="pencil" size={20} color="white" />
            </TouchableOpacity>
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
    opacity: 0.5,
    flex: 1,
    height: undefined,
    width: undefined,
  },
  profileImage: {
    borderWidth: 5,
    borderColor: '#ffff',
    backgroundColor: '#ffff',
    marginTop: height * 0.1,
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: width * 0.3,
    overflow: "hidden",
    zIndex: 1,
    bottom: 20,
  },
  changeImageButton: {
    backgroundColor: "#233DFD",
    position: 'absolute',
    top: 140,
    right: 30,
    padding: 10,
    borderRadius: 50,
    marginTop: 10,
    alignSelf: "center",
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