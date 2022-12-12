//import liraries
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome';
// create a component
const HomeChat = ({navigation}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const list = [];
    firestore()
      .collection('Users')
      .where('userType', '==', 'Employee')
      .get()
      .then(snapShot => {
        snapShot.docs.forEach(doc => {
          const ab = doc.id;
          console.log(ab);
          list.push(doc.data());
        });
        if (isMounted) {
          setData([...list]);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [data]);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        style={{flex: 1}}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              padding: 20,
              margin: 2,
              width: 380,
              height: 70,
            }}
            onPress={() =>
              navigation.navigate('RecieveChatRoom', {uuid: item.uid})
            }>
            <Icon name="envelope" size={25} color="#3191f7" />
            <Text
              style={{
                fontWeight: 'bold',
                left: 40,
                bottom: 22,
              }}>
              Inbox: {item.email}
            </Text>
          </TouchableOpacity>
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
    backgroundColor: '#3191f7',
  },
});

//make this component available to the app
export default HomeChat;
