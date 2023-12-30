import { ScrollView, StyleSheet, TextInput, View, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'
import RoundIconBtn from '../component/RoundIconBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddTab({navigation}) {

  const [title, setTitle] = React.useState('');
  const [desc, setDesc] = React.useState('');

  const handleClose = () => {
    Keyboard.dismiss();
  };

  const handleOnChangeText = (text, valueFor) => {
    if(valueFor === 'title') setTitle(text);
    if(valueFor === 'desc') setDesc(text);
  }

  console.log(title, desc);


  const handleSubmit = async () => {
    if (!title.trim() || !desc.trim()) {
      alert('Title and description cannot be empty');
    } else {
      const note = { id: Date.now(), title, desc, time: Date.now() };
      
      try {
        // Get existing notes from AsyncStorage
        const existingNotes = await AsyncStorage.getItem('notes');
        const parsedNotes = existingNotes ? JSON.parse(existingNotes) : [];
  
        // Add the new note to the existing notes
        parsedNotes.push(note);
  
        // Save the updated notes back to AsyncStorage
        await AsyncStorage.setItem('notes', JSON.stringify(parsedNotes));
  
        // Navigate to HomeTab with the new note
        navigation.navigate('HomeTab', { note });
  
        // Dismiss keyboard and reset input fields
        Keyboard.dismiss();
        setTitle('');
        setDesc('');
  
      } catch (error) {
        console.error('Error saving note to AsyncStorage:', error);
      }
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <TextInput
          multiline={true}
          placeholder='Title'
          value={title}
          onChangeText={(text) => handleOnChangeText(text, 'title')}
          style={[styles.input, styles.title]} />
        <ScrollView>
          <TextInput 
            multiline={true}
            placeholder='Description' 
            value={desc}
            onChangeText={(text) => handleOnChangeText(text, 'desc')}
            style={[styles.input, styles.desc]} />
        </ScrollView>
      </View>

      <View style={styles.buttonContainer}>
          <RoundIconBtn size={30} antIconName='check' style={{width: 60}} onPress={handleSubmit}/>
      </View>
      
      <TouchableWithoutFeedback onPress={handleClose}>
          <View 
            style={[styles.textInputContainerBackground, StyleSheet.absoluteFillObject]}
          />
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  textInputContainer: {
    flex: 1,
    marginVertical: 15,
  },
  input: {
    fontSize: 20,
    color: 'black',
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  title: {
    height: 'auto',
    marginBottom: 15,
    fontWeight: 'bold',
  },
  desc: {
    height: 'auto',
  },
  buttonContainer: {
    alignItems: 'flex-end',
    marginBottom: 15,
  },
  textInputContainerBackground: {
    flex: 1,
    zIndex: -1,
  },
});