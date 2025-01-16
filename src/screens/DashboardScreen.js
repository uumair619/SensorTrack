// import React from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';

// // export default function DashboardScreen({ navigation }) {
// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>Dashboard</Text>
// //       <Button title="Go to User Map Tracker" onPress={() => navigation.navigate('Tracking')} />
// //       <Button title="Go to History" onPress={() => navigation.navigate('History')} />
// //       <Button title="Medicine Reminder" onPress={() => navigation.navigate('Medicine Reminder')} />
// //     </View>
// //   );
// // }



// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
// });

import React, { useState, useEffect , NativeEventEmitter, NativeModules } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  DeviceEventEmitter,
  Button,
} from 'react-native';
import LottieView from 'lottie-react-native'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { FAB } from 'react-native-paper'; 
export default function DashboardScreen({ navigation }) {
  
  //var cmanager = React.LocationServiceModule;
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [activity, setActivity] = useState('walking'); 
  const [walkingTime, setWalkingTime] = useState('00:15:30'); 
  const [runningTime, setRunningTime] = useState('00:05:10');
  const [stationaryTime, setStationaryTime] = useState('00:20:45');

  useEffect(() => {
    const loadSessionState = async () => {
      console.log(NativeModules.Something)
      const session = await AsyncStorage.getItem('currentSession');
      setIsSessionActive(session === 'active');
    };
    loadSessionState();

    const subscription = DeviceEventEmitter.addListener(
      'LocationServiceData',
      (data) => {
        console.log('Received data from service:', data);
        setLocationData(data);
      }
    );

    return () => {
      // Clean up listener on unmount
      subscription.remove();
    };
  }, []);


  const startService = () => {
    cmanager.startService();
  };

  const stopService = () => {
    cmanager.stopService();
  };

  const toggleSession = async () => {
    const newSessionState = !isSessionActive;
    setIsSessionActive(newSessionState);

    if (newSessionState) {
      await AsyncStorage.setItem('currentSession', 'active');
      startService()
    } else {
      await AsyncStorage.removeItem('currentSession');
      stopService
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Current Session Activity</Text>

      {isSessionActive ? (
        <View style={styles.card}>
          {/* Lottie Animation */}
          <LottieView
            source={
              activity === 'walking'
                ? require('../assets/anim/walking.json')
                : activity === 'stationary'
                ? require('../assets/anim/standing.json')
                : require('../assets/anim/running.json')
            }
            autoPlay
            loop
            style={styles.lottieAnimation}
          />
          {/* Activity Text */}
          <Text style={styles.activityText}>
            {activity.charAt(0).toUpperCase() + activity.slice(1)}
          </Text>
          {/* Time */}
          <Text style={styles.timeText}>Walking: {walkingTime}</Text>
          <Text style={styles.timeText}>Running: {runningTime}</Text>
          <Text style={styles.timeText}>Stationary: {stationaryTime}</Text>

          {/* 3 Sections */}
          <View style={styles.sectionsContainer}>
            <Text style={styles.sectionText}>Light: 120 kcal</Text>
          </View>
          <TouchableOpacity
          style={styles.viewAllContainer}
          onPress={() => navigation.navigate('Tracking')}>
          <Text style={styles.viewAllText}>Viw on Map</Text>
        </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.noSessionText}>
            No active session. Start a session by pressing '+' at the bottom
          </Text>
          <TouchableOpacity
          style={styles.viewAllContainer}
          onPress={() => navigation.navigate('History')}>
          <Text style={styles.viewAllText}>History</Text>
        </TouchableOpacity>
        </View>
      )}

    <Text style={styles.title}>Medicine Reminder</Text>



    <View style={styles.cardRelative}>
         <TouchableOpacity
          style={styles.viewAllContainer}
          onPress={() => navigation.navigate('Medicine Reminder')}>
          <Text style={styles.viewAllText}>Add Reminder</Text>
        </TouchableOpacity>

        {/* Medicine Information */}
        <Text style={styles.medicineText}>
          Medicine Name: abbb
        </Text>
        <Text style={styles.medicineText}>Dose: 1</Text>

        {/* Date */}
        <Text style={styles.medicineDate}>
          Date: 27,Jan
        </Text>
    </View>

      {/* Floating Button */}
      <FAB
        style={[styles.fab , { backgroundColor: isSessionActive ? '#FF0000' : '#007AFF' }]}
        icon={isSessionActive ? 'stop' : 'plus'}
        onPress={toggleSession}
        color="#fff"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 20,
    alignItems: 'center',
  },
  cardRelative: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 20,
    alignItems: 'relative',
  },
  lottieAnimation: {
    width: 100,
    height: 100,
  },
  activityText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  timeText: {
    fontSize: 16,
    color: '#555',
  },
  sectionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  sectionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  noSessionText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },

  viewAllText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  viewAllContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  medicineText: {
    fontSize: 16,
    color: '#000',
    marginTop: 10,
  },
  medicineDate: {
    fontSize: 14,
    color: '#555',
    textAlign: 'right',
    marginTop: 20,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20
  },
});