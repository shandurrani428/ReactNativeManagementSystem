//import liraries
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
// create a component
const CheckPost = ({navigation}) => {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount

  const [data, setData] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const list = [];
    firestore()
      .collection('EMP')
      .where('Status', '==', false)
      .get()
      .then(snapShot => {
        snapShot.docs.forEach(doc => {
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
    <SafeAreaView
      style={{
        flex: 1,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{
              height: 350,
              width: 380,
              backgroundColor: 'white',
              padding: 20,
              margin: 2,
            }}
            onPress={() =>
              navigation.navigate('CheckPostDetails', {
                Photo: item.Image,
                Description: item.Text,
              })
            }>
            <Image
              style={{height: '80%', width: '100%'}}
              source={
                {uri: item.Image.length} > 0
                  ? console.log('URL')
                  : {uri: item.Image}
              }
              resizeMode="contain"
            />

            <Text style={{fontWeight: 'bold', height: 200}}>
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
export default CheckPost;
