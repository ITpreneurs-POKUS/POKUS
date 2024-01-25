import { StyleSheet } from "react-native";

const style = StyleSheet.create ({
    container:{
        flex: 1, 
    },
    
    addNoteButton:{
        zIndex: 9,
        position: "absolute",
        marginBottom: 20,
        bottom: 50,
        right: 15,
        backgroundColor: "#fff",
        borderRadius: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.24,
        elevation: 5
    },

    noteList:{
        margin:5
    },
    
    txtTitle: {
        textAlign:"center",
        margin:20,
        fontSize: 20,
        fontWeight: "bold",
        color: '#fff'
    },
    list:{
        paddingHorizontal:20,
    }
})

export default style;