import { StyleSheet } from "react-native";

const style = StyleSheet.create ({
    container:{
        flex: 1,
        paddingTop: 16,
        marginTop: 16, 
    },
    header:{
        marginBottom: 20,
        backgroundColor: "#101A6B",
        width: '100%'
    },
    
    addNoteButton:{
        zIndex: 9,
        position: "absolute",
        marginBottom: 20,
        bottom: 20,
        right: 20,
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