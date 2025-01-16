import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import HistoryCard from '../components/HistoryCard';

const data = [
    {
      id: '1',
      startDate: 'Sat 13 Jan 2024 10:00am',
      endDate: 'Sat 13 Jan 2024 6:00pm',
      distance: 12.5,
      stationaryTime: '2 hours',
      walkingTime: '3 hours',
      runningTime: '1 hour',
    },
    {
      id: '2',
      startDate: 'Sun 14 Jan 2024 9:00am',
      endDate: 'Sun 14 Jan 2024 5:00pm',
      distance: 15.0,
      stationaryTime: '1.5 hours',
      walkingTime: '4 hours',
      runningTime: '1.5 hours',
    },
    {
      id: '3',
      startDate: 'Sun 14 Jan 2024 9:00am',
      endDate: 'Sun 14 Jan 2024 5:00pm',
      distance: 15.0,
      stationaryTime: '1.5 hours',
      walkingTime: '4 hours',
      runningTime: '1.5 hours',
    },
    {
      id: '4',
      startDate: 'Sun 14 Jan 2024 9:00am',
      endDate: 'Sun 14 Jan 2024 5:00pm',
      distance: 15.0,
      stationaryTime: '1.5 hours',
      walkingTime: '4 hours',
      runningTime: '1.5 hours',
    },
    {
      id: '5',
      startDate: 'Sun 14 Jan 2024 9:00am',
      endDate: 'Sun 14 Jan 2024 5:00pm',
      distance: 15.0,
      stationaryTime: '1.5 hours',
      walkingTime: '4 hours',
      runningTime: '1.5 hours',
    },
    {
      id: '6',
      startDate: 'Sun 14 Jan 2024 9:00am',
      endDate: 'Sun 14 Jan 2024 5:00pm',
      distance: 15.0,
      stationaryTime: '1.5 hours',
      walkingTime: '4 hours',
      runningTime: '1.5 hours',
    },
  ];

export default function HistoryScreen({ navigation }) {
    return (
        <View style={styles.container}>
          <FlatList
            data={data}
            renderItem={({ item }) => <HistoryCard item={item} />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    listContainer: { padding: 10 },
  });