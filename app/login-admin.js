import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { TextInput, Button, Text } from 'react-native-paper';
import { supabase, testSupabaseConnection } from '../services/supabase';

export default function AdminLoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('checking');

  useEffect(() => {
    // Test Supabase connection on component mount
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      const isConnected = await testSupabaseConnection();
      setConnectionStatus(isConnected ? 'connected' : 'failed');
    } catch (error) {
      console.error('Connection check failed:', error);
      setConnectionStatus('failed');
    }
  };

  const handleLogin = async () => {
    if (connectionStatus !== 'connected') {
      Alert.alert(
        'Connection Error', 
        'Cannot connect to the server. Please check your internet connection and try again.'
      );
      return;
    }

    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setLoading(true);
    
    try {
      console.log('Attempting login with email:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) {
        console.error('Login error:', error);
        Alert.alert('Login Failed', error.message || 'An error occurred during login');
      } else if (data.user) {
        console.log('User authenticated:', data.user.id);
        
        // Check if the user has the 'admin' role in your 'users' table
        try {
          const { data: userProfile, error: profileError } = await supabase
            .from('users')
            .select('role')
            .eq('id', data.user.id)
            .single();
          
          if (profileError) {
            console.error('Profile fetch error:', profileError);
            Alert.alert('Login Failed', 'Unable to verify admin privileges. Please contact support.');
            await supabase.auth.signOut();
          } else if (userProfile?.role !== 'admin') {
            Alert.alert('Login Failed', 'You do not have admin privileges.');
            await supabase.auth.signOut();
          } else {
            Alert.alert('Login Success', 'Welcome, Admin!');
            router.replace('/admin-dashboard');
          }
        } catch (profileErr) {
          console.error('Profile check error:', profileErr);
          Alert.alert('Login Failed', 'Error verifying admin privileges. Please try again.');
          await supabase.auth.signOut();
        }
      }
    } catch (err) {
      console.error('Unexpected error during login:', err);
      Alert.alert('Login Error', 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Admin Login</Text>
      
      {/* Connection Status Indicator */}
      <View style={styles.statusContainer}>
        <Text variant="bodySmall" style={[
          styles.statusText,
          connectionStatus === 'connected' ? styles.statusConnected : 
          connectionStatus === 'failed' ? styles.statusFailed : 
          styles.statusChecking
        ]}>
          {connectionStatus === 'connected' ? '✓ Connected' :
           connectionStatus === 'failed' ? '✗ Connection Failed' :
           'Checking connection...'}
        </Text>
      </View>
      
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        disabled={loading}
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
        disabled={loading}
      />

      <Button 
        mode="contained" 
        onPress={handleLogin} 
        loading={loading}
        disabled={loading || connectionStatus !== 'connected'}
        style={styles.button}
      >
        Login
      </Button>

      {connectionStatus === 'failed' && (
        <Button 
          mode="outlined" 
          onPress={checkConnection}
          style={styles.retryButton}
        >
          Retry Connection
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
  },
  statusContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  statusText: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusConnected: {
    backgroundColor: '#e8f5e8',
    color: '#2e7d32',
  },
  statusFailed: {
    backgroundColor: '#ffebee',
    color: '#c62828',
  },
  statusChecking: {
    backgroundColor: '#fff3e0',
    color: '#ef6c00',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  retryButton: {
    marginTop: 16,
  }
}); 