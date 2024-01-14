import React, { useCallback } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Deck from "./Deck";
import { removeDeck } from "../actions/index";
import { removeDeckAS } from "../utils/Api";
import styles from "../styles/styles";
import { Feather } from "@expo/vector-icons";
const DeckDetail = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { title } = route.params;
  const deck = useSelector((state) => state[title]);

  const handleDelete = useCallback(() => {
    dispatch(removeDeck(deck.title));
    removeDeckAS(deck.title);
    navigation.goBack();
  }, [dispatch, deck, navigation]);

  return (
    <View style={[styles.container, { flex: 1 }]}>
      <View style={[styles.headerContainer, {marginBottom: '10%'}]}>
        <TouchableOpacity
          style={styles.arrowContainer}
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" style={styles.arrow} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit The Deck</Text>
      </View>

      <Deck id={deck.title} />
      <View style={[styles.deckBtnContainer, { marginTop: "10%" }]}>
        <TouchableOpacity
          style={[
            styles.submitContainer,
            { backgroundColor: "#101A6B", marginRight: "5%" },
          ]}
          onPress={() => navigation.navigate("AddCard", { title: deck.title })}
        >
          <Text
            style={[styles.textDefault, { fontSize: 15, fontWeight: "bold" }]}
          >
            Add Card
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.submitContainer, { backgroundColor: "#017CE9" }]}
          onPress={() => navigation.navigate("Quiz", { title: deck.title })}
        >
          <Text
            style={[styles.textDefault, { fontSize: 15, fontWeight: "bold" }]}
          >
            Start Quiz
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[
          styles.submitContainer,
          { backgroundColor: "#c70000", marginTop: "10%" },
        ]}
        onPress={handleDelete}
      >
        <Text
          style={[styles.textDefault, { fontSize: 15, fontWeight: "bold" }]}
        >
          Delete Deck
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DeckDetail;
