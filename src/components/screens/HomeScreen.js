import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { PaperProvider } from "react-native-paper";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { firebase } from '../../../firebase';
import axios from 'axios';


export default function HomeScreen({ navigation }) {

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  const [Quote, setQuote] = useState("Loading...");
  const [Author, setAuthor] = useState("Loading...");
  
  const [isLoading, setIsLoading] = useState(false);
  const [greet, setGreet] = useState('');

  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const userDocRef = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid);
  
    // Set up a real-time listener for user data
    const unsubscribe = userDocRef.onSnapshot((snapshot) => {
      if (snapshot.exists) {
        setFirstname(snapshot.data().firstname);
        setLastname(snapshot.data().lastname);
        setProfileImage(snapshot.data().profileImage);
      } else {
        console.log('User does not exist');
      }
    });
  
    // Cleanup the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);


  // const randomQuote = () => {
    
  //   if (isLoading) {
  //     return;
  //   }

  //   setIsLoading(true);
  //   fetch("https://api.adviceslip.com/advice")
  //     .then((res) => res.json())
  //     .then((result) => {
  //       setQuote(result.slip.advice);
  //       setTitle(result.anime);
  //       setAuthor(result.character);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching quote:", error);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // };

  const randomQuote = () => {
    if (isLoading) {
      return;
    }
  
    const category = 'inspirational';
    setIsLoading(true);
  
    const apiKey = 'sEVaddHxJT7qO2s2AR8QKQ==6CtyHYmv2GTy7IEu';
  
    fetch(`https://api.api-ninjas.com/v1/quotes?category=${category}`, {
      headers: {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((result) => {
        console.log("API Response:", result);
        setQuote(result[0].quote);
        setAuthor(result[0].author);
      })
      .catch((error) => {
        console.error("Error fetching quote:", error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  

  useEffect( () => {
     randomQuote();
  }, []);



  const findGreet = () => {
    const hrs = new Date().getHours();
    if (hrs === 0 || hrs < 12) return setGreet('Morning! 🌄');
    if (hrs === 1 || hrs < 17) return setGreet('Afternoon! 🌞');
    setGreet('Evening! 🌇');
  };

  useEffect(() => {
    findGreet();
  }, []);

  return (
    <PaperProvider>
      <View style={styles.container}>
        <View style={styles.profileImage}>
          {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.image} resizeMode="cover" />
            ) : (
              <Image source={require("../../../assets/pfp.png")} style={styles.image} resizeMode="cover" />
            )}
        </View>
        <View style={styles.box1}>
          <View style={{alignSelf:'center', marginTop: 80}}>
            <Text style={{
              fontSize: 25,
              fontWeight:'bold', 
              textAlign:'center',
              color:'black',
              }}>{`Good ${greet}`}</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Profile")}
            style={styles.boxUsername}
          >
            <Text style={styles.usernameSettings}>{`${firstname} ${lastname}`}</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.box2}>
            <Text style={styles.quoteofthedayTitle}>Quote of the Day</Text>
            <FontAwesome5
              name="quote-left"
              style={styles.quoteLeft}
              color="white"
            ></FontAwesome5>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <Text style={styles.thequoteReal}>{Quote}</Text>
              <Text
                style={[
                  styles.quoteAuthor,
                  { textAlign: "right", marginTop: 3, marginTop: 20, marginRight: 20 },
                ]}
              >
                — {Author}
              </Text>
            
              <TouchableOpacity
                onPress={randomQuote}
                style={styles.newquoteButton}
                disabled={isLoading}
              >
                <Text style={styles.newquotebuttonText}>
                  {isLoading ? "Loading..." : "New Quote"}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </ScrollView>
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
    borderWidth: 10,
    borderColor: '#233DFD',
    backgroundColor: '#233DFD',
    marginTop: height * 0.05,
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: width * 0.3,
    overflow: "hidden",
    zIndex: 1,
    bottom: 20,
  },
  boxUsername: {
    backgroundColor: "#233DFD",
    borderRadius: 20,
    width: 'auto',
    height: 'auto',
    padding: 15,
    marginTop: 10,
    alignSelf: "center",
  },
  box1: {
    marginTop: -100,
    width: width * 0.8,
    height: 200,
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },
  usernameSettings: {
    fontSize: 30,
    fontWeight: "bold",
    zIndex: 1,
    color: "white",
  },
  box2: {
    marginTop: 10,
    width: width * 0.8,
    height: 'auto',
    backgroundColor: "#233DFD",
    borderRadius: 10,
    overflow: "hidden",
  },
  scrollContainer: {
    justifyContent: "space-between",
  },
  quoteofthedayTitle: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  quoteLeft: {
    fontSize: 20,
    alignSelf: "center",
    marginBottom: -25,
  },
  thequoteReal: {
    marginTop: 30,
    marginBottom: 20,
    fontSize: 15,
    fontWeight: "400",
    color: "white",
    letterSpacing: 1.1,
    lineHeight: 26,
    paddingHorizontal: 30,
    textAlign: "center",
  },
  quoteAuthor: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
    fontStyle: "italic",
  },
  newquoteButton: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 30,
    width: 250,
    marginTop: 15,
    marginBottom: 15,
    alignSelf: "center",
  },
  newquotebuttonText: {
    color: "#233DFD",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
});