//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AnnouceList from '../HRScreen/AnnouceList';
// create a component
const CheckAnnounce = () => {
  return (
    <View style={styles.container}>
      <AnnouceList />
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
});

//make this component available to the app
export default CheckAnnounce;
