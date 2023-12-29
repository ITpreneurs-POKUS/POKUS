import { StyleSheet, Dimensions } from "react-native";
import colors from "../styles/colors";

const width = (Dimensions.get("window").width - 70) / 1;
const height = (Dimensions.get("window").height - 400) / 2;

const styles = StyleSheet.create({
  noteArea: {
    backgroundColor: colors.addButton,
    width: "100%",
    height: "auto",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    marginTop: 10,
    marginBottom: 10,
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  textNoteTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
  textNote: {
    color: "#fff",
  },
  dateContainer: {
    flexDirection: "row",
    right: 0,
    position: "absolute",
    bottom: 0,
  },
  date: {
    color: "#fff",
    fontSize: 11,
    right: 0,
  },
});

export default styles;
