import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
// Import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native';
import ShowError from '../../Components/ShowError';
import ShowSuccess from '../../Components/ShowSuccess';
// Firebase Storage to upload file
import storage from '@react-native-firebase/storage';
// To pick the file from local file system
import DocumentPicker from 'react-native-document-picker';
import firestore from '@react-native-firebase/firestore';

const Addpost = () => {
  // State Defination
  const [loading, setLoading] = useState(false);
  const [filePath, setFilePath] = useState({});
  const [process, setProcess] = useState('');
  const [text, setText] = useState('');
  const [u, setU] = useState('');
  useEffect(() => {
    //Runs on every render
  }, [uploadImages]);
  const _chooseFile = async () => {
    try {
      const fileDetails = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
        copyTo: 'cachesDirectory',
      });

      console.log('fileDetails : ' + JSON.stringify(fileDetails));

      setFilePath(fileDetails);
    } catch (error) {
      setFilePath({});

      ShowError(
        DocumentPicker.isCancel(error)
          ? 'Canceled'
          : 'Unknown Error: ' + JSON.stringify(error),
      );
    }
  };

  const uploadImages = async () => {
    try {
      if (text.length == 0) {
        ShowError('Enter the Description');
      } else {
        const reference = await storage().ref(`${filePath.name}`);
        const task = reference.putFile(
          filePath.fileCopyUri.replace('file://', ''),
        );

        task.on('state_changed', taskSnapshot => {
          setProcess(
            `${taskSnapshot.bytesTransferred} transferred 
           out of ${taskSnapshot.totalBytes}`,
          );
        });

        task.then(() => {
          ShowSuccess('Your Post Successfully Uploaded');
          setProcess('');
          setText('');
        });

        const url = await storage().ref(filePath.name).getDownloadURL();
        console.log(url);
        console.log(text);
        console.log(filePath.fileCopyUri.replace('file://', ''));
        console.log(filePath.name);

        firestore()
          .collection('EMP')
          .add({
            Text: text,
            Status: false,
            Image: url,
          })
          .then(() => {
            console.log('User added!');
          });

        setFilePath({});
      }
    } catch (error) {
      console.log('Error->', error);
    }
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <SafeAreaView style={{flex: 1}}>
          <View style={styles.container}>
            <ScrollView>
              <Text style={styles.titleText}>ADD SOME POST</Text>
              <View style={styles.container}>
                <Text>Choose File and Upload to FireStorage</Text>
                <Text>{process}</Text>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={{justifyContent: 'center', alignItems: 'center'}}
                  onPress={_chooseFile}>
                  <Icon name="image" size={95} color="black" />
                  <Text style={{color: 'black'}}>
                    Click to Upload Image(Selected:{' '}
                    {Object.keys(filePath).length == 0 ? 0 : 1})
                  </Text>
                </TouchableOpacity>

                <TextInput
                  multiline={true}
                  numberOfLines={10}
                  style={{
                    height: 200,
                    width: 300,
                    textAlignVertical: 'top',
                    backgroundColor: 'powderblue',
                    borderRadius: 5,
                    margin: 20,
                    borderColor: 'white',
                    padding: 10,
                  }}
                  placeholder="Type something"
                  placeholderTextColor="grey"
                  value={text}
                  onChangeText={e => setText(e)}
                />
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={uploadImages}>
                  <Text style={styles.buttonTextStyle}>POST</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default Addpost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
    color: '#3191f7',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#3191f7',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
  buttonTextStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
