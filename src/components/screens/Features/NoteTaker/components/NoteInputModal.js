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

  const handleSubmit = () => {
    if (!title.trim() && !desc.trim()) return onClose();

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
              placeholder='TITLE'
              style={[styles.input, styles.title]}
            />
            <ScrollView>
              <TextInput
                value={desc}
                multiline={true}
                placeholder='Body'
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
    borderBottomWidth: 2,
    borderBottomColor: colors.DARK,
    fontSize: 20,
    color: colors.DARK,
  },
  title: {
    height: 'auto',
    marginBottom: 50,
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
