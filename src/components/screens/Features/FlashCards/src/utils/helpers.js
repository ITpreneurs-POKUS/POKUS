import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from 'expo-notifications';

const NOTIFICATION_KEY = "MobileFlashcard:notifications";
const CHANNEL_ID = "DailyReminder";

let scheduledNotificationIds = [];

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(() => {
    // Cancel all scheduled notifications
    scheduledNotificationIds.forEach((notificationId) => {
      Notifications.cancelScheduledNotificationAsync(notificationId);
    });
    scheduledNotificationIds = [];
  });
}

function createNotification() {
  return {
    title: "Mobile Flashcards Reminder",
    body: "👋 Don't forget to study for today!",
    ios: {
      sound: true,
    },
    android: {
      channelId: CHANNEL_ID,
      sticky: false,
      color: "red",
    },
  };
}

function createChannel() {
  return {
    name: "Daily Reminder",
    description: "This is a daily reminder for you to study your flashcards.",
    sound: true,
    priority: "high",
  };
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Notifications.getPermissionsAsync().then(({ status }) => {
          if (status === "granted") {
            Notifications.createChannelAndroidAsync(CHANNEL_ID, createChannel())
              .then((val) => console.log("channel return:", val))
              .then(() => {
                clearLocalNotification();

                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                tomorrow.setHours(20);
                tomorrow.setMinutes(0);

                const notificationId = Notifications.scheduleNotificationAsync({
                  content: createNotification(),
                  trigger: {
                    date: tomorrow,
                    repeats: true,
                  },
                });

                // Store the notification ID for later cancellation
                scheduledNotificationIds.push(notificationId);

                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
              })
              .catch((err) => {
                console.log("err", err);
              });
          }
        });
      }
    })
    .catch((err) => {
      console.log("Error reading AsyncStorage:", err);
    });
}
