//import liraries
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {useNavigation} from '@react-navigation/native';
// create a component
const PostList = () => {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [users, setUsers] = useState([]); // Initial empty array of users
  const navigation = useNavigation();
  useEffect(() => {
    let isMounted = true;

    const list = [];
    firestore()
      .collection('EMP')
      .where('Status', '==', true)
      .get()
      .then(snapShot => {
        snapShot.docs.forEach(doc => {
          list.push(doc.data());
        });
        if (isMounted) {
          setUsers([...list]);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [users]);

  return (
    <SafeAreaView style={{flex: 1, marginTop: 10, height: '100%'}}>
      <FlatList
        data={users}
        horizontal={true}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{
              height: 250,
              width: 220,
              backgroundColor: 'white',
              padding: 20,
              margin: 2,
            }}
            onPress={() => {
              navigation.navigate('PostListDetails', {
                Photo: item.Image,
                Description: item.Text,
              });
            }}>
            <Image
              style={{height: '100%', width: '100%'}}
              source={
                {uri: item.Image.length} > 0
                  ? console.log('URL')
                  : {uri: item.Image}
              }
            />

            <Text style={{fontWeight: 'bold', height: 100}}>
              Description: {item.Text}
            </Text>
          </TouchableOpacity>
        )}
      />
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
export default PostList;
