import React, { useState } from "react";
import { View, TextInput } from "react-native";
import Style from "./style";

export default function SearchBar({ data, onChange }) {
  const [masterData, setMasterData] = useState(data);
  const search = (text) => {
    if (text) {
      const newData = data.filter((item) => {
        const itemTitle = item.title
          ? item.title.toUpperCase()
          : "".toUpperCase();
        const titleSearch = text.toUpperCase();
        console.log('data present');
        return itemTitle.indexOf(titleSearch) > -1;
      });
      onChange(newData);
    } else {
      console.log('data absent');
      onChange(masterData);
    }
  };

  return (
    <View
      style={[
        Style.searchArea,
        { padding: Platform.OS === "android" ? 12 : 20},
      ]}
    >
      <TextInput
        placeholder="Search Tasks..."
        maxLength={50}
        onChangeText={(text) => search(text)}
      />
    </View>
  );
}