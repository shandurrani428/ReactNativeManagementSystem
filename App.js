//import liraries
import React, {Component} from 'react';
import {KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import FlashMessage from 'react-native-flash-message';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import EmployeeHome from './Screens/Employee/EmployeeHome';
import HrHome from './Screens/HRScreen/HrHome';
import CheckPost from './Screens/HRScreen/CheckPost';
import HrProfile from './Screens/HRScreen/HrProfile';
import PostListDetails from './Screens/HRScreen/PostListDetails';
import Addpost from './Screens/Employee/Addpost';
import CheckPostDetails from './Screens/HRScreen/CheckPostDetails';
import Announcements from './Screens/HRScreen/Announcements';
import AnnouceList from './Screens/HRScreen/AnnouceList';
import EmpProfile from './Screens/Employee/EmpProfile';
import CheckAnnounce from './Screens/Employee/CheckAnnounce';
import ChatRoom from './Screens/Employee/ChatRoom';
import RecieveChatRoom from './Screens/HRScreen/RecieveChatRoom';
import HomeChat from './Screens/HRScreen/HomeChat';
import EmpHomeChat from './Screens/Employee/EmpHomeChat';
import Icon from 'react-native-vector-icons/FontAwesome';
import LeaveApp from './Screens/Employee/LeaveApp';
import BackgroundService from 'react-native-background-actions';
const Stack = createNativeStackNavigator();
const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));

const veryIntensiveTask = async taskDataArguments => {
  // Example of an infinite loop task
  const {delay} = taskDataArguments;

  await new Promise(async resolve => {
    for (let i = 0; BackgroundService.isRunning(); i++) {
      console.log(i);
      await sleep(delay);
    }
  });
};

const options = {
  taskName: 'Example',
  taskTitle: 'Location',
  taskDesc: 'latitude/Latitude ',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: 'green',
  linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
  parameters: {
    delay: 9000,
  },
};
// create a component
const App = () => {
  BackgroundService.start(veryIntensiveTask, options);
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <KeyboardAvoidingView style={{flex: 1}} behavior="height">
          <Stack.Navigator>
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="RegisterScreen"
              component={RegisterScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="EmployeeHome"
              component={EmployeeHome}
              options={({navigation}) => ({
                title: 'EMP PIXAKO',
                headerStyle: {
                  backgroundColor: '#3191f7',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },

                headerTitleAlign: 'center',
                headerLeft: () => (
                  <TouchableOpacity
                    onPress={() => navigation.navigate(EmpProfile)}
                    style={{
                      fontWeight: 'bold',
                      fontSize: 20,
                      color: 'black',
                      padding: 5,
                      right: 10,
                      top: 1,
                    }}>
                    <Icon name="list" size={25} color="white" />
                  </TouchableOpacity>
                ),
                headerRight: () => (
                  <TouchableOpacity
                    onPress={() => console.log('circle')}
                    style={{
                      fontWeight: 'bold',
                      fontSize: 25,
                      color: 'black',
                    }}>
                    <Icon name="circle" size={25} color="white" />
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen
              name="HrHome"
              component={HrHome}
              options={({navigation}) => ({
                title: 'HR PIXAKO',
                headerStyle: {
                  backgroundColor: '#3191f7',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },

                headerTitleAlign: 'center',
                headerLeft: () => (
                  <TouchableOpacity
                    onPress={() => navigation.navigate(HrProfile)}
                    style={{
                      fontWeight: 'bold',
                      fontSize: 20,
                      color: 'black',
                      padding: 5,
                      right: 10,
                      top: 1,
                    }}>
                    <Icon name="list" size={25} color="white" />
                  </TouchableOpacity>
                ),
                headerRight: () => (
                  <TouchableOpacity
                    onPress={() => console.log('circle')}
                    style={{
                      fontWeight: 'bold',
                      fontSize: 25,
                      color: 'black',
                    }}>
                    <Icon name="circle" size={25} color="white" />
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen
              name="Addpost"
              component={Addpost}
              options={{
                title: 'Upload File',
                headerStyle: {
                  backgroundColor: '#3191f7',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen
              name="EmpProfile"
              component={EmpProfile}
              options={{
                title: ' PROFILE',
                headerStyle: {
                  backgroundColor: '#3191f7',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen
              name="CheckPost"
              component={CheckPost}
              options={{
                title: 'Post For Approval',
                headerStyle: {
                  backgroundColor: '#3191f7',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen
              name="CheckPostDetails"
              component={CheckPostDetails}
              options={{
                title: ' Approve - Reject',
                headerStyle: {
                  backgroundColor: '#3191f7',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen
              name="PostListDetails"
              component={PostListDetails}
              options={{
                title: ' Details',
                headerStyle: {
                  backgroundColor: '#3191f7',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen
              name="HrProfile"
              component={HrProfile}
              options={{
                title: ' PROFILE',
                headerStyle: {
                  backgroundColor: '#3191f7',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen
              name="Announcements"
              component={Announcements}
              options={{
                title: ' Add Announcements',
                headerStyle: {
                  backgroundColor: '#3191f7',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen
              name="AnnouceList"
              component={AnnouceList}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="CheckAnnounce"
              component={CheckAnnounce}
              options={{
                title: ' Check Announcements',
                headerStyle: {
                  backgroundColor: '#3191f7',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen
              name="ChatRoom"
              component={ChatRoom}
              options={{
                title: 'Chat Inbox',
              }}
            />
            <Stack.Screen
              name="RecieveChatRoom"
              component={RecieveChatRoom}
              options={{
                title: 'Chat Inbox',
              }}
            />
            <Stack.Screen
              name="HomeChat"
              component={HomeChat}
              options={{
                title: 'Available Employees',
                headerLeft: () => (
                  <Icon
                    name="list"
                    size={25}
                    color="#3191f7"
                    style={{padding: 7}}
                  />
                ),
              }}
            />
            <Stack.Screen
              name="EmpHomeChat"
              component={EmpHomeChat}
              options={{
                title: 'Available HR',
                headerLeft: () => (
                  <Icon
                    name="list"
                    size={25}
                    color="#3191f7"
                    style={{padding: 7}}
                  />
                ),
              }}
            />
            <Stack.Screen
              name="LeaveApp"
              component={LeaveApp}
              options={{
                title: 'Leave Application',
              }}
            />
          </Stack.Navigator>
        </KeyboardAvoidingView>
        <FlashMessage position="top" />
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

// define your styles

//make this component available to the app
export default App;
