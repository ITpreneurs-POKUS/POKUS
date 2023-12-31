import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getDeck } from "../utils/Api"; // Import getDeck
import styles from "../styles/styles";

const Deck = ({ id }) => {
  const dispatch = useDispatch();
  const [currentDeck, setCurrentDeck] = useState(null);
  const deck = useSelector((state) => state[id]);

  useEffect(() => {
    const fetchData = async () => {
      if (deck) {
        const updatedData = await getDeck(deck.title);
        setCurrentDeck(updatedData);
      }
    };

    fetchData();
  }, [deck, dispatch, id]);

  if (!deck) {
    return <View style={styles.deckContainer} />;
  }

  return (
    <View style={styles.deckContainer}>
      <View>
        <Text style={styles.deckText}>{deck.title}</Text>
      </View>
      <View>
        <Text style={styles.cardText}>{deck.questions.length} cards</Text>
      </View>
    </View>
  );
};

Deck.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Deck;
