//import liraries
import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
// create a component
const LeaveApp = () => {
  // const [date, setDate] = useState('09-10-2020');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <View style={{}}>
        <TextInput
          multiline={true}
          numberOfLines={10}
          style={{
            height: 200,
            width: 300,
            textAlignVertical: 'top',
            backgroundColor: '#3191f7',
            borderRadius: 5,

            borderColor: 'white',
            padding: 10,
          }}
          placeholder="Add Reason"
          placeholderTextColor="white"
        />
        <TouchableOpacity onPress={() => setOpen(true)}>
          <Text style={{fontWeight: 'bold', fontSize: 25, top: 40}}>
            Date From
          </Text>
        </TouchableOpacity>
        <View>
          <Text
            style={{
              borderWidth: 0.4,
              padding: 5,
              height: '25%',
              width: 300,
              justifyContent: 'center',
              alignItems: 'center',
              top: 40,
            }}></Text>
        </View>
        <TouchableOpacity onPress={() => setOpen(true)}>
          <Text style={{fontWeight: 'bold', fontSize: 25}}>Date Too</Text>
        </TouchableOpacity>
        <View>
          <Text
            style={{
              borderWidth: 0.4,
              padding: 5,
              height: '25%',
              width: 300,
              justifyContent: 'center',
              alignItems: 'center',
            }}></Text>
        </View>
        <DatePicker
          modal
          open={open}
          date={date}
          onDateChange={date => {
            setDate(date);
            setOpen(false);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: '#3191f7',
          width: 300,
          alignItems: 'center',
          height: 50,
          justifyContent: 'center',
        }}>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 17}}>
          {' '}
          Submit for Approval{' '}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//make this component available to the app
export default LeaveApp;
