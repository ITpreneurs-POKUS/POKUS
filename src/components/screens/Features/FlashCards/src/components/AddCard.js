import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { addCardToDeckAS, getDeck } from "../utils/Api"; // Import getDeck
import styles from "../styles/styles";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { addCardToDeck } from "../actions";
import { Feather } from "@expo/vector-icons";

const AddCard = ({ navigation, route }) => {
  const { title } = route.params;
  const dispatch = useDispatch();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleQuestionChange = (text) => {
    setQuestion(text);
  };

  const handleAnswerChange = (text) => {
    setAnswer(text);
  };

  const handleSubmit = async () => {
    const card = {
      question,
      answer,
    };
    dispatch(addCardToDeck(title, card));
    await addCardToDeckAS(title, card);
    const updatedData = await getDeck(title);

    setQuestion("");
    setAnswer("");
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.arrowContainer}
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" style={styles.arrow} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add A Card</Text>
      </View>

      <View style={styles.body}>
        <View style={styles.block}>
          <Text style={styles.title2}>Write your question</Text>
        </View>
        <View style={styles.block}>
          <Text style={styles.label}>Answer</Text>
          <TextInput
            multiline={true}
            style={[styles.input, { fontWeight: "bold" }]}
            value={answer}
            autoFocus={true}
            onChangeText={handleAnswerChange}
            placeholder="Answer"
            ref={(input) => {
              answerTextInput = input;
            }}
            returnKeyType="done"
            onSubmitEditing={handleSubmit}
          />
        </View>
        <View style={styles.block}>
          <Text style={styles.label}>Question</Text>

          <TextInput
            textAlignVertical="top"
            style={[styles.input, { height: 150 }]}
            value={question}
            onChangeText={handleQuestionChange}
            placeholder="Question"
            returnKeyType="next"
            onSubmitEditing={() => answerTextInput.focus()}
            blurOnSubmit={false}
          />
        </View>
        <TouchableOpacity
          style={[styles.submitContainer, { backgroundColor: "#101A6B" }]}
          onPress={handleSubmit}
          disabled={question === "" || answer === ""}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 14 }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }} />
    </SafeAreaView>
  );
};

AddCard.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default AddCard;
