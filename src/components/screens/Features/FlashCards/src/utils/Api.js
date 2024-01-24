import { firebase } from '../../../../../../../firebase';
import { decks } from "./_Data";

const userCollectionKey = "users";
const deckCollectionKey = "decks";

// Function to format deck results
function formatDeckResults(results) {
  return results === null ? decks : JSON.parse(results);
}

// Function to get the current user's ID
function getCurrentUserId() {
  const user = firebase.auth().currentUser;

  if (!user) {
    console.error('User is not logged in');
    return null;
  }

  return user.uid;
}

// Function to get decks
export async function getDecks() {
  try {
    const userId = getCurrentUserId();

    if (!userId) {
      return [];
    }

    const userCollectionRef = firebase.firestore().collection(userCollectionKey);
    const deckCollectionRef = userCollectionRef.doc(userId).collection(deckCollectionKey);

    const snapshot = await deckCollectionRef.get();

    if (snapshot.empty) {
      // If collection is empty, set default decks
      await deckCollectionRef.doc(deckCollectionKey).set({ decks });
      return decks;
    }

    return snapshot.docs[0].data().decks;
  } catch (err) {
    console.log(err);
  }
}

// Function to get a specific deck
export async function getDeck(id) {
  try {
    const userId = getCurrentUserId();

    if (!userId) {
      return null;
    }

    const userCollectionRef = firebase.firestore().collection(userCollectionKey);
    const deckCollectionRef = userCollectionRef.doc(userId).collection(deckCollectionKey);

    const snapshot = await deckCollectionRef.doc(deckCollectionKey).get();
    const decksData = snapshot.data()?.decks;

    return decksData ? decksData[id] : null;
  } catch (err) {
    console.log(err);
    return null;
  }
}

// Function to save a deck title
export async function saveDeckTitleAS(title) {
  try {
    const userId = getCurrentUserId();

    if (!userId) {
      return;
    }

    const userCollectionRef = firebase.firestore().collection(userCollectionKey);
    const deckCollectionRef = userCollectionRef.doc(userId).collection(deckCollectionKey);

    const snapshot = await deckCollectionRef.doc(deckCollectionKey).get();
    const decksData = snapshot.data()?.decks || {};

    decksData[title] = {
      title,
      questions: [],
    };

    await deckCollectionRef.doc(deckCollectionKey).set({ decks: decksData });
  } catch (err) {
    console.log(err);
  }
}

// Function to remove a deck
export async function removeDeckAS(key) {
  try {
    const userId = getCurrentUserId();

    if (!userId) {
      return;
    }

    const userCollectionRef = firebase.firestore().collection(userCollectionKey);
    const deckCollectionRef = userCollectionRef.doc(userId).collection(deckCollectionKey);

    const snapshot = await deckCollectionRef.doc(deckCollectionKey).get();
    const decksData = snapshot.data().decks;

    delete decksData[key];

    await deckCollectionRef.doc(deckCollectionKey).set({ decks: decksData });
  } catch (err) {
    console.log(err);
  }
}

// Function to add a card to a deck
export async function addCardToDeckAS(title, card) {
  try {
    const userId = getCurrentUserId();

    if (!userId) {
      return;
    }

    const userCollectionRef = firebase.firestore().collection(userCollectionKey);
    const deckCollectionRef = userCollectionRef.doc(userId).collection(deckCollectionKey);

    const snapshot = await deckCollectionRef.doc(deckCollectionKey).get();
    const decksData = snapshot.data().decks;
    const deck = decksData[title];

    deck.questions = [...deck.questions, card];

    await deckCollectionRef.doc(deckCollectionKey).set({ decks: decksData });
  } catch (err) {
    console.log(err);
  }
}

// Function to reset decks
export async function resetDecks() {
  try {
    const userId = getCurrentUserId();

    if (!userId) {
      return;
    }

    const userCollectionRef = firebase.firestore().collection(userCollectionKey);
    const deckCollectionRef = userCollectionRef.doc(userId).collection(deckCollectionKey);

    await deckCollectionRef.doc(deckCollectionKey).set({ decks });
  } catch (err) {
    console.log(err);
  }
}
