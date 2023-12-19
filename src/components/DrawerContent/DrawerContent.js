import React from 'react';
import {View, StyleSheet, Text, Alert} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Avatar, Title} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const KhenImage = require('../../../assets/KhenImage.png');

const DrawerList = [
  {icon: 'account-outline', label: 'Home', navigateTo: 'Home'},
  {icon: 'check-circle-outline', label: 'Todolist', navigateTo: 'Todolist'},
  {icon: 'note-edit-outline', label: 'NoteTaker', navigateTo: 'NoteTaker'},
];


const DrawerLayout = ({icon, label, navigateTo}) => {
  const navigation = useNavigation();
  return (
    <DrawerItem
      icon={({ size }) => <Icon name={icon} color={'white'} size={size} />}
      label={label}
      onPress={() => {
        navigation.navigate(navigateTo);
      }}
      labelStyle={{color: 'white'}}
    />
  );
};


const DrawerItems = props => {
    return DrawerList.map((el, i) => {
      return (
        <DrawerLayout
          key={i}
          icon={el.icon}
          label={el.label}
          navigateTo={el.navigateTo}
        />
      );
    });
  };


function DrawerContent(props) {
  const navigation = useNavigation();

  const handleSignOut = () => {
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
          onPress: () => {
            // Add logic for signing out here
            navigation.navigate('BackToLanding');
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#050A30'}}>
      <DrawerContentScrollView {...props} style={{backgroundColor: '#050A30'}}>
        <View style={styles.drawerContent}>
          <TouchableOpacity activeOpacity={0.8}>
            <View style={styles.userInfoSection}>
              <View style={{flexDirection: 'row', marginTop: 15}}>
                <Avatar.Image
                  source={KhenImage}
                  size={50}
                  style={{marginTop: 5}}
                />
                <View style={{marginLeft: 10, flexDirection: 'column'}}>
                  <Title style={styles.title}>Khen Paler</Title>
                  <Text style={styles.caption} numberOfLines={1}>
                    palerkhen@gmail.com
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.drawerSection}>
            <DrawerItems />
          </View>
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ size }) => (
            <Icon name="exit-to-app" color={'white'} size={size} />
          )}
          label="Sign Out"
          labelStyle={{color: 'white'}}
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
    borderBottomWidth: 0,
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#dedede',
    borderTopWidth: 1,
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
    backgroundColor: '#050A30',
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
}); 