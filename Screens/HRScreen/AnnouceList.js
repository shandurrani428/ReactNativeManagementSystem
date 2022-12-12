//import liraries
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
// create a component
const AnnouceList = () => {
  const [users, setUsers] = useState([]); // Initial empty array of users
  useEffect(() => {
    const subscriber = firestore()
      .collection('Employee')
      .onSnapshot(querySnapshot => {
        const users = [];

        querySnapshot.forEach(documentSnapshot => {
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setUsers(users);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);
  const ItemSeparatorView = () => {
    return (
      // FlatList Item Separator
      <View
        style={{
          height: 1,
          width: '80%',
          backgroundColor: 'black',
          margin: 40,
        }}
      />
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        ItemSeparatorComponent={ItemSeparatorView}
        key={item => item.id}
        renderItem={({item}) => (
          <View
            style={{
              height: 240,
              width: 300,
              borderColor: 'gray',
              borderWidth: 1,
              margin: 40,
              textAlignVertical: 'top',
              backgroundColor: 'white',
            }}>
            <Text style={{color: 'black', fontWeight: 'bold', padding: 10}}>
              {item.Text}
            </Text>
          </View>
        )}
      />
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
export default AnnouceList;
