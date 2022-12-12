//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Button,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {ScrollView} from 'react-native-gesture-handler';
import ShowError from '../../Components/ShowError';
import ShowSuccess from '../../Components/ShowSuccess';
// create a component
const CheckPostDetails = ({navigation, route}) => {
  const {Photo} = route.params;
  const {Description} = route.params;

  //Accept Request of Driver
  const requestAccept = Description => {
    const check = [];
    firestore()
      .collection('EMP')
      .where('Text', '==', Description)
      .get()
      .then(snapShot => {
        snapShot.docs.forEach(doc => {
          check.push(doc.data());
          const ab = doc.id;
          console.log(ab);
          firestore()
            .collection('EMP')
            .doc(ab)
            .update({Status: true})
            .then(() => {
              ShowSuccess('Request Accepted');
              navigation.navigate('CheckPost');
              console.log(check);
            });
        });
      });
  };

  // Reject Request of Driver
  const requestReject = Description => {
    const check = [];
    firestore()
      .collection('EMP')
      .where('Text', '==', Description)
      .get()
      .then(snapShot => {
        snapShot.docs.forEach(doc => {
          check.push(doc.data());
          const ab = doc.id;
          console.log(ab);
          firestore()
            .collection('EMP')
            .doc(ab)
            .delete()
            .then(() => {
              console.log('User deleted!');
              ShowError('Request Rejected');
              navigation.navigate('CheckPost');
              console.log(check);
            });
        });
      });
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <Image
          style={{
            height: '40%',
            width: '94%',
            margin: 10,
          }}
          source={{uri: Photo}}
          resizeMode="contain"
        />

        <Text
          style={{
            color: 'grey',
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          Description: {Description}
        </Text>

        <TouchableOpacity
          style={{
            margin: 10,
            padding: 10,
            width: 360,
            top: 600,
            position: 'absolute',
            alignItems: 'center',
            backgroundColor: 'blue',
          }}
          onPress={() => {
            requestAccept(Description);
          }}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>ACCEPT POST</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            margin: 10,
            padding: 10,
            width: 360,
            top: 650,
            position: 'absolute',
            alignItems: 'center',
            backgroundColor: 'red',
          }}
          onPress={() => {
            requestReject(Description);
          }}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>REJECT POST</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default CheckPostDetails;
