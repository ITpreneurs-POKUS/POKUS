import react, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  Text,
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
    if (route.params.note) {
      setNote(route.params.note);
    }
  }, [route.params.note]);

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
          onChangeText={(text) => setNote({ ...note, title: text })}
        ></TextInput>
        <TextInput
          style={styles.textInput}
          multiline={true}
          value={note.note}
          placeholder={"Description"}
          textAlignVertical="top"
          onChangeText={(text) => setNote({ ...note, note: text })}
        ></TextInput>

        <TouchableOpacity
          style={[
            styles.actionButton,
            {
              backgroundColor: "#017ce9",
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
          style={[styles.actionButton, { backgroundColor: "#2196f3" }]}
          onPress={() => saveNote(note, navigation)}
        >
          <Feather name="save" size={29} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: "#c70000" }]}
          onPress={() => delNote(note, navigation)}
        >
          <Feather name="trash-2" size={29} color="white" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default AddNotes;
