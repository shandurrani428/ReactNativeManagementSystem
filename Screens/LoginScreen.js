//import liraries
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import ShowError from '../Components/ShowError';
import ShowSuccess from '../Components/ShowSuccess';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import firestore from '@react-native-firebase/firestore';
const LoginScreen = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      AsyncStorage.getItem('Hrkey').then(value => {
        if (value != null) {
          navigation.navigate('HrHome');
        }
      });
      AsyncStorage.getItem('EmpKey').then(value => {
        if (value != null) {
          navigation.navigate('EmployeeHome');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async () => {
    //setLoading(true);
    if (users.length == 0 || password.length == 0) {
      Alert.alert('Warning!', 'Please write your data.');
    } else {
      // if ({Type} == 'Employee') {
      setLoading(true);
      auth()
        .signInWithEmailAndPassword(users, password)
        .then(cred => {
          firestore()
            .collection('Users')
            .doc(cred.user.uid)
            .get()
            .then(documentSnapshot => {
              console.log('User exists: ', documentSnapshot.get('userType'));
              if (documentSnapshot.get('userType') == 'Employee') {
                ShowSuccess('Employee Successfully');
                console.log('User account created & signed in!');
                AsyncStorage.setItem('EmpKey', users);
                setLoading(false);
                ShowSuccess('Employee Successfully');
                setUsers('');
                setPassword('');
                navigation.navigate('EmployeeHome');
              }
              if (documentSnapshot.get('userType') == 'HR') {
                console.log('User account created & signed in!');
                AsyncStorage.setItem('Hrkey', users);
                setLoading(false);
                ShowSuccess('HR Successfully');
                setUsers('');
                setPassword('');
                navigation.navigate('HrHome');
              }
            });
          // console.log('User account created & signed in!');
          // AsyncStorage.setItem('EmpKey', users);
          // setLoading(false);
          // ShowSuccess('Employee Successfully');
          // setUsers('');
          // setPassword('');
          // navigation.navigate('EmployeeHome');
        })
        .catch(error => {
          console.log(error);
          if (error.code === 'auth/invalid-email') {
            setLoading(false);
            ShowError('Invalid email');
          } else if (error.code === 'auth/user-not-found') {
            setLoading(false);
            ShowError('No user Found Email');
          } else {
            setLoading(false);
            ShowError('Invalid email');
          }
        });
      // } else {
      //   auth()
      //     .signInWithEmailAndPassword(users, password)
      //     .then(() => {
      //       console.log('User account created & signed in!');
      //       AsyncStorage.setItem('Hrkey', users);
      //       setLoading(false);
      //       ShowSuccess('HR Successfully');
      //       setUsers('');
      //       setPassword('');
      //       navigation.navigate('HrHome');
      //     })
      //     .catch(error => {
      //       console.log(error);
      //       if (error.code === 'auth/invalid-email') {
      //         setLoading(false);
      //         ShowError('Invalid email');
      //       } else if (error.code === 'auth/user-not-found') {
      //         setLoading(false);
      //       } else {
      //         setLoading(false);
      //       }
      //     });
      // }
    }
  };
  return (
    <View style={styles.container}>
      <View style={{height: 40, marginBottom: 90}}>
        <Text
          style={{
            color: '#3191f7',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 30,
            fontStyle: 'italic',
          }}>
          LOGIN
        </Text>
      </View>
      <ActivityIndicator
        style={{color: 'blue', marginBottom: 40}}
        size="large"
        color="#3191f7"
        animating={loading}></ActivityIndicator>
      <View style={styles.sectionStyle}>
        <Icon name="users" size={25} color="#3191f7" />
        <TextInput
          style={{
            flex: 1,
            padding: 8,

            fontSize: 18,
            fontFamily: 'sans-serif-light',
            left: 6,
          }}
          placeholder="E-mail address"
          placeholderTextColor="black"
          onChangeText={e => setUsers(e.trim())}
        />
      </View>
      <View style={styles.sectionStyle}>
        <Icon name="eye" size={35} color="#3191f7" />
        <TextInput
          placeholder="Password"
          placeholderTextColor="black"
          onChangeText={value => setPassword(value)}
          underlineColorAndroid="transparent"
          secureTextEntry={true}
          style={{
            flex: 1,
            padding: 8,

            fontSize: 18,
            top: 2,
            fontFamily: 'sans-serif-light',
          }}
        />
      </View>

      <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit}>
        <Text style={styles.loginText}>LOG IN</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.textStyle}>
        <Text
          style={styles.text}
          onPress={() => navigation.navigate('RegisterScreen')}>
          New here ? SignUp
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
  sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    height: 70,
    borderRadius: 2,
    margin: 15,
    padding: 15,
    width: '80%',
  },
  textStyle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: 10,
    marginTop: 70,
  },
  loginBtn: {
    width: '55%',
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#3191f7',
    margin: 40,
  },
  loginText: {
    color: 'white',
    fontSize: 20,
  },
  text: {
    color: 'black',
    justifyContent: 'space-between',
    fontSize: 20,
  },
});

export default LoginScreen;
