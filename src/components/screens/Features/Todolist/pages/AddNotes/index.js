import React, { useEffect, useState } from "react";
import { //WORKING TO VERSION
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  Text,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import styles from "./styles";
import saveNote from "../../saveNote";
import delNote from "../../delNote";
import ModalNotification from "../../Notification";

function AddNotes({ route, navigation }) {
  const [date, setDate] = useState(new Date());
  const [note, setNote] = useState({
    title: "",
    note: "",
    date: date,
    notificationId: null,
  });
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    console.log('test');
    if (route.params.note) {
      console.log('test2', route.params.note);
      const { Date: noteDate, Note, Notification_id, Title, id } = route.params.note;
      const formattedDate = noteDate ? new Date(noteDate.seconds * 1000) : null;
      const formattedNote = {
        date: formattedDate,
        note: Note,
        notificationId: Notification_id,
        title: Title,
        id: id,
      };
      setNote(formattedNote);
    }
  }, [route.params.note]);

  const handleSaveNote = () => {
    try {
      const noteToSave = {
        id: note.id,
        title: note.title,
        note: note.note,
        date: note.scheduledDate || null,
        notificationId: note.notificationId,
      };
      console.log("Addnote:", noteToSave.date);
      saveNote(noteToSave, navigation, note);
    } catch (error) {
      console.error("Error saving note:", error);
      Alert.alert("Error", "Failed to save note.", [{ text: "OK" }]);
    }
  };

  const handleDeleteNote = () => {
    try {
      delNote(note, navigation);
    } catch (error) {
      Alert.alert("Error", "Failed to delete note.", [{ text: "OK" }]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.arrowContainer}
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" style={styles.arrow} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Task</Text>
      </View>
      <ScrollView style={styles.body}>
        <TextInput
          style={styles.textTitleNote}
          autoFocus={true}
          maxLength={40}
          value={note.title}
          placeholder={"Title"}
          onChangeText={(text) => {
            console.log('Title:', text);
            setNote({ ...note, title: text });
          }}
        />
        <TextInput
          style={styles.textInput}
          multiline={true}
          value={note.note}
          placeholder={"Description"}
          textAlignVertical="top"
          onChangeText={(text) => {
            console.log('Note:', text);
            setNote({ ...note, note: text });
          }}
        />

        <TouchableOpacity
          style={[
            styles.actionButton,
            {
              backgroundColor: "#101A6B",
              alignSelf: "center",
              width: "35%",
              marginTop: 20,
            },
          ]}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 14 }}>
            Set Timer
          </Text>
        </TouchableOpacity>

        <ModalNotification
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          date={date}
          setDate={setDate}
          note={note}
          setNote={setNote}
          onSchedule={(scheduledDate) => setNote({ ...note, scheduledDate, notificationId })}
        />
      </ScrollView>

      <KeyboardAvoidingView
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 10,
          position: "absolute",
          bottom: 0,
        }}
      >
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: "#017CE9" }]}
          onPress={handleSaveNote}
        >
          <Feather name="save" size={29} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: "#c70000" }]}
          onPress={handleDeleteNote}
        >
          <Feather name="trash-2" size={29} color="white" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default AddNotes;