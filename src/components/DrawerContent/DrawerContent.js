import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Title } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { firebase } from '../../../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { resetStore } from '../screens/Features/FlashCards/src/actions';
import { useDispatch } from 'react-redux';

const DrawerList = [  
  { icon: 'account-outline', label: 'Home', navigateTo: 'Home' },
  { icon: 'check-circle-outline', label: 'Todolist', navigateTo: 'Todolist' },
  { icon: 'note-edit-outline', label: 'NoteTaker', navigateTo: 'NoteTaker' },
  { icon: 'checkbox-multiple-blank-outline', label: 'FlashCard', navigateTo: 'FlashCard' },
  { icon: 'timer-sand', label: 'Timer', navigateTo: 'Timer' },
  { icon: 'robot-outline', label: 'ChatBot', navigateTo: 'ChatBot' },
];

const DrawerLayout = ({ icon, label, navigateTo, isActive, onPress }) => {
  const navigation = useNavigation();
  return (
    <DrawerItem
      icon={() => <Icon name={icon} color={isActive ? '#233DFD' : 'white'} size={40} />}
      label={label}
      onPress={() => {
        onPress();
        navigation.navigate(navigateTo);
      }}
      labelStyle={{ color: isActive ? '#233DFD' : 'white' }}
    />
  );
};

const DrawerItems = ({ activeItem, setActiveItem }) => {
  return DrawerList.map((el, i) => {
    return (
      <DrawerLayout
        key={i}
        icon={el.icon}
        label={el.label}
        navigateTo={el.navigateTo}
        isActive={activeItem === el.navigateTo}
        onPress={() => setActiveItem(el.navigateTo)}
      />
    );
  });
};

function DrawerContent(props) {
  const navigation = useNavigation();
  const [activeItem, setActiveItem] = useState('Home'); // Default active item is 'Home'

  const handleSendEmail = () => {
    setActiveItem('Email');
    navigation.navigate('Email');
  };

  const dispatch = useDispatch();

  const handleSignOut = async () => {
    // Display an alert when the "Sign Out" button is pressed
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          onPress: async () => {
            // Remove user credentials from AsyncStorage
            try {
              await AsyncStorage.removeItem('user_email');
              await AsyncStorage.removeItem('user_password');
              dispatch(resetStore());
            } catch (error) {
              console.error('Error removing user credentials from AsyncStorage:', error);
            }

            // Sign out from Firebase
            await firebase.auth().signOut();
          },
        },
      ],
      { cancelable: false }
    );
  };

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const userDocRef = firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid);

    // Set up a real-time listener for user data
    const unsubscribe = userDocRef.onSnapshot((snapshot) => {
      if (snapshot.exists) {
        setFirstname(snapshot.data().firstname);
        setLastname(snapshot.data().lastname);
        setEmail(snapshot.data().email);
        setProfileImage(snapshot.data().profileImage);
      } else {
        console.log('User does not exist');
      }
    });

    // Cleanup the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#050A30' }}>
      <DrawerContentScrollView {...props} style={{ backgroundColor: '#050A30' }}>

        <View style={styles.drawerContent}>

          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Profile')}>
            <View style={styles.userInfoSection}>
              <View style={{ flexDirection: 'row', marginTop: 15 }}>
                {profileImage ? (
                  <Avatar.Image
                    source={{ uri: profileImage }}
                    size={60}
                    backgroundColor='transparent'
                    style={{ marginTop: 5 }}
                  />
                ) : (
                  <Avatar.Image
                    source={require('../../../assets/pfp.png')}
                    size={60}
                    backgroundColor='transparent'
                    style={{ marginTop: 5 }}
                  />
                )}
                <View style={{ marginLeft: 10, flexDirection: 'column' }}>
                  <Title style={styles.title}>{firstname} {lastname}</Title>
                  <Text style={styles.caption} numberOfLines={1}>
                    {email}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.drawerSection}>
            <DrawerItems activeItem={activeItem} setActiveItem={setActiveItem} />
          </View>

        </View>
      </DrawerContentScrollView>
      <View style={{ bottom: 30, borderBottomWidth: 5, borderBottomColor: '#dedede' }}>
        <DrawerItem
          icon={() => (
            <Icon name="chat-alert-outline" color={'white'} size={40} />
          )}
          label="Send Email"
          labelStyle={{ color: 'white' }}
          onPress={handleSendEmail}
        />
      </View>
      <View style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={() => (
            <Icon name="exit-to-app" color={'red'} size={40} />
          )}
          label="Sign Out"
          labelStyle={{ color: 'red' }}
          onPress={handleSignOut}
        />
      </View>
    </View>
  );
}

export default DrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    backgroundColor: '#050A30',
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  caption: {
    fontSize: 13,
    lineHeight: 14,
    width: '100%',
    color: '#FFFFFF',
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
    borderBottomColor: '#dedede',
    borderBottomWidth: 5,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: 'red',
    borderTopWidth: 2,
    borderBottomColor: 'red',
    borderBottomWidth: 2,
    backgroundColor: '#050A30',
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
