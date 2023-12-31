import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  textDefault: {
    color: "#fff",
  },

  // Header
  headerContainer: {
    width: "100%",
    paddingVertical: 15,
    justifyContent: "center",
    backgroundColor: "#101A6B",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  arrowContainer: {
    left: 20,
    zIndex: 1,
    top: 15,
    position: "absolute",
  },

  arrow: {
    fontSize: 30,
    color: "#fff",
  },

  headerTitle: {
    flex: 10,
    textAlign: "center",
    color: "white",
    fontSize: 18,
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },

  block: {
    marginBottom: 30,
  },

  // HOME
  // body
  contentContainer: {
    width: "100%",
    paddingTop: 20,
    marginBottom: 50,
  },
  deckContainer: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    flexBasis: 120,
    minHeight: 120,
    width: "80%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderWidth: 1,
    borderColor: "#aaa",
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 10,
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  deckText: {
    fontSize: 28,
  },
  cardText: {
    fontSize: 18,
    color: "gray",
  },
  // ADD A CARD
  // body
  body: {
    paddingTop: 20,
    width: "80%",
    height: "100%",
  },
  title2: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "400",
    fontStyle: "italic",
  },
  label: {
    color: "#101A6B",
    fontWeight: "bold",
    fontSize: 12,
    marginBottom: 5,
  },

  input: {
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "#fff",
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    fontSize: 17,
    height: 40,
  },

  submitContainer: {
    borderRadius: 10,
    width: "40%",
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    alignSelf: "center",
  },
  // DeckDetail

  deckBtnContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  // quiz
  count: {
    fontSize: 24,
  },
  QorA:{
    fontWeight: 'bold',
    top: 25,
    position:"absolute",
    fontSize:24
  },
  QorAStatement:{
    fontSize:20,
    fontStyle: "italic"
  },
  resultStyle:{
    textAlign: "center",
    color: '#c70000',
    fontSize: 35,
    marginTop: 20
  }
});


export default styles;
