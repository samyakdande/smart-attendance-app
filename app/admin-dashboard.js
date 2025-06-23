import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Card, Appbar, Title } from 'react-native-paper';

export default function AdminDashboardScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Admin Dashboard" />
      </Appbar.Header>
      <View style={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
            <Title>Admin Actions</Title>
            <Button
              icon="account-plus"
              mode="contained"
              onPress={() => router.push({ pathname: '/faceio', params: { mode: 'enroll' } })}
              style={styles.button}
            >
              Register New User
            </Button>
            <Button
              icon="calendar-check"
              mode="contained"
              onPress={() => router.push({ pathname: '/faceio', params: { mode: 'auth', mark: '1' } })}
              style={styles.button}
            >
              Mark Attendance
            </Button>
            <Button
              icon="format-list-checks"
              mode="outlined"
              onPress={() => router.push('/attendance-records')}
              style={styles.button}
            >
              View Attendance Records
            </Button>
            <Button
              icon="alert-circle-check"
              mode="outlined"
              onPress={() => router.push('/attendance-issues')}
              style={styles.button}
            >
              Resolve Attendance Issues
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
    paddingVertical: 4,
  },
}); 