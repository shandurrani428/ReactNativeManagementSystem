//import liraries
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// create a component
const EmpProfile = ({navigation}) => {
  const [name, setName] = useState('');
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      AsyncStorage.getItem('EmpKey').then(value => {
        if (value != null) {
          setName(value);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
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
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontWeight: 'bold', fontSize: 30, color: '#3191f7'}}>
          Beℓℓα Ciαo!
        </Text>
        <Text style={styles.Viewtext}> {name} !!</Text>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: '#3191f7',
          width: 300,
          alignItems: 'center',
          top: 285,
          height: 50,
          justifyContent: 'center',
        }}
        onPress={removeData}>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 17}}>
          {' '}
          LOG OUT{' '}
        </Text>
      </TouchableOpacity>
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

export default EmpProfile;
