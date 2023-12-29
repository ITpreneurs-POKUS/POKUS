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
import SearchBar from "../../TodoApp/SearchBar";
import Colors from "../../TodoApp/styles/colors";
import Notes from "../../TodoApp/RenderNotes";
import styles from "../Styles/Todostyles";

export default function Todolist({ navigation }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      const getData = async () => {
        try {
          let notes = await AsyncStorage.getItem("notes");
          if (notes === undefined || notes === null) {
            notes = "[]";
          }
          if (notes.length > 0 && notes[0] !== "[") {
            notes = `[${notes}]`;
          }
          setData(JSON.parse(notes));
          setLoading(false);
        } catch (err) {
          console.log(err);
          alert("Error loading notes");
        }
      };
      getData();
    }, [])
  );
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
          styles.container,
          {
            marginLeft: Platform.OS === "android" ? 0 : 20,
            marginRight: Platform.OS === "android" ? 0 : 20,
          },
        ]}
      >
  
        <View style = {styles.list}>
          <SearchBar data={data} onChange={setData} />
          <FlatList
            ListEmptyComponent={
              <Text style={[styles.list, { textAlign: "center" }]}>
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
          style={styles.addNoteButton}
          onPress={() => navigation.navigate("AddNotes", { search: false })}
        >
          <AntDesign name="pluscircle" size={60} color={'#101A6B'} />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
