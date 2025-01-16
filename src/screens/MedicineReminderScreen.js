import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput, Button } from 'react-native-paper';
import LottieView from 'lottie-react-native';

export default function MedicineReminderScreen({ navigation }) {
  const [medicineName, setMedicineName] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
const [dose, setDose] = useState('');

  const handleSave = () => {
    if (medicineName.trim()) {
      alert(`Reminder set for ${medicineName} on ${formatDateTime(date)}`);
    } else {
      alert('Please enter the medicine name.');
    }
  };
  const formatDateTime = (date) => {
    const options = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
    return new Intl.DateTimeFormat('en-US', options).format(date).replace('AM', 'am').replace('PM', 'pm');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Medicine Detail</Text>

      <TextInput
        label="Medicine Name"
        value={medicineName}
        onChangeText={setMedicineName}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Dose"
        value={dose}
        onChangeText={setDose}
        mode="outlined"
        style={styles.input}
        keyboardType="numeric"
      />

      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        style={styles.datePickerTouchable}
      >
        <TextInput
          label="Date & Time"
          value={formatDateTime(date)}
          mode="outlined"
          editable={false} // Disable manual input, only open picker on press
          style={styles.input}
        />
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          is24Hour={false}
          display="default"
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            setShowTimePicker(true);
            if (selectedDate) setDate(selectedDate);

          }}
        />
      )}

    {showTimePicker && (
        <DateTimePicker
          value={date}
          mode="time"
          is24Hour={false}
          display="default"
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            setShowTimePicker(false);
            if (selectedDate) setDate(selectedDate);

          }}
        />
      )}

      <Button mode="contained" onPress={handleSave} style={styles.saveButton}>
        Save
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
      justifyContent: 'center',
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 30,
    },
    input: {
      marginBottom: 20,
    },
    datePickerTouchable: {
      marginBottom: 20,
    },
    saveButton: {
      marginTop: 30,
    },
  });