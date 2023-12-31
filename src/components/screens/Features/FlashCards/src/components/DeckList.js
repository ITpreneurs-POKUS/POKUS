import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { connect } from "react-redux";
import { handleInitialData } from "../actions";
import Deck from "./Deck";
import styles from "../styles/styles";

const DeckList = ({ navigation, decks, handleInitialData }) => {
  useEffect(() => {
    handleInitialData();
  }, [handleInitialData]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        {Object.values(decks).map((deck) => (
          <TouchableOpacity
            key={deck.title}
            onPress={() =>
              navigation.navigate("DeckDetail", { title: deck.title })
            }
          >
            <Deck id={deck.title} />
          </TouchableOpacity>
        ))}
        <View style={{ marginBottom: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

DeckList.propTypes = {
  navigation: PropTypes.object.isRequired,
  handleInitialData: PropTypes.func.isRequired,
  decks: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ decks: state });

export default connect(mapStateToProps, { handleInitialData })(DeckList);
