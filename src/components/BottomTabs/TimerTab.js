import React, { Component } from "react";
import { Alert, StyleSheet, View, Text, Dimensions, StatusBar, TouchableOpacity, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as Notifications from 'expo-notifications';
import { Audio } from 'expo-av';

const formatNumber = number => `0${number}`.slice(-2);

const getRemaining = time => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  return { hours: formatNumber(hours), minutes: formatNumber(minutes), seconds: formatNumber(seconds) };
};

const createArray = length => {
  const arr = [];
  let i = 0;
  while (i < length) {
    arr.push(i.toString());
    i += 1;
  }
  return arr;
}

const AVAILABLE_HOURS = createArray(24);
const AVAILABLE_MINUTES = createArray(60);
const AVAILABLE_SECONDS = createArray(60);

export default class TimerTab extends Component {
  state = {
    remainingSeconds: 5,
    isRunning: false,
    selectedHours: "0",
    selectedMinutes: "0",
    selectedSeconds: "0",
    notificationSound: null,
  };
  interval = null;

  componentDidMount() {
    // Set up notification handler when the component mounts
    this.setupNotifications();
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    
    // Stop the notification sound
    this.stopNotificationSound();
  }

  setupNotifications = () => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
  
    // Add a listener for notification actions
    Notifications.addNotificationResponseReceivedListener(response => {
      const { actionIdentifier } = response;
      if (actionIdentifier === 'SILENCE_ACTION') {
        // Handle the custom action (e.g., silencing the sound)
        Notifications.dismissNotificationAsync(response.notification.request.identifier);
      }
    });
  };
  

  playNotificationSound = async () => {
    console.log('Playing notification sound');
    // Initialize the soundObject and set it in the state
    const soundObject = new Audio.Sound();
    this.setState({ notificationSound: soundObject });
  
    try {
      await soundObject.loadAsync(require('../../../assets/TimerAlarm.mp3'));
      await soundObject.playAsync();
    } catch (error) {
      console.error('Error loading sound', error);
    }
  };

  scheduleNotification = async () => {
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Timer Finished',
        body: "Your timer has finished!"
      },
      trigger: null,
    });

    await this.playNotificationSound();

    console.log('Scheduled notification with ID:', notificationId);
  };

  start = () => {
    // Check if a valid time is selected
    const selectedTimeInSeconds =
      parseInt(this.state.selectedHours, 10) * 3600 +
      parseInt(this.state.selectedMinutes, 10) * 60 +
      parseInt(this.state.selectedSeconds, 10);
  
    if (selectedTimeInSeconds <= 0) {
      // Display an alert or take any other appropriate action
      Alert.alert("Invalid Time", "Please select a time.");
      return;
    }
  
    // Continue with starting the timer
    this.setupNotifications();
    this.setState({
      remainingSeconds: selectedTimeInSeconds,
      isRunning: true,
      alertShown: false, // New state to track if the alert has been shown
    });
  
    this.interval = setInterval(() => {
      this.setState((state) => ({
        remainingSeconds: state.remainingSeconds - 1,
      }));
  
      if (this.state.remainingSeconds === 0 && !this.state.alertShown) {
        // Set alertShown to true to prevent showing the alert multiple times
        this.setState({ alertShown: true });
  
        // Schedule a notification when the timer reaches 0
        this.scheduleNotification();
  
        // Display the alert with a delay of 2 seconds
        setTimeout(() => {
          Alert.alert(
            "Timer Alert",
            "Your timer has reached zero!",
            [
              {
                text: "OK",
                onPress: () => {
                  // Stop the notification sound when the alert is dismissed
                  this.stopNotificationSound();
                  this.stop();
                },
              },
            ],
            { cancelable: false }
          );
        }, 5000);
      } else if (this.state.remainingSeconds < 0) {
        // Stop the timer when it goes negative
        clearInterval(this.interval);
        this.interval = null;
        this.setState({
          remainingSeconds: 0,
          isRunning: false,
        });
      }
    }, 1000);
  };
  

// Add this function to stop the notification sound
stopNotificationSound = async () => {
  console.log('Stopping notification sound');
  const { notificationSound } = this.state;
  
  if (notificationSound) {
    try {
      await notificationSound.stopAsync();
    } catch (error) {
      console.error('Error stopping sound', error);
    }
  }
};

  stop = () => {
    clearInterval(this.interval);
    this.interval = null;
    this.setState({
      remainingSeconds: 5,
      isRunning: false,
      selectedHours: "0",
      selectedMinutes: "0",
      selectedSeconds: "0",
    });
  };

  renderPickers = () => (
    <View style={styles.pickerContainer}>
      <Picker
        style={styles.picker}
        itemStyle={styles.pickerItem}
        selectedValue={this.state.selectedHours}
        onValueChange={(itemValue) => {
          this.setState({ selectedHours: itemValue });
        }}
        mode="dropDown"
        dropdownIconColor={'white'}
      >
        {AVAILABLE_HOURS.map((value) => (
          <Picker.Item key={value} label={value} value={value} />
        ))}
      </Picker>
      <Text style={styles.pickerItem}>:</Text>

      <Picker
        style={styles.picker}
        itemStyle={styles.pickerItem}
        selectedValue={this.state.selectedMinutes}
        onValueChange={(itemValue) => {
          this.setState({ selectedMinutes: itemValue });
        }}
        mode="dropDown"
        dropdownIconColor={'white'}
      >
        {AVAILABLE_MINUTES.map((value) => (
          <Picker.Item key={value} label={value} value={value} />
        ))}
      </Picker>
      <Text style={styles.pickerItem}>:</Text>

      <Picker
        style={styles.picker}
        itemStyle={styles.pickerItem}
        selectedValue={this.state.selectedSeconds}
        onValueChange={(itemValue) => {
          this.setState({ selectedSeconds: itemValue });
        }}
        mode="dropDown"
        dropdownIconColor={'white'}
      >
        {AVAILABLE_SECONDS.map((value) => (
          <Picker.Item key={value} label={value} value={value} />
        ))}
      </Picker>
    </View>
  );

  render() {
    const { hours, minutes, seconds } = getRemaining(this.state.remainingSeconds);
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        {this.state.isRunning ? (
          <Text style={styles.timerText}>{`${hours}:${minutes}:${seconds}`}</Text>
        ) : (
          this.renderPickers()
        )}
        {this.state.isRunning ? (
          <TouchableOpacity onPress={this.stop} style={[styles.button, styles.buttonStop]}>
            <Text style={[styles.buttonText, styles.buttonTextStop]}>Stop</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={this.start} style={styles.button}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050A30",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    borderWidth: 10,
    borderColor: "#05FF00",
    width: screen.width / 2,
    height: screen.width / 2,
    borderRadius: screen.width / 2,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 200
  },
  buttonStop: {
    borderColor: "#FF0000"
  },
  buttonText: {
    fontSize: 45,
    color: "#05FF00"
  },
  buttonTextStop: {
    color: "#FF0000"
  },
  timerText: {
    color: "#fff",
    fontSize: 90
  },
  picker: {
    flex: 1,
    maxWidth: 100,
    ...Platform.select({
      android: {
        color: "#fff",
        backgroundColor: "rgba(92, 92, 92, 0.206)",
      }
    })
  },
  pickerItem: {
    color: "#fff",
    fontSize: 20,
    ...Platform.select({
      android: {
        marginLeft: 10,
        marginRight: 10,
      }
    })
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center"
  }
});
