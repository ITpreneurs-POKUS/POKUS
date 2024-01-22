import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from './style';
import { doc, getDoc } from 'firebase/firestore';
import { db, firebase } from '../../../../../../firebase';

function RenderNote({ item, navigation }) {
  const [noteData, setNoteData] = useState(null);

  const userId = firebase.auth().currentUser.uid;

  useEffect(() => {
    const fetchNoteData = async () => {
      try {
       
        if (item && userId && item.id) {
          const userTodoRef = doc(db, 'user', userId, 'userTodo', item.id);
          const noteDoc = await getDoc(userTodoRef);

          if (noteDoc.exists()) {
            const data = noteDoc.data();
            const formattedItem = {
              Date: data.Date ? new Date(data.Date.seconds * 1000) : null,
              Note: data.Note,
              Title: data.Title,
              id: item.id,
            };

            setNoteData(formattedItem);
          } else {
            console.log('Note does not exist:', item.id);
          }
        } else {
          console.log('Invalid item:', item);
        }
      } catch (error) {
        console.error('Error fetching note data:', error);
      }
    };


    fetchNoteData();
  }, [item]);

  const formatDate = (date) => {
    if (!date) {
      return '';  // Return an empty string or any default value when date is null or undefined
    }

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    let hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${month}/${day}/${year} - ${hours}:${minutes} ${ampm}`;
  };

  return (
    <TouchableOpacity
      style={styles.noteArea}
      onPress={() => navigation.navigate('AddNotes', { note: item, search: true })}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flex: 3 }}>
          <View>
            <Text style={styles.textNoteTitle} numberOfLines={5}>
              {noteData ? noteData.Title : item.title}
            </Text>
          </View>
          <View>
            <Text style={styles.textNote} numberOfLines={6}>
              {noteData ? noteData.Note : item.note}
            </Text>
          </View>
        </View>

        {item.notificationId !== null && (
          <View style={{ flexDirection: 'column', flex: 3 }}>
            <Feather
              name="bell"
              size={15}
              color="#fff"
              style={{ right: 0, position: 'absolute' }}
            />
            <View style={styles.dateContainer}>
              <Text style={[styles.date]}>
                Alarm: {formatDate(noteData ? noteData.Date : null)}
              </Text>
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default RenderNote;
