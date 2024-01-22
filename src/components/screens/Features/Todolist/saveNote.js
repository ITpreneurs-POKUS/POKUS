import { Alert } from 'react-native';
import { addDoc, collection, updateDoc, doc } from 'firebase/firestore';
import { db, firebase } from '../../../../../firebase';
import updateNote from './updateNote'; //WORKING TO VERSION
 
export default async function SaveNote(note, navigation, existingNotes) {
    try {

        if (!note ||  note.note === '' || note.title === '') {
            Alert.alert('ERROR', 'There is an error!', [{ text: 'OK', style: 'cancel' }]);
        } else {
            const userTodoCollection = collection(db, 'user', firebase.auth().currentUser.uid, 'userTodo');
            if (note.id) {
                // Update existing note in Firestore
                const noteRef = doc(userTodoCollection, note.id);
                await updateDoc(noteRef, {
                    Title: note.title,
                    Note: note.note,
                    Date: note.date,
                    Notification_id: note.notificationId,
                });
                // Update local data array
                updateNote(existingNotes, note);
            } else {
                const docRef = await addDoc(userTodoCollection, {
                    Title: note.title,
                    Note: note.note,
                    Date: note.date,
                    Notification_id: note.notificationId, 
                });
                note.id = docRef.id;
            }

            navigation.goBack();
        }

    } catch (err) {
        console.error(err);
        Alert.alert('ERROR', 'Enter Some Info before Saving.', [{ text: 'OK', style: 'cancel' }]);
    }
}
