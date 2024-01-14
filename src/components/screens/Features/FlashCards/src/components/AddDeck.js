// AddDeck.js
import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { connect } from "react-redux";
import { addDeck } from "../actions/index";
import { saveDeckTitleAS } from "../utils/Api";
import styles from "../styles/styles";

const AddDeck = ({ addDeck, navigation }) => {
  const [text, setText] = useState("");

  const handleChange = (inputText) => {
    setText(inputText);
  };

  const handleSubmit = () => {
    addDeck(text);
    saveDeckTitleAS(text);
    navigation.navigate("DeckDetail", { title: text });

    setText("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <View style={styles.block}>
          <Text style={styles.title2}>Write your deck title</Text>
        </View>
        <View>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={[
              styles.input,
              styles.block,
              { textAlign: "center", height: 60 },
            ]}
            value={text}
            onChangeText={handleChange}
            placeholder="Deck Name"
            autoFocus={true}
            returnKeyType="done"
            onSubmitEditing={handleSubmit}
          />
        </View>
        <TouchableOpacity
          style={[styles.submitContainer, { backgroundColor: "#101A6B" }]}
          onPress={handleSubmit}
          disabled={text === ""}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 14 }}>
            Create Deck
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

AddDeck.propTypes = {
  addDeck: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default connect(null, { addDeck })(AddDeck);
