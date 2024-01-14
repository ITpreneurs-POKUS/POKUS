import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  headerContainer: {
    width: "100%",
    marginBottom: 20,
    paddingVertical: 15,
    justifyContent: "center",
    backgroundColor: "#101A6B",
    flexDirection: "row",
    alignItems: "center",
  },
  arrowContainer: {
    left: 20,
    zIndex: 1,
  },
  arrow: {
    fontSize: 30,
    color: "#fff",
  },
  body: {
    margin: 20,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    color: "white",
    fontSize: 18,
    marginLeft: -20,
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },

  textInput: {
    fontSize: 18,
    padding: 15,
    borderWidth: 0.5,
    borderRadius: 10,
    color: "#000",
    width: 400,
    height: 150,
  },

  textTitleNote: {
    fontSize: 18,
    padding: 15,
    borderWidth: 0.5,
    borderRadius: 10,
    color: "#000",
    fontWeight: "500",
    marginBottom: 20,
  },

  actionButton: {
    borderRadius: 10,
    width: "40%",
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    margin: 15,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});

export default styles;
