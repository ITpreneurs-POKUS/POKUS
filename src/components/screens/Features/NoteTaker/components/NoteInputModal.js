import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Text,
  StatusBar,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Alert
} from 'react-native';
import colors from '../misc/colors';
import RoundIconBtn from './RoundIconBtn';

const NoteInputModal = ({ visible, onClose, onSubmit, note, isEdit }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const handleModalClose = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (isEdit) {
      setTitle(note.title);
      setDesc(note.desc);
    }
  }, [isEdit]);

  const handleOnChangeText = (text, valueFor) => {
    if (valueFor === 'title') setTitle(text);
    if (valueFor === 'desc') setDesc(text);
  };

  const charCount = desc.length;

  const handleSubmit = () => {
    if (!title.trim() || !desc.trim()) {
      Alert.alert('Input Error', 'Please enter both title and description.');
      return onClose();
    }

    if (isEdit) {
      onSubmit(title, desc, Date.now());
    } else {
      onSubmit(title, desc);
      setTitle('');
      setDesc('');
    }
    onClose();
  };

  const closeModal = () => {
    if (!isEdit) {
      setTitle('');
      setDesc('');
    }
    onClose();
  };

  const ms = Date.now();

  const formatDate = (ms) => {
    const date = new Date(ms);
    const day = date.getDate();
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    let hrs = date.getHours().toString().padStart(2, '0');
    const min = date.getMinutes().toString().padStart(2, '0');
    const ampm = hrs >= 12 ? 'PM' : 'AM';
  
    // Convert hours to 12-hour format
    hrs = hrs % 12;
    hrs = hrs ? hrs : 12;
  
    return `${day} ${month} ${year} - ${hrs}:${min} ${ampm}`;
  };

  return (
    <>
      <StatusBar hidden />
      <Modal visible={visible} animationType='fade'>
        <View style={styles.container}>
          <View style={styles.textInputContainer}>
            <TextInput
              value={title}
              multiline={true}
              onChangeText={text => handleOnChangeText(text, 'title')}
              placeholder='Title'
              style={[styles.input, styles.title, {borderBottomWidth: 2}]}
            />
            <Text style={{marginBottom: 20}}>{formatDate(ms)}   |   {`${charCount} characters`}</Text>
            <ScrollView>
              <TextInput
                value={desc}
                multiline={true}
                placeholder='Start typing...'
                style={[styles.input, styles.desc]}
                onChangeText={text => handleOnChangeText(text, 'desc')}
              />
            </ScrollView>
          </View>
          <View style={styles.btnContainer}>
            <RoundIconBtn
              style={{backgroundColor: colors.SUCCESS }}
              iconName="check"
              onPress={handleSubmit}
            />
            {title.trim() || desc.trim() ? (
              <RoundIconBtn
                style={{ marginLeft: 15, backgroundColor: colors.ERROR }}
                iconName="close"
                onPress={closeModal}
              />
            ) : null}
          </View>
        </View>
        <TouchableWithoutFeedback onPress={handleModalClose}>
          <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  textInputContainer: {
    flex: 1,
  },
  input: {
    borderBottomColor: colors.DARK,
    fontSize: 20,
    color: colors.DARK,
  },
  title: {
    height: 'auto',
    fontWeight: 'bold',
    fontSize: 50,
  },
  desc: {
    height: 'auto',
    fontSize: 25,
  },
  modalBG: {
    flex: 1,
    zIndex: -1,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 15,
  },
});

export default NoteInputModal;
