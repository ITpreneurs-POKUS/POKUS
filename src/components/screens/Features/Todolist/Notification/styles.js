import { StyleSheet } from "react-native";

const style = StyleSheet.create({
    modalView:{
        marginRight: 20,
        marginLeft:20,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 25,
        height: '50%',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor:'#000',
        shadowOffset:{
                width: 0,
                height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5

    },
    modalText:{
        fontWeight: 'bold',
        textAlign: 'center'
    },
    modalButtons: {
        flexDirection:'row',
        justifyContent: 'space-around',
        width: '100%'
    },
    
    button:{
        alignItems: 'center',
        borderRadius: 20,
        padding: 10,
        width: 100,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    titleformat:{
        fontSize: 18,
        fontWeight: "bold",
        textAlign: 'center'
    },

    buttonCancel: {
        backgroundColor: '#c70000'
    },
    buttonSave: {
        backgroundColor: '#2196f3'
    },
    textStyle: {
        fontWeight: 'bold',
        color: '#fff'
    },
    buttonHours: {
        alignSelf: 'center',
        alignItems: 'center',
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        width: 150,
        marginBottom: 10
    },
    textHours: {
        fontWeight: 'bold',
        color: '#000',
        fontSize: 25
    },
    

})

export default style;