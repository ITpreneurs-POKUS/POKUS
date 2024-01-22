import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function updateNote(data, note) {
    // Update local data array
    for (let i = 0; i < data.length; i++) {
        if (data[i].id === note.id) {
            data[i] = note;
            break; // Break out of the loop once the update is done
        }
    }

    try {
        const existingData = await AsyncStorage.getItem('yourAsyncStorageKey'); // Replace 'yourAsyncStorageKey' with your actual key
        if (existingData) {
            const parsedData = JSON.parse(existingData);
            const updatedData = parsedData.map((item) => (item.id === note.id ? note : item));
            await AsyncStorage.setItem('yourAsyncStorageKey', JSON.stringify(updatedData));
        }
    } catch (error) {
        console.error('Error updating AsyncStorage:', error);
    }

  
}