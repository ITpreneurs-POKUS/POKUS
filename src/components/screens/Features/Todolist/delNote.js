import { Alert } from 'react-native';
import { deleteDoc, doc } from 'firebase/firestore';
import { db, firebase } from '../../../../../firebase';
import * as Notifications from 'expo-notifications';

async function delNote(note, navigation) {
    if (note.id === undefined) {
        Alert.alert('Error', 'No Notes Selected', [
            {
                text: 'OK',
                style: 'cancel',
            },
        ]);
    } else {
        try {
            const userTodoRef = doc(db, 'user', firebase.auth().currentUser.uid, 'userTodo', note.id);
            
            await deleteDoc(userTodoRef);

            // Cancel scheduled notification if Notification_id is present
            if (note.Notification_id !== null) {
                await Notifications.cancelScheduledNotificationAsync(note.Notification_id);
            }

            navigation.goBack();
        } catch (err) {
            console.log(err);
            Alert.alert('Error', 'There is an error!', [
                {
                    text: 'OK',
                    style: 'cancel',
                },
            ]);
        }
    }
}

export default delNote;
