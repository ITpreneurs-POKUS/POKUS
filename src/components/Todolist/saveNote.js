import { Alert } from 'react-native';
import { firebase } from '../../../../../firebase'; // Update the path accordingly
import updateNote from './updateNote';

export default async function SaveNote(note, navigation) {
  async function getKey() {
    const user = firebase.auth().currentUser;

    if (!user) {
      console.error('User is not logged in');
      return null;
    }

    try {
      const userNotesRef = firebase.firestore().collection('users').doc(user.uid).collection('todoNotes');
      const userNotesSnapshot = await userNotesRef.get();

      if (userNotesSnapshot.empty) {
        // If the collection is empty, create a new document with ID 1
        await userNotesRef.doc('1').set({});
        return '1';
      } else {
        // Get the latest document ID and increment it
        const latestNote = userNotesSnapshot.docs[userNotesSnapshot.docs.length - 1];
        const latestId = String(Number(latestNote.id) + 1);

        // Create a new document with the incremented ID
        await userNotesRef.doc(latestId).set({});
        return latestId;
      }
    } catch (error) {
      console.error('Error getting key from Firestore:', error.message || 'Something went wrong');
      return null;
    }
  }

  if (note.note === '' || note.title === '') {
    Alert.alert(
      'ERROR',
      'There is an error!',
      [
        {
          text: 'OK',
          style: 'cancel'
        }
      ]
    );
  } else {
    try {
      let data = [];
      const user = firebase.auth().currentUser;

      if (note.id) {
        if (user) {
          const userNotesRef = firebase.firestore().collection('users').doc(user.uid).collection('todoNotes');
          const userNotesSnapshot = await userNotesRef.get();

          if (!userNotesSnapshot.empty) {
            data = userNotesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          }

          data = updateNote(data, note);
          await userNotesRef.doc(note.id).set({ ...note }); // Update the existing document
        }
      } else {
        note.id = await getKey();
        
        if (user) {
          const userNotesRef = firebase.firestore().collection('users').doc(user.uid).collection('todoNotes');
          const userNotesSnapshot = await userNotesRef.get();

          if (userNotesSnapshot.empty) {
            await userNotesRef.doc(note.id).set({ ...note }); // Create a new document with the given ID
          } else {
            data = userNotesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            data.push(note);
            await userNotesRef.doc(note.id).set({ ...note }); // Create a new document with the given ID
          }
        }
      }
      navigation.goBack();
    } catch (err) {
      console.log(err);
      Alert.alert(
        'ERROR',
        'Enter Some Info before Saving.',
        [
          {
            text: 'OK',
            style: 'cancel'
          }
        ]
      );
    }
  }
}
