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

export default function HomeScreen({ navigation }) {
  const randomQuote = () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    fetch("https://api.quotable.io/random")
      .then((res) => res.json())
      .then((result) => {
        console.log(result.content);
        setQuote(result.content);
        setAuthor(result.author);
      })
      .catch((error) => {
        console.error("Error fetching quote:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    randomQuote();
  }, []);

  const [Quote, setQuote] = useState("Loading...");
  const [Author, setAuthor] = useState("Loading...");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <PaperProvider>
      <View style={styles.container}>
        <View style={styles.profileImage}>
          <Image
            source={require("../../../assets/pfp.png")}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.box1}>
          <TouchableOpacity
            onPress={() => navigation.navigate("EditProfile")}
            style={styles.boxUsername}
          >
            <Text style={styles.usernameSettings}>Febby Malacaste</Text>
          </TouchableOpacity>
        </View>
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
                { textAlign: "center", marginTop: 3 },
              ]}
            >
              — {Author}
            </Text>
          </ScrollView>
          <TouchableOpacity
            onPress={randomQuote}
            c
            style={styles.newquoteButton}
            disabled={isLoading}
          >
            <Text style={styles.newquotebuttonText}>
              {isLoading ? "Loading..." : "New Quote"}
            </Text>
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
    marginTop: height * 0.05,
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: width * 0.3,
    overflow: "hidden",
    zIndex: 1,
  },
  boxUsername: {
    backgroundColor: "#233DFD",
    borderRadius: 30,
    width: 250,
    height: 60,
    marginTop: 60,
    alignSelf: "center",
  },
  box1: {
    marginTop: -70,
    width: width * 0.8,
    height: 130,
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },
  usernameSettings: {
    marginTop: 20,
    alignSelf: "center",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    zIndex: 1,
    color: "white",
  },
  box2: {
    marginTop: 10,
    width: width * 0.8,
    height: 350,
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
