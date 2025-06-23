import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Button, Card, Appbar } from 'react-native-paper';

export default function UserDashboardScreen() {
  const router = useRouter();
  const { userId } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="User Dashboard" />
      </Appbar.Header>
      <View style={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
            <Button
              icon="calendar-account"
              mode="contained"
              onPress={() => router.push({ pathname: '/my-attendance', params: { userId } })}
              style={styles.button}
            >
              View My Attendance
            </Button>
            <Button
              icon="chat-question"
              mode="outlined"
              onPress={() => router.push({ pathname: '/report-issue', params: { userId } })}
              style={styles.button}
            >
              Report an Issue
            </Button>
          </Card.Content>
        </Card>
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
  card: {
    width: '100%',
  },
  button: {
    marginVertical: 8,
  },
}); 