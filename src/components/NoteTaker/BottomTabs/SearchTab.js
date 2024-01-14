import { StyleSheet, View, TextInput, Text, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React from 'react'

export default function SearchTab() {
  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <TextInput
            style={styles.searchBar}
            placeholder='Search Notes...'
          />

          <View style={[StyleSheet.absoluteFillObject, styles.emptyHeaderContainer]}>
            <Text style={styles.emptyHeader}>find Notes...</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  searchBar: {
    borderWidth: 1,
    borderColor: 'black',
    height: 50,
    borderRadius: 40,
    paddingLeft: 15,
    fontSize: 20,
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
});