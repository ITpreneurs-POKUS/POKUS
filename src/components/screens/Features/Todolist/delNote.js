import { Alert } from "react-native";
import { firebase } from '../../../../../firebase'; // Import the correct path to your firebase module
import * as Notifications from "expo-notifications";

async function delNote (note, navigation){
    if(note.id === undefined){
        Alert.alert("Error", "No Notes Selected", [
            {
              text: "OK",
              style: "cancel",
            },
          ]);
    } else {
        try {
            const user = firebase.auth().currentUser;
            const userNotesRef = firebase.firestore().collection('users').doc(user.uid).collection('todoNotes').doc(note.id);

            // Retrieve the notification ID before deleting the note
            const notificationId = note.notificationId;

            // Delete the note from Firestore
            await userNotesRef.delete();

            // If the note had a scheduled notification, cancel it
            if (notificationId !== null){
                await Notifications.cancelScheduledNotificationAsync(notificationId);
            }

            navigation.goBack();
        } catch (err) {
            console.log(err);
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
