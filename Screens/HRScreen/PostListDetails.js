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
const PostListDetails = ({navigation, route}) => {
  const {Photo} = route.params;
  const {Description} = route.params;

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          justifyContent: 'flex-start',
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
export default PostListDetails;
