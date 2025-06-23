import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Text, Card } from 'react-native-paper';

export default function WelcomeScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text variant="displayMedium" style={styles.title}>
        Smart Attendance
      </Text>
      <Text variant="titleMedium" style={styles.subtitle}>
        Select your role to begin
      </Text>
      <Card style={styles.card}>
        <Card.Content>
          <Button
            icon="account-shield"
            mode="contained"
            onPress={() => router.push('/login-admin')}
            style={styles.button}
          >
            Login as Admin
          </Button>
          <Button
            icon="face-recognition"
            mode="outlined"
            onPress={() => router.push('/login-user')}
            style={styles.button}
          >
            Login as User
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: 32,
    textAlign: 'center',
    color: '#666',
  },
  card: {
    width: '100%',
    maxWidth: 400,
  },
  button: {
    marginTop: 12,
  },
});
