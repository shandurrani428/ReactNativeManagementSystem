import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ShowError from '../Components/ShowError';
import ShowSuccess from '../Components/ShowSuccess';
import {ScrollView} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import DropDownPicker from 'react-native-dropdown-picker';
import firestore from '@react-native-firebase/firestore';
const RegisterScreen = ({navigation}) => {
  const [indicator, setIndicator] = useState(false);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [cnic, setCnic] = useState();
  const [phoneNo, setPhoneNo] = useState();
  const [validatePass, setValidatePass] = useState(false);
  const [evalidate, setEvalidate] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [items, setItems] = useState([
    {label: 'Employee', value: 'Employee'},
    {label: 'HR', value: 'HR'},
  ]);

  useState(() => {
    // const passwordRegExp = new RegExp(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\.\+\*\{\]\{\[\-,;`<>':"=^#_|\/\\])(?=.*?[A-Za-z\d@$!%*+?&\.\+\*\{\]\{\[\-,;`<>':"=^#_|\/\\]).{8,}/,
    // );
    // const formValueFalse = 'aaabbb';
    // const formValueTrue = 'AaBb123$';
    // console.log(passwordRegExp.test(formValueFalse));
    // console.log(passwordRegExp.test(formValueTrue));
  });

  const Register = () => {
    if (!email) {
      ShowError('Email required @pixako.com');
      return false;
    }
    if (!phoneNo) {
      ShowError('Phone No required');
      return false;
    }
    if (!cnic) {
      ShowError('CNIC required');
      return false;
    }

    if (!password) {
      ShowError('Password required');
      return false;
    }

    if (phoneNo.length != 11) {
      ShowError('Phone No must contain 11 digits');
      return false;
    }
    if (cnic.length != 13) {
      ShowError('CNIC must contain 13 digits');
      return false;
    }
    if (!value) {
      ShowError('Choose Designation');
      return false;
    } else {
      setIndicator(true);
      console.log(value);
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(cred => {
          firestore().collection('Users').doc(cred.user.uid).set({
            email: email.trim(),
            userType: value,
            phoneNo: phoneNo,
            uid: cred.user.uid,
          });
          console.log('User account created & signed in!');
          setIndicator(true);
          ShowSuccess('Register Successfully');
          setEmail('');
          setPassword('');
          setCnic('');
          setPhoneNo('');
          setIndicator(false);
          navigation.navigate('LoginScreen');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            ShowError('That email address is already in use');
          }

          if (error.code === 'auth/invalid-email') {
            ShowError('That email address is invalid!');
          }

          console.error(error);
        });
    }
  };
  const handlePassword = password => {
    console.log(password);
    const passwordRegExp = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\.\+\*\{\]\{\[\-,;`<>':"=^#_|\/\\])(?=.*?[A-Za-z\d@$!%*+?&\.\+\*\{\]\{\[\-,;`<>':"=^#_|\/\\]).{8,}/,
    );
    const formValueFalse = 'aaabbb';
    const formValueTrue = 'AaBb123$';
    if (passwordRegExp.test(password)) {
      setPassword(password);
      setValidatePass(false);
    } else {
      setValidatePass(true);
    }
  };
  const validateEmail = email => {
    console.log(email);
    var re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) {
      if (
        email.indexOf('@pixako.com', email.length - '@pixako.com'.length) !== -1
      ) {
        console.log('VALID');
        setPassword(email);
        setValidatePass(false);
      } else {
        console.log('INVALID');
        setEvalidate(true);
      }
    }
  };
  // validateEmail('zk@gmail.com'); //VALID
  // validateEmail('zk@mail.com'); //INVALID
  return (
    <View style={styles.container}>
      <ActivityIndicator
        style={{color: 'blue'}}
        size="large"
        color="#3191f7"
        animating={indicator}></ActivityIndicator>
      <Text
        style={{
          color: '#3191f7',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 30,
          fontStyle: 'italic',
          marginTop: '10%',
          marginBottom: '10%',
        }}>
        REGISTRATION
      </Text>

      <View style={styles.sectionStyle}>
        <TextInput
          placeholder="E-mail address"
          placeholderTextColor="#11181f"
          value={email}
          textContentType="emailAddress"
          onChangeText={email => validateEmail(email)}
          style={{
            flex: 1,
            padding: 8,
            fontSize: 18,
            fontFamily: 'sans-serif-light',
            left: 6,
          }}
        />
      </View>
      {evalidate ? (
        <Text style={{alignSelf: 'center', color: 'red'}}> @pixako.com </Text>
      ) : (
        <Text
          style={{
            fontSize: 13,
            alignItems: 'center',
          }}>
          @pixako.com{' '}
        </Text>
      )}
      <View style={styles.sectionStyle}>
        <TextInput
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor="#11181f"
          value={password}
          onChangeText={password => handlePassword(password)}
          style={{
            flex: 1,
            padding: 8,

            fontSize: 18,
            fontFamily: 'sans-serif-light',
            left: 6,
          }}
        />
      </View>
      {validatePass ? (
        <Text style={{alignSelf: 'center', color: 'red'}}>
          {' '}
          One Capital, One Special, Min 8 characters{' '}
        </Text>
      ) : (
        <Text
          style={{
            fontSize: 13,
            alignItems: 'center',
          }}>
          One Capital, One Special, Min 8 characters{' '}
        </Text>
      )}
      {/* <View
        style={{
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 12,
            alignItems: 'center',
          }}>
          One Capital, One Special, Min 8 characters{' '}
        </Text>
      </View> */}
      <View style={styles.sectionStyle}>
        <TextInput
          placeholder="CNIC (e.g 3740536198777)"
          placeholderTextColor="#11181f"
          value={cnic}
          onChangeText={e => setCnic(e.trim())}
          keyboardType="numeric"
          style={{
            flex: 1,
            padding: 8,

            fontSize: 18,
            fontFamily: 'sans-serif-light',
            left: 6,
          }}
        />
      </View>
      <View style={styles.sectionStyle}>
        <TextInput
          placeholder="Phone No."
          placeholderTextColor="#11181f"
          value={phoneNo}
          onChangeText={e => setPhoneNo(e.trim())}
          keyboardType="numeric"
          style={{
            flex: 1,
            padding: 8,
            fontSize: 18,
            fontFamily: 'sans-serif-light',
            left: 6,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: 60,
          margin: 10,
          width: '80%',
          fontWeight: 'bold',
        }}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="Choose Designation"
          placeholderTextColor="blue"
          style={{borderColor: 'black', color: 'grey'}}
        />
      </View>
      <TouchableOpacity
        style={{
          width: '55%',
          borderRadius: 5,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 70,
          backgroundColor: '#3191f7',
          margin: 40,
        }}
        onPress={Register}>
        <Text style={{color: 'white', fontSize: 20}}>REGISTRATION</Text>
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
    borderWidth: 1,
    height: 60,
    borderRadius: 2,
    margin: 10,
    width: '80%',
    fontWeight: 'bold',
    backgroundColor: 'white',
    borderColor: 'black',
  },
});

export default RegisterScreen;
