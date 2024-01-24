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
import { firebase } from '../../../../../../../firebase'; // Make sure to import the correct path to your firebase module
import SearchBar from "../../SearchBar";
import Style from "./styles";
import Colors from "../../styles/colors";
import Notes from "../../RenderNotes";
import style from "./styles";

export default function Todolist({ navigation }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);

      const user = firebase.auth().currentUser;
      const userNotesRef = firebase.firestore().collection('users').doc(user.uid).collection('todoNotes');

      const unsubscribe = userNotesRef.onSnapshot((snapshot) => {
        const notesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setData(notesData);
        setLoading(false);
      });

      return () => {
        unsubscribe(); // Cleanup subscription on component unmount
      };
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
          style={Style.addNoteButton}
          onPress={() => navigation.navigate("AddNotes", { search: false })}
        >
          <AntDesign name="pluscircle" size={60} color={Colors.addButton} />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
