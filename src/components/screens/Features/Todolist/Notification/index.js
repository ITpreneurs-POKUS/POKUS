import React, { useState, useEffect } from "react";
import { Modal, Text, TouchableOpacity, View, Platform, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Notifications from "expo-notifications";
import { Audio } from 'expo-av';
import Style from "./styles";

Notifications.setNotificationHandler({ //WORKING TO VERSION
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const ModalNotification = ({
  modalVisible,
  setModalVisible,
  date: propDate,  // Rename prop to avoid confusion
  setDate: propSetDate,  // Rename prop to avoid confusion
  note,
  setNote,
  onSchedule,
}) => {
  const [date, setDate] = useState(propDate);
  const [showPicker, setShowPicker] = useState({
    showDate: false,
    showHours: false,
  });

  const playNotificationSound = async () => {
    const soundObject = new Audio.Sound();

    try {
      await soundObject.loadAsync(require('../../../../../../assets/TodolistAlarm.mp3'));
      await soundObject.playAsync();
    } catch (error) {
      console.error('Error loading sound', error);
    }
  };

  const schedulePushNotification = async () => {
    const scheduledDate = date;
    

    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: `Notification: ${note.title.substr(0, 40)}`,
        body: note.note.substr(0, 50),
      },
      trigger: {
        date: scheduledDate,
      },
    });

    setNote({ ...note, notificationId: id, scheduledDate: scheduledDate });  // Add scheduledDate to the state

    // Listen for the scheduled notification
    Notifications.addNotificationReceivedListener(async (notification) => {
      if (notification.request.content.title === `Notification: ${note.title.substr(0, 40)}`) {
        playNotificationSound();
      }
    });
    onSchedule(scheduledDate);

  };

  const onChange = (event, selectedDate) => {
    setShowPicker({ showDate: false, showHours: false });
    const currentDate = selectedDate || date;
    setDate(currentDate);
    propSetDate(currentDate);  // Pass the date back to AddNotes using the prop function
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

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View >
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