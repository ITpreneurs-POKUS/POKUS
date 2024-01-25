import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from 'react-native';
import Note from '../components/Note';
import NoteInputModal from '../components/NoteInputModal';
import NotFound from '../components/NotFound';
import RoundIconBtn from '../components/RoundIconBtn';
import SearchBar from '../components/SearchBar';
import { useNotes } from '../contexts/NoteProvider';
import colors from '../misc/colors';
import { firebase } from '../../../../../../firebase';

const reverseData = data => {
  return data.sort((a, b) => {
    const aInt = parseInt(a.time);
    const bInt = parseInt(b.time);
    if (aInt < bInt) return 1;
    if (aInt == bInt) return 0;
    if (aInt > bInt) return -1;
  });
};

const NoteScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [resultNotFound, setResultNotFound] = useState(false);

  const { notes, setNotes, findNotes } = useNotes();

  React.useEffect(() => {
    const unsubscribe = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('userNotes').onSnapshot((snapshot) => {
      const updatedNotes = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setNotes(updatedNotes);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const reverseNotes = reverseData(notes);

  const handleOnSubmit = async (title, desc) => {
    try {
      const user = firebase.auth().currentUser;
  
      if (!user) {
        // Handle the case where the user is not logged in
        console.error('User is not logged in');
        return;
      }
  
      const noteRef = firebase.firestore().collection('users').doc(user.uid).collection('userNotes').doc();
  
      const note = {
        id: noteRef.id,
        title,
        desc,
        time: Date.now(),
      };
  
      // Store the note in Firestore
      await noteRef.set(note);
  
      // Update the local state
      const updatedNotes = [...notes, note];
      setNotes(updatedNotes);
    } catch (error) {
      console.error('Error storing note in Firestore:', error.message || 'Something went wrong');
    }
  };

  const openNote = note => {
    navigation.navigate('NoteDetail', { note });
  };

  const handleOnSearchInput = async text => {
    setSearchQuery(text);
    if (!text.trim()) {
      setSearchQuery('');
      setResultNotFound(false);
      return await findNotes();
    }
    const filteredNotes = notes.filter(note => {
      if (note.title.toLowerCase().includes(text.toLowerCase())) {
        return note;
      }
    });

    if (filteredNotes.length) {
      setNotes([...filteredNotes]);
    } else {
      setResultNotFound(true);
    }
  };

  const handleOnClear = async () => {
    setSearchQuery('');
    setResultNotFound(false);
    await findNotes();
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {notes.length ? (
            <SearchBar
              value={searchQuery}
              onChangeText={handleOnSearchInput}
              containerStyle={{ marginVertical: 15 }}
              onClear={handleOnClear}
            />
          ) : null}

          {resultNotFound ? (
            <NotFound />
          ) : (
            <FlatList
              data={reverseNotes}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <Note onPress={() => openNote(item)} item={item} />
              )}
            />
          )}

          {!notes.length ? (
            <View
              style={[
                StyleSheet.absoluteFillObject,
                styles.emptyHeaderContainer,
              ]}
            >
              <Text style={styles.emptyHeader}>Add Notes</Text>
            </View>
          ) : null}
        </View>
      </TouchableWithoutFeedback>

      <RoundIconBtn
        onPress={() => setModalVisible(true)}
        iconName='plus'
        style={styles.addBtn}
      />
      
      <NoteInputModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleOnSubmit}
      />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  container: {
    paddingHorizontal: 20,
    flex: 1,
    zIndex: 1,
  },
  emptyHeader: {
    fontSize: 30,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    opacity: 0.2,
  },
  emptyHeaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  addBtn: {
    position: 'absolute',
    right: 15,
    marginBottom: 20,
    bottom: 50,
    zIndex: 1,
    backgroundColor: colors.POKUS,
    shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.24,
        elevation: 5
  },
});

export default NoteScreen;
