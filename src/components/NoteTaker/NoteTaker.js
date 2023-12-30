import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NoteTaker() {
  const [renderingData, setRenderingData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const existingData = await AsyncStorage.getItem('your_key_for_data');
        const parsedData = existingData ? JSON.parse(existingData) : [];
        setRenderingData(parsedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log('Rendering Data:', renderingData);
  }, [renderingData]);

  return (
    <View style={styles.container}>
      <Text style={styles.containerHeader}>Your Notes:</Text>

      {renderingData.length === 0 ? (
        <View style={styles.emptyHeaderContainer}>
          <Text style={styles.emptyHeader}>empty notes...</Text>
        </View>
      ) : (
        <FlatList
          data={renderingData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.noteContainer}>
              <Text style={styles.noteTitle}>{item.title}</Text>
              <Text style={styles.noteDesc}>{item.desc}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  containerHeader: {
    textTransform: 'uppercase',
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  emptyHeader: {
    fontSize: 30,
    textTransform: 'uppercase',
    opacity: 0.2,
    fontWeight: 'bold',
  },
  emptyHeaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
  },
  noteContainer: {
    borderBottomWidth: 1,
    borderColor: 'black',
    paddingVertical: 10,
  },
  noteTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  noteDesc: {
    fontSize: 16,
  },
});
