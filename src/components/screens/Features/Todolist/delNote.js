import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { Alert } from "react-native";


async function delNote (note, navigation){
    if(note.id === undefined){
        Alert.alert("Error", "No Notes Selected", [
            {
              text: "OK",
              style: "cancel",
            },
          ]);
    }else{
        try {
            const data = JSON.parse(await AsyncStorage.getItem('notes'))
            for (let i = 0; i < data.length; i++){
                if (data[i].id === note.id){
                    data.splice(i, 1);
                }
            }
            if (note.NotificationsId !== null){
                await Notifications.cancelAllScheduledNotificationsAsync(note.NotificationsId)
            }
            await AsyncStorage.setItem('notes', JSON.stringify(data));
            navigation.goBack();
        } catch (err) {
            console.log(err)
            Alert.alert("Error", "There is an error!", [
                {
                  text: "OK",
                  style: "cancel",
                },
              ]);
        }
    }
}
export default delNote;