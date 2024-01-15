import React, { useState } from "react";
import { Modal, Text, TouchableOpacity, View, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Notifications from "expo-notifications";
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

  const schedulePushNotification = async () => {
    const scheduledDate = date; 

    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: `Notification: ${note.title.substr(0, 40)}`,
        body: note.note.substr(0, 50),
      },
      trigger: {
        date: scheduledDate, // Make sure to use the correct date
      },
    });

    setNote({ ...note, notificationId: id });
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
              onPress={() => setModalVisible(!modalVisible)}
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