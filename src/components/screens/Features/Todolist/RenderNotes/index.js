import { View, TouchableOpacity, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import styles from "./style";

function renderNote({ item, navigation }) {
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <TouchableOpacity
      style={styles.noteArea}
      onPress={() =>
        navigation.navigate("AddNotes", { note: item, search: true })
      }
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between"}}>
        <View style={{flex: 3}}>
          <View>
            <Text style={styles.textNoteTitle} numberOfLines={5}>
              {item.title}
            </Text>
          </View>
          <View>
            <Text style={styles.textNote} numberOfLines={6}>
              {item.note}
            </Text>
          </View>
        </View>

        {item.notificationId !== null && (
          <View style={{ flexDirection: "column", flex: 3 }}>
            <Feather name="bell" size={15} color="#fff" style={{right:0, position: 'absolute'}} />
            <View style={styles.dateContainer}>
              <Text style={[styles.date]}>
                Date: {formatDate(new Date(item.date))}
              </Text>
              <Text> </Text>
              <Text style={styles.date}>
                Time: {formatTime(new Date(item.date))}
              </Text>
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default renderNote;
