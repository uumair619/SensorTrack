import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';

export default function UserMapTrackerScreen({ navigation }) {
  const [coordinates, setCoordinates] = useState([
    { latitude: 37.78825, longitude: -122.4324 },
    { latitude: 37.78845, longitude: -122.4334 },
    { latitude: 37.78865, longitude: -122.4344 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const lastCoordinate = coordinates[coordinates.length - 1];
      const newCoordinate = {
        latitude: lastCoordinate.latitude + 0.0002,
        longitude: lastCoordinate.longitude + 0.0002,
      };
      setCoordinates((prev) => [...prev, newCoordinate]);
    }, 5000); 

    return () => clearInterval(interval);
  }, [coordinates]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
       
        <Polyline
          coordinates={coordinates}
          strokeColor="#FF0000" 
          strokeWidth={3}
        />

        {coordinates.length > 0 && (
          <Marker
            coordinate={coordinates[coordinates.length - 1]}
            title="Current Location"
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
});