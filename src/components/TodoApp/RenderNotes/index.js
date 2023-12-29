import { View, TouchableOpacity, Text } from "react-native";
import {Feather} from '@expo/vector-icons';
import styles from './style'

function renderNote({item, navigation}){
    return(
        <TouchableOpacity
            style = {styles.noteArea}
            onPress={() => navigation.navigate("AddNotes", {note: item, search: true})}
        >
            <View
                style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
                <Text style = {styles.textNoteTitle} numberOfLines={3} >{item.title}</Text>
                
                {item.notificationId !== null && (
                    <Feather name="bell" size={15} color="#fff" />
                )}
                
            </View>
            <View>
                <Text style = {styles.textNote} numberOfLines={6} >{item.note}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default renderNote;