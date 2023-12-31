import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Swiper from "react-native-swiper";
import styles from "../styles/styles";
import { Feather } from "@expo/vector-icons";

const screen = {
  QUESTION: "question",
  ANSWER: "answer",
  RESULT: "result",
};
const answer = {
  CORRECT: "correct",
  INCORRECT: "incorrect",
};

const QuizAndroid = ({ deck }) => {
  const navigation = useNavigation();
  const [show, setShow] = useState(screen.QUESTION);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answered, setAnswered] = useState(
    Array(deck.questions.length).fill(0)
  );

  const handleAnswer = (response, page) => {
    if (response === answer.CORRECT) {
      setCorrect((prevCorrect) => prevCorrect + 1);
    } else {
      setIncorrect((prevIncorrect) => prevIncorrect + 1);
    }

    setAnswered((prevAnswered) =>
      prevAnswered.map((val, idx) => (page === idx ? 1 : val))
    );

    if (questionIndex + 1 === deck.questions.length) {
      // If it's the last question, show the result
      setShow(screen.RESULT);
    } else {
      setQuestionIndex((prevIndex) => prevIndex + 1);
      setShow(screen.QUESTION);
    }
  };

  const handleReset = () => {
    setShow(screen.QUESTION);
    setCorrect(0);
    setIncorrect(0);
    setAnswered(Array(deck.questions.length).fill(0));
    setQuestionIndex(0);
  };

  if (deck.questions.length === 0) {
    return (
      <View style={styles.container}>
        <View style={[styles.headerContainer, { marginBottom: "10%" }]}>
          <TouchableOpacity
            style={styles.arrowContainer}
            onPress={() => navigation.goBack()}
          >
            <Feather name="arrow-left" style={styles.arrow} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit The Deck</Text>
        </View>
        <View style={styles.block}>
          <Text style={[styles.count, { textAlign: "center", fontSize: 15 }]}>
            You cannot take a quiz because there are no cards in the deck.
          </Text>
          <Text style={[styles.count, { textAlign: "center", marginTop: 30 }]}>
            Please add some cards and try again.
          </Text>
        </View>
      </View>
    );
  }

  if (show === screen.RESULT) {
    const percent = ((correct / deck.questions.length) * 100).toFixed(0);
    const resultStyle =
      percent >= 70 ? styles.resultTextGood : styles.resultTextBad;

    return (
      <View>
        <View style={[styles.headerContainer, { marginBottom: "10%" }]}>
          <TouchableOpacity
            style={styles.arrowContainer}
            onPress={() => navigation.goBack()}
          >
            <Feather name="arrow-left" style={styles.arrow} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Return to the Deck</Text>
        </View>

        <View style={styles.block}>
          <Text
            style={[styles.count, { textAlign: "center", fontWeight: "bold" }]}
          >
            Quiz Complete!
          </Text>
          <Text style={styles.resultStyle}>
            {correct} / {deck.questions.length} correct
          </Text>
        </View>
        <View style={[styles.block, styles.deckContainer, { minHeight: 130 }]}>
          <Text
            style={[
              styles.count,
              { textAlign: "center", top: 15, position: "absolute" },
            ]}
          >
            Percentage correct
          </Text>
          <Text style={[styles.resultStyle, { fontWeight: "bold" }]}>
            {percent}%
          </Text>
        </View>
        <View style={[styles.deckBtnContainer, { marginTop: "10%" }]}>
          <TouchableOpacity
            style={[
              styles.submitContainer,
              { backgroundColor: "#101A6B", marginBottom: 20 },
            ]}
            onPress={handleReset}
          >
            <Text
              style={[styles.textDefault, { fontSize: 15, fontWeight: "bold" }]}
            >
              Restart Quiz
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.submitContainer,
              { backgroundColor: "#017CE9", marginBottom: 20 },
            ]}
            onPress={() => {
              handleReset();
              navigation.goBack();
            }}
          >
            <Text
              style={[styles.textDefault, { fontSize: 15, fontWeight: "bold" }]}
            >
              Go Back
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.submitContainer, { marginBottom: 20 }]}
          onPress={() => {
            handleReset();
            navigation.navigate("DeckList");
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 20, color: "#101A6B" }}>
            Home
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <Swiper
      style={styles.container}
      scrollEnabled={true}
      loop={false}
      index={questionIndex}
      showsPagination={false}
    >
      {deck.questions.map((question, idx) => (
        <View key={idx}>
          <View style={[styles.headerContainer, { marginBottom: "10%" }]}>
            <TouchableOpacity
              style={styles.arrowContainer}
              onPress={() => navigation.goBack()}
            >
              <Feather name="arrow-left" style={styles.arrow} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Return to the Deck</Text>
          </View>

          <View style={[styles.block, { left: 20 }]}>
            <Text style={[styles.count, { fontWeight: "bold" }]}>
              {idx + 1} / {deck.questions.length}
            </Text>
          </View>
          <View
            style={[
              styles.block,
              styles.deckContainer,
              { minHeight: 200, marginBottom: 20 },
            ]}
          >
            <Text style={styles.QorA}>
              {show === screen.QUESTION ? "Question" : "Answer"}
            </Text>
            <View>
              <Text style={styles.QorAStatement}>
                {show === screen.QUESTION ? question.question : question.answer}
              </Text>
            </View>
          </View>
          {show === screen.QUESTION ? (
            <TouchableOpacity
              style={[styles.submitContainer, { marginBottom: 20 }]}
              onPress={() => setShow(screen.ANSWER)}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 20, color: "#101A6B" }}
              >
                Show Answer
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.submitContainer, { marginBottom: 20 }]}
              onPress={() => setShow(screen.QUESTION)}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 20, color: "#101A6B" }}
              >
                Show Question
              </Text>
            </TouchableOpacity>
          )}
          <View style={[styles.deckBtnContainer]}>
            <TouchableOpacity
              style={[styles.submitContainer, { backgroundColor: "#101A6B" }]}
              onPress={() => handleAnswer(answer.CORRECT, idx)}
              disabled={answered[idx] === 1}
            >
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 14 }}>
                Correct
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.submitContainer, { backgroundColor: "#c70000" }]}
              onPress={() => handleAnswer(answer.INCORRECT, idx)}
              disabled={answered[idx] === 1}
            >
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 14 }}>
                Incorrect
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </Swiper>
  );
};

QuizAndroid.propTypes = {
  deck: PropTypes.object.isRequired,
};

const mapStateToProps = (state, { title }) => {
  const deck = state[title];

  return {
    deck,
  };
};

export default connect(mapStateToProps)(QuizAndroid);
