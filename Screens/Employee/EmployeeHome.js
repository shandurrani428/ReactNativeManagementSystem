//import liraries
import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import PostList from './PostList';
import {LogBox} from 'react-native';
// create a component
const EmployeeHome = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <ScrollView nestedScrollEnabled={true}>
          <Text style={{fontSize: 20, color: 'black', margin: 10}}>
            Location:
          </Text>
          <View
            style={{
              flexDirection: 'row',
              margin: 10,
            }}>
            <View
              style={{
                flex: 1,
                height: 2,
                backgroundColor: '#3191f7',
              }}
            />
          </View>
          <View
            style={{
              height: '45%',
              margin: 10,
            }}>
            <View style={{alignItems: 'flex-end'}}>
              <TouchableOpacity
                style={{
                  borderRadius: 25,
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#3191f7',
                  width: '45%',
                  top: 10,
                }}>
                <Text style={styles.loginText}>Check In</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                borderRadius: 25,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#3191f7',
                width: '45%',
                margin: 10,
                bottom: 50,
              }}>
              <Text style={styles.loginText}>Check Out</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderRadius: 25,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#3191f7',
                width: '45%',
                left: 10,
                bottom: 50,
              }}
              onPress={() => navigation.navigate('Addpost')}>
              <Text style={styles.loginText}>Add Post</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{fontSize: 20, color: 'black'}}>
                Upcoming Events
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                //To make Circle Shape

                height: 120,
                margin: 10,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => navigation.navigate('CheckAnnounce')}>
              <Text style={{color: 'black', fontSize: 20, right: 1}}>
                ANNOUNCEMENTS
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                margin: 10,
              }}
              onPress={() => navigation.navigate('CheckAnnounce')}>
              <Text style={{fontSize: 15, color: 'black', fontWeight: 'bold'}}>
                Announcements From HR
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                margin: 10,
              }}
              onPress={() => navigation.navigate('EmpHomeChat')}>
              <Text style={{fontSize: 15, color: 'black'}}>
                Send a message to HR
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                margin: 10,
              }}
              onPress={() => navigation.navigate('LeaveApp')}>
              <Text style={{fontSize: 15, color: 'black'}}>
                Apply for leave
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                margin: 10,
              }}>
              <Text style={{fontSize: 15, color: 'black', fontWeight: 'bold'}}>
                Employee Posting
              </Text>
            </TouchableOpacity>

            <PostList />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loginText: {
    color: 'white',
    fontSize: 20,
  },
});

export default EmployeeHome;
