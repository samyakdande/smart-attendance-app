import React, { useState } from 'react';
import { View, StyleSheet, Alert, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Appbar, Button, TextInput, Text } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { supabase } from '../services/supabase';

export default function ReportIssueScreen() {
  const { userId } = useLocalSearchParams();
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [message, setMessage] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const handleSubmit = async () => {
    if (!message.trim()) {
      Alert.alert('Error', 'Please enter a message for your issue.');
      return;
    }
    setLoading(true);
    const { error } = await supabase.from('issues').insert([
      {
        user_id: userId,
        date: date.toISOString().slice(0, 10),
        message: message,
        resolved: false,
      },
    ]);
    setLoading(false);
    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Success', 'Your issue has been reported successfully.');
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Report an Issue" />
      </Appbar.Header>
      <View style={styles.content}>
        <Text style={styles.label}>Date of Issue: {date.toLocaleDateString()}</Text>
        <Button mode="outlined" onPress={() => setShowDatePicker(true)} style={{marginBottom: 20}}>
          Select Date
        </Button>
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
        
        <TextInput
            label="Message"
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={4}
            style={styles.input}
        />

        <Button 
            mode="contained" 
            onPress={handleSubmit} 
            loading={loading}
            disabled={loading}
            style={styles.button}
        >
          Submit Issue
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center'
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
}); 