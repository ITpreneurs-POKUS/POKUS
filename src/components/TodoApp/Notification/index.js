import React, { useState } from "react";
import { Modal, Text, TouchableOpacity, View, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Notifications from "expo-notifications";
import style from "./styles";

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
  date = new Date(),
  setDate,
  note,
  setNote,
}) => {
  const [showPicker, setShowPicker] = useState({
    showDate: false,
    showHours: false,
  });
  
  
  async function schedulePushNotification() {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: `Notification: ${note.title.substr(0, 40)}`,
        body: note.note.substr(0, 50),
      },
      trigger: {
        date: date,
        exact: true,
      },
    });
    setNote({ ...note, notificationId: id });
  }

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
      return day + "/" + month + "/" + year;
    } else {
      return hours + ":" + min;
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
      <View style={style.centeredView}>
        <View
          style={[
            style.modalView,
            { marginTop: Platform.OS === "ios" ? "85%" : "71%" },
          ]}
        >
          <Text style={style.modalText}>
            SELECT A TIME TO GET NOTIFIED!
          </Text>

          
          <View>
            <Text style={{ textAlign: "center" }}>DATE</Text>
            <TouchableOpacity
              style={style.buttonHours}
              onPress={() => setShowPicker({ ...showPicker, showDate: true })}
            >
              <Text style={style.txtHours}>{currentFormattedData("date")}</Text>
            </TouchableOpacity>
            {showPicker.showDate && (
              <DateTimePicker mode="date" value={date} onChange={onChange} />
            )}
            <Text style={{ textAlign: "center" }}>TIME</Text>
            <TouchableOpacity
              style={style.buttonHours}
              onPress={() => setShowPicker({ ...showPicker, showHours: true })}
            >
              <Text style={style.textHours}>
                {currentFormattedData("hours")}
              </Text>
            </TouchableOpacity>
            {showPicker.showHours && (
              <DateTimePicker mode="time" value={date} onChange={onChange} />
            )}
          </View>
          <View style={style.modalButtons}>
            <TouchableOpacity
              style={[style.button, style.buttonSave]}
              onPress={() => {
                schedulePushNotification();
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={style.textStyle}>SET</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[style.button, style.buttonCancel]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={style.textStyle}>CANCEL</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalNotification;