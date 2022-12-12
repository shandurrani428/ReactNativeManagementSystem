import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from '@react-native-firebase/app';
// create a component
const HrProfile = ({navigation}) => {
  const [name, setName] = useState('');
  const [data, setData] = useState([]);
  const [phone, setPhone] = useState('');
  const [designation, setDesignation] = useState('');
  const user = firebase.auth().currentUser;

  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .doc(user.uid)
      .onSnapshot(documentSnapshot => {
        console.log('User data: ', documentSnapshot.data());
        console.log('emial', documentSnapshot.get('email'));
        setName(documentSnapshot.get('email'));
        setPhone(documentSnapshot.get('phoneNo'));
        setDesignation(documentSnapshot.get('userType'));
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  const removeData = async () => {
    try {
      await AsyncStorage.clear();
      navigation.push('LoginScreen');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 30,
            color: '#3191f7',
            justifyContent: 'flex-start',
            marginBottom: 0,
          }}>
          Welcome to Pixako Tech.
        </Text>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            color: '#3191f7',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            alignSelf: 'flex-start',
            padding: 10,
          }}>
          E-mail Address:
        </Text>
        <View
          style={{
            borderWidth: 0.4,
            padding: 5,
            height: '6%',
            width: 340,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>{name}</Text>
        </View>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            color: '#3191f7',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            alignSelf: 'flex-start',
            padding: 5,
          }}>
          Cell Phone:
        </Text>
        <View
          style={{
            borderWidth: 0.4,
            padding: 5,
            height: '6%',
            width: 340,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>{phone}</Text>
        </View>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            color: '#3191f7',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            alignSelf: 'flex-start',
            padding: 5,
          }}>
          Designation:
        </Text>
        <View
          style={{
            borderWidth: 0.4,
            padding: 5,
            height: '6%',
            width: 340,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>{designation}</Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#3191f7',
            width: 350,
            alignItems: 'center',
            top: 630,
            height: 50,
            justifyContent: 'center',
            position: 'absolute',
          }}
          onPress={removeData}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 17}}>
            {' '}
            LOG OUT{' '}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HrProfile;
