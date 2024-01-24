import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Alert } from 'react-native';
import colors from '../misc/colors';
import RoundIconBtn from './RoundIconBtn';
import { useNotes } from '../contexts/NoteProvider';
import NoteInputModal from './NoteInputModal';
import { firebase } from '../../../../../../firebase';

const formatDate = (ms) => {
  const date = new Date(ms);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  let hrs = date.getHours();
  const min = date.getMinutes().toString().padStart(2, '0');
  const ampm = hrs >= 12 ? 'PM' : 'AM';

  // Convert hours to 12-hour format
  hrs = hrs % 12;
  hrs = hrs ? hrs : 12;

  return `${month}/${day}/${year} - ${hrs}:${min} ${ampm}`;
};

const NoteDetail = (props) => {
  const [note, setNote] = useState(props.route.params.note);
  const { setNotes, notes } = useNotes();
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const deleteNote = async () => {
    try {
      const user = firebase.auth().currentUser;
      if (!user) {
        console.error('User is not logged in');
        return;
      }

      // Delete the note from Firestore
      await firebase.firestore().collection('users').doc(user.uid).collection('userNotes').doc(note.id).delete();

      // Update the local state
      const newNotes = notes.filter(n => n.id !== note.id);
      setNotes(newNotes);

      // Navigate back
      props.navigation.goBack();
    } catch (error) {
      console.error('Error deleting note from Firestore:', error.message || 'Something went wrong');
    }
  };

  const displayDeleteAlert = () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this note?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancelled deletion'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: deleteNote,
          style: 'destructive',
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const handleUpdate = async (title, desc, time) => {
    try {
      const user = firebase.auth().currentUser;
      if (!user) {
        console.error('User is not logged in');
        return;
      }

      const noteRef = firebase.firestore().collection('users').doc(user.uid).collection('userNotes').doc(note.id);

      // Update the note in Firestore
      await noteRef.update({
        title,
        desc,
        isUpdated: true,
        time,
      });

      // Update the local state
      const updatedNotes = notes.map(n => (n.id === note.id ? { ...n, title, desc, isUpdated: true, time } : n));
      setNotes(updatedNotes);
      setNote({ ...note, title, desc, isUpdated: true, time });
    } catch (error) {
      console.error('Error updating note in Firestore:', error.message || 'Something went wrong');
    }
  };

  const handleOnClose = () => setShowModal(false);

  const openEditModal = () => {
    setIsEdit(true);
    setShowModal(true);
  };

  return (
    <>
      <View style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={styles.container}
        >
          <Text style={styles.time}>
            {note.isUpdated
              ? `Updated At ${formatDate(note.time)}`
              : `Created At ${formatDate(note.time)}`}
          </Text>
          <Text style={styles.title}>{note.title}</Text>
          <Text>----------------------------------------------------------------------------------------------------------------</Text>
          <Text style={[styles.desc, {marginTop: 20}]}>{note.desc}</Text>
        </ScrollView>
      </View>
      <View style={styles.btnContainer}>
        <RoundIconBtn
          iconName="trash-can"
          style={{ backgroundColor: colors.ERROR, marginBottom: 15 }}
          onPress={displayDeleteAlert}
        />
        <RoundIconBtn 
          iconName="note-edit" 
          style={{ backgroundColor: colors.POKUS_SECONDARY }}
          onPress={openEditModal} />
      </View>
      <NoteInputModal
        isEdit={isEdit}
        note={note}
        onClose={handleOnClose}
        onSubmit={handleUpdate}
        visible={showModal}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  title: {
    fontSize: 50,
    color: colors.DARK,
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 25,
  },
  time: {
    textAlign: 'right',
    fontSize: 12,
    opacity: 0.5,
  },
  btnContainer: {
    position: 'absolute',
    right: 15,
    bottom: 50,
  },
});

export default NoteDetail;
