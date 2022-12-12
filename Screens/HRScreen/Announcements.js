//import liraries
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import ShowError from '../../Components/ShowError';
import ShowSuccess from '../../Components/ShowSuccess';
// create a component
const Announcements = ({navigation}) => {
  const [text, setText] = useState('');
  useEffect(() => {}, [text]);
  const handsubmit = () => {
    if (text.length == 0) {
      Alert.alert('Enter Announcements');
    } else {
      firestore()
        .collection('Employee')
        .add({
          Text: text,
        })
        .then(() => {
          console.log('Data added!');
        });

      ShowSuccess('Announcements Uploaded');
      setText('');
      navigation.navigate('AnnouceList');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={{fontWeight: 'bold', fontSize: 25, color: 'black'}}>
        HR Announcements
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Add Announcements"
        onChangeText={setText}
        multiline={true}
        numberOfLines={20}
      />
      <TouchableOpacity
        style={{
          backgroundColor: '#3191f7',
          width: 300,
          alignItems: 'center',
          height: 50,
          justifyContent: 'center',
        }}
        onPress={handsubmit}>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 17}}>
          Submit
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 200,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 40,
    marginTop: 60,
    textAlignVertical: 'top',
  },
});

//make this component available to the app
export default Announcements;
