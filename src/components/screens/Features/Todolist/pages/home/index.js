import React, { useState } from "react";
import {
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db, firebase } from "../../../../../../../firebase";
import SearchBar from "../../SearchBar";
import Notes from "../../RenderNotes";
import style from "./styles";
import Colors from "../../styles/colors";

export default function Todolist({ navigation }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const userTodoCollection = collection(
            db,
            "user",
            firebase.auth().currentUser.uid,
            "userTodo"
          );

          const q = query(userTodoCollection);

          const querySnapshot = await getDocs(q);
          const notesData = [];
          querySnapshot.forEach((doc) => {
            notesData.push({ id: doc.id, ...doc.data() });
          });

          setData(notesData);
          setLoading(false);

          // Fetch data from AsyncStorage
          const localNotes = await AsyncStorage.getItem("todoNotes");
          const localNotesData = localNotes ? JSON.parse(localNotes) : [];

          // Merge local and Firestore data
          const mergedData = [...notesData, ...localNotesData];
          setData(mergedData);
        } catch (err) {
          console.log(err);
          alert("Error loading notes");
        }
      };

      fetchData();
    }, [])
  );

  const syncWithFirestore = async (newData) => {
    try {
      const userTodoCollection = collection(
        db,
        "user",
        firebase.auth().currentUser.uid,
        "userTodo"
      );

      // Identify which notes are not yet in Firestore
      const localNotes = await AsyncStorage.getItem("todoNotes");
      const localNotesData = localNotes ? JSON.parse(localNotes) : [];
      const notesToAdd = newData.filter(
        (note) => !localNotesData.some((localNote) => localNote.id === note.id)
      );

      // Add new notes to Firestore
      for (const note of notesToAdd) {
        await addDoc(userTodoCollection, note);
      }

      // Update existing notes in Firestore
      for (const note of newData) {
        const noteRef = doc(userTodoCollection, note.id);
        await updateDoc(noteRef, note);
      }

      // Update local storage with the latest data from Firestore
      await AsyncStorage.setItem("todoNotes", JSON.stringify(newData));
    } catch (err) {
      console.error("Error syncing with Firestore:", err);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size={"large"} color={Colors.loading} />
      </View>
    );
  } else {
    return (
      <SafeAreaView
        style={[
          style.container,
          {
            marginLeft: Platform.OS === "android" ? 0 : 20,
            marginRight: Platform.OS === "android" ? 0 : 20,
          },
        ]}
      >
        <View style={style.list}>
          <SearchBar data={data} onChange={setData} />
          <FlatList
            ListEmptyComponent={
              <Text style={[style.list, { textAlign: "center" }]}>
                No Data!
              </Text>
            }
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              return <Notes item={item} navigation={navigation} />;
            }}
          />
        </View>

        <TouchableOpacity
          style={style.addNoteButton}
          onPress={() => navigation.navigate("AddNotes", { search: false })}
        >
          <AntDesign name="pluscircle" size={60} color={Colors.addButton} />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
