import { StyleSheet, View, Image } from 'react-native';


export default function HomeScreen({navigation}) {

const KhenImage = require('../../../assets/KhenImage.png');

  return (
    <View style={styles.container}>

        {/* <View style={styles.imageContainer}>
            <Image source={KhenImage} style={styles.imageStyle}></Image>
        </View> */}
        
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#050A30',
    },
    // imageContainer: {
    //     flex: 1,
    // },
    // imageStyle: {
    //     width: 300,
    //     height: 300,
    // }
});
