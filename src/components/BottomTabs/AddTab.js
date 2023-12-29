import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

export default function AddTab() {
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');

  const handleAddNote = () => {
    if (noteTitle.trim() === '' || noteContent.trim() === '') {
      Alert.alert('Error', 'Both title and content are required.');
      return;
    }
    
    // Assuming you have a function to add a new note
    // Replace this with your actual logic to add a note
    // For example, you can use Redux or state management library
    // to update the notes in your application state.

    // For now, we'll just log the new note details.
    console.log('Adding Note:', { title: noteTitle, content: noteContent });

    // Clear the input fields after adding a note
    setNoteTitle('');
    setNoteContent('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add New Note</Text>
      <TextInput
        style={styles.input}
        placeholder="Note Title"
        value={noteTitle}
        onChangeText={(text) => setNoteTitle(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Note Content"
        multiline
        numberOfLines={4}
        value={noteContent}
        onChangeText={(text) => setNoteContent(text)}
      />
      <Button title="Add Note" onPress={handleAddNote} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
});
