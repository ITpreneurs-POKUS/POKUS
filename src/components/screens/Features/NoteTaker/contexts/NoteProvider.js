import React, { createContext, useContext, useEffect, useState } from 'react';
import { firebase } from '../../../../../../firebase';

const NoteContext = createContext();
const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  const findNotes = async () => {
    try {
      const user = firebase.auth().currentUser;
      if (!user) {
        console.error('User is not logged in');
        return;
      }

      const notesRef = firebase.firestore().collection('users').doc(user.uid).collection('userNotes');
      const snapshot = await notesRef.get();
      const updatedNotes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNotes(updatedNotes);
    } catch (error) {
      console.error('Error fetching notes from Firestore:', error.message || 'Something went wrong');
    }
  };


  useEffect(() => {
    findNotes();
  }, []);

  return (
    <NoteContext.Provider value={{ notes, setNotes, findNotes }}>
      {children}
    </NoteContext.Provider>
  );
};

export const useNotes = () => useContext(NoteContext);

export default NoteProvider;
