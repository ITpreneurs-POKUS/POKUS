import React, { useState, useEffect } from "react";
import { Modal, Text, TouchableOpacity, View, Platform, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Notifications from "expo-notifications";
import { Audio } from 'expo-av';
import Style from "./styles";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const ModalNotification = ({
  modalVisible,
  setModalVisible,
  date,
  setDate,
  note,
  setNote,
}) => {
  const [showPicker, setShowPicker] = useState({
    showDate: false,
    showHours: false,
  });

  const [notificationSound, setNotificationSound] = useState(null);

  const playNotificationSound = async () => {
    if (notificationSound) {
      try {
        await notificationSound.replayAsync();
      } catch (error) {
        console.error('Error replaying sound', error);
      }
    } else {
      const soundObject = new Audio.Sound();
      setNotificationSound(soundObject);
  
      try {
        await soundObject.loadAsync(require('../../../../../../assets/TimerAlarm1.mp3'));
        await soundObject.playAsync();
      } catch (error) {
        console.error('Error loading or playing sound', error);
        
      }
    }
  };
  
  const stopNotificationSound = async () => {
    if (notificationSound) {
      try {
        await notificationSound.stopAsync();
        setNotificationSound(null);
        Alert.alert('Audio Canceled', 'Notification sound has been canceled.');
      } catch (error) {
        console.error('Error stopping sound', error);
      }
    }
  };
  const unloadNotificationSound = async () => {
    if (notificationSound) {
      try {
        await notificationSound.unloadAsync();
      } catch (error) {
        console.error('Error unloading sound', error);
      }
    }
  };

  const schedulePushNotification = async () => {
    const scheduledDate = date;
  
    const notificationContent = {
      title: `Notification: ${note.title.substr(0, 40)}`,
      body: note.note.substr(0, 50),
      actions: [{ identifier: 'SILENCE_ACTION', title: 'Silence' }],
    };
  
    const id = await Notifications.scheduleNotificationAsync({
      content: notificationContent,
      trigger: {
        date: scheduledDate,
      },
    });
  
    setNote({ ...note, notificationId: id });
  
    // Listen for the scheduled notification
    Notifications.addNotificationReceivedListener(async (notification) => {
      if (notification.request.content.title === notificationContent.title) {
        playNotificationSound();
      }
    });
  
    // Listen for notification response
    Notifications.addNotificationResponseReceivedListener(response => {
      const { actionIdentifier } = response;
      if (actionIdentifier === 'SILENCE_ACTION') {
        stopNotificationSound();
        unloadNotificationSound(); // Unload the sound when silenced
        Alert.alert('Notification Pressed', 'Notification sound has been stopped.');
      }
    });
  };
  
  const onChange = (event, selectedDate) => {
    setShowPicker({ showDate: false, showHours: false });
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const currentFormattedData = (type) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours();
    const min = date.getMinutes();

    if (type === "date") {
      return `${day}/${month}/${year}`;
    } else {
      const formattedTime = new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
      return formattedTime;
    }
  };

  useEffect(() => {
    return () => {
      unloadNotificationSound(); // Unload the sound when the component is unmounted
    };
  }, []);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View>
        <View
          style={[
            Style.modalView,
            { marginTop: Platform.OS === "ios" ? "85%" : "71%" },
          ]}
        >
          <Text style={Style.modalText}>
            SELECT A TIME TO GET NOTIFIED FOR THE TASK!
          </Text>
          <View>
            <Text style={Style.titleformat}>DATE</Text>
            <TouchableOpacity
              style={[Style.buttonHours, { marginBottom: 30 }]}
              onPress={() => setShowPicker({ ...showPicker, showDate: true })}
            >
              <Text>{currentFormattedData("date")}</Text>
            </TouchableOpacity>
            {showPicker.showDate && (
              <DateTimePicker mode="date" value={date} onChange={onChange} />
            )}
            <Text style={Style.titleformat}>TIME</Text>
            <TouchableOpacity
              style={Style.buttonHours}
              onPress={() => setShowPicker({ ...showPicker, showHours: true })}
            >
              <Text>
                {currentFormattedData("hours")}
              </Text>
            </TouchableOpacity>
            {showPicker.showHours && (
              <DateTimePicker mode="time" value={date} onChange={onChange} />
            )}
          </View>
          <View style={Style.modalButtons}>
            <TouchableOpacity
              style={[Style.button, Style.buttonSave]}
              onPress={() => {
                schedulePushNotification();
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={Style.textStyle}>SET</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[Style.button, Style.buttonCancel]}
              onPress={() => {
                stopNotificationSound();
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={Style.textStyle}>CANCEL</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalNotification;
