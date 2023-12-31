import AsyncStorage from "@react-native-async-storage/async-storage";
import { decks } from "./_Data";

const deckStorageKey = "MainFlashcards:decks";

function formatDeckResults(results) {
  return results === null ? decks : JSON.parse(results);
}

export function getDecksOld() {
  return AsyncStorage.getItem(deckStorageKey).then(formatDeckResults);
}

export async function getDecks() {
  try {
    const storeResults = await AsyncStorage.getItem(deckStorageKey);

    if (storeResults === null) {
      AsyncStorage.setItem(deckStorageKey, JSON.stringify(decks));
    }

    return storeResults === null ? decks : JSON.parse(storeResults);
  } catch (err) {
    console.log(err);
  }
}

export async function getDeck(id) {
  try {
    const storeResults = await AsyncStorage.getItem(deckStorageKey);

    return JSON.parse(storeResults)[id];
  } catch (err) {
    console.log(err);
  }
}

export async function saveDeckTitleAS(title) {
  try {
    await AsyncStorage.mergeItem(
      deckStorageKey,
      JSON.stringify({
        [title]: {
          title,
          questions: [],
        },
      })
    );
  } catch (err) {
    console.log(err);
  }
}

export async function removeDeckAS(key) {
  try {
    const results = await AsyncStorage.getItem(deckStorageKey);
    const data = JSON.parse(results);
    data[key] = undefined;
    delete data[key];
    AsyncStorage.setItem(deckStorageKey, JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
}

export async function addCardToDeckAS(title, card) {
  try {
    const deck = await getDeck(title);

    await AsyncStorage.mergeItem(
      deckStorageKey,
      JSON.stringify({
        [title]: {
          questions: [...deck.questions].concat(card),
        },
      })
    );
  } catch (err) {
    console.log(err);
  }
}
export async function resetDecks() {
  try {
    await AsyncStorage.setItem(deckStorageKey, JSON.stringify(decks));
  } catch (err) {
    console.log(err);
  }
}
