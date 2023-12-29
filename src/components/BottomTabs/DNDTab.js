import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DoNotDisturb from 'react-native-do-not-disturb';

export default function DNDTab() {
  const [dndEnabled, setDNDEnabled] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      checkDNDStatus();
    }
  }, []);

  const checkDNDStatus = async () => {
    const status = await DoNotDisturb.getStatus();
    setDNDEnabled(status);
  };

  const toggleDND = async () => {
    if (Platform.OS === 'ios') {
      const newStatus = !dndEnabled;
      await DoNotDisturb.setEnabled(newStatus);
      setDNDEnabled(newStatus);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Do Not Disturb</Text>
      <TouchableOpacity style={styles.dndButton} onPress={toggleDND}>
        <Icon name={dndEnabled ? 'moon-waning-crescent' : 'moon-waxing-crescent'} size={60} color="#fff" />
        <Text style={styles.dndButtonText}>{dndEnabled ? 'Disable DND' : 'Enable DND'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  dndButton: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#040827',
    padding: 16,
    borderRadius: 8,
  },
  dndButtonText: {
    color: '#fff',
    marginTop: 8,
  },
});
