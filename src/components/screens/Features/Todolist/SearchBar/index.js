import React, { useState } from "react";
import { View, TextInput } from "react-native";
import Style from "./style";

export default function SearchBar({ data, onChange }) {
  const [masterData, setMasterData] = useState(data);

  const search = (text) => {
    if (text) {
      const searchText = text.toLowerCase();
      const newData = masterData.filter((item) => {
        const itemTitle = item.Title ? item.Title.toLowerCase() : "";
        return itemTitle.includes(searchText);
      });
      onChange(newData);
    } else {
      onChange(masterData);
    }
  };

  return (
    <View
      style={[
        Style.searchArea,
        { padding: Platform.OS === "android" ? 12 : 20 },
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
