import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HistoryCard = ({ item }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.dateText}>
        Start: {item.startDate} {'\n'}
        End: {item.endDate}
      </Text>
      <Text style={styles.infoText}>Total Distance Covered: {item.distance} km</Text>
      <Text style={styles.infoText}>Total Time Stationary: {item.stationaryTime}</Text>
      <Text style={styles.infoText}>Total Time Walking: {item.walkingTime}</Text>
      <Text style={styles.infoText}>Total Time Running: {item.runningTime}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
});

export default HistoryCard;