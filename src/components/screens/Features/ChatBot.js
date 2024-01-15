import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ActivityIndicator } from 'react-native';


export default function ChatBot() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const apiKey = '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';
  const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-002/completions';
  const [textInput, setTextInput] = React.useState('');

  const handleSend = async () => {
    setLoading(true);
    const prompt = textInput;
    try {
      const response = await axios.post(
        apiUrl,
        {
          model:"gpt-3.5-turbo",
          prompt: prompt,
          max_tokens: 1024,
          temperature: 0.5,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      const text = response.data.choices[0].text;
      setData([...data, { type: 'user', text: textInput }, { type: 'bot', text }]);
      setTextInput('');
      Keyboard.dismiss();
    } catch (error) {
      console.error('Error fetching data:', error);
      console.log('Error details:', error.response.data); // Log additional details
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        style={styles.body}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
              alignItems: 'flex-start',
            }}
          >
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16,
                color: item.type === 'user' ? 'green' : 'red',
                marginRight: 5,
              }}
            >
              {item.type === 'user' ? 'You:' : 'Bot:'}
            </Text>
            <Text style={styles.message}>{item.text}</Text>
          </View>
        )}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.input}
          value={textInput}
          multiline={true}
          onChangeText={(text) => setTextInput(text)}
          placeholder="Ask ChatBot..."
          placeholderTextColor={'#FFF'}
        />
        <TouchableOpacity style={styles.button} onPress={handleSend} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#050A30" />
          ) : (
            <Icon name="send" size={30} color="#050A30" />
          )}
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050A30',
  },
  body: {
    flex: 1,
    backgroundColor: '#050A30',
    padding: 10,
  },
  message: {
    flex: 1,
    fontSize: 16,
    color: '#FFF'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    top: 7,
  },
  input: {
    flex: 1,
    color: '#FFF',
    borderWidth: 1,
    borderColor: '#FFF',
    height: 55,
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#FFF',
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
  },
});
