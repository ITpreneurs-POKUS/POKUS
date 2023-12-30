import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Dimensions, Text, TouchableOpacity, TextInput } from "react-native";
import { PaperProvider } from "react-native-paper";

export default function EditProfileScreen({ navigation }) {
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
            />
            <TextInput
              placeholder="Last Name"
              style={styles.lastnameSettings}
              placeholderTextColor="#888888" 
            />
            <TextInput
              placeholder="Email"
              keyboardType="email-address"
              style={styles.emailSettings}
              placeholderTextColor="#888888" 
            />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("EditProfile")} style={styles.boxEditProfile}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
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
  boxEditProfile: {
    backgroundColor: "#233DFD",
    padding: 15,
    borderRadius: 30,
    width: 250,
    marginBottom: 15,
    alignSelf: "center",
  },
  editProfileText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  firstnameSettings: {
    backgroundColor: "white",
    borderRadius: 30,
    height: 60,
    marginBottom: 10,
    paddingLeft: 10, 
    marginTop:40,
  },
  lastnameSettings: {
    backgroundColor: "white",
    borderRadius: 30,
    height: 60,
    marginBottom: 10,
    paddingLeft: 10, 
  },
  emailSettings: {
    backgroundColor: "white",
    borderRadius: 30,
    height: 60,
    marginBottom: 60,
    paddingLeft: 10, 
  },
});