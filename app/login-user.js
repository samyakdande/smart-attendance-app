import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Text, Card, Avatar } from 'react-native-paper';

export default function UserLoginScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title
          title="User Login"
          subtitle="Use facial recognition to sign in"
          left={(props) => <Avatar.Icon {...props} icon="face-recognition" />}
        />
        <Card.Content>
          <Button
            mode="contained"
            icon="camera"
            onPress={() => router.push({ pathname: '/faceio', params: { mode: 'auth' } })}
          >
            Scan Face to Login
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
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  card: {
    width: '100%',
  },
}); 