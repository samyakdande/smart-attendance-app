import React, { useRef } from 'react';
import { View, StyleSheet, Alert, TextInput, Button, Modal, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { supabase } from '../services/supabase';

// You should host your own HTML/JS for FaceIO, but for demo, we use inline HTML
const faceioHTML = (mode) => `
<!DOCTYPE html>
<html>
  <head>
    <title>FaceIO</title>
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />
  </head>
  <body>
    <h2>Loading FaceIO...</h2>
    <script src=\"https://cdn.faceio.net/fio.js\"></script>
    <script type=\"text/javascript\">
      const faceio = new faceIO('fioa29d6'); // Your Public ID
      
      function sendResult(result) {
        window.ReactNativeWebView.postMessage(JSON.stringify(result));
      }

      async function run() {
        try {
          let payload;
          if ('${mode}' === 'enroll') {
            payload = await faceio.enroll({ locale: 'auto' });
          } else {
            payload = await faceio.authenticate({ locale: 'auto' });
          }
          sendResult({ success: true, payload });
        } catch (err) {
          // Enhanced error handling for error code 16
          let errorMsg = err.toString();
          if (err.code === 16) {
            errorMsg = 'Camera access is required for FaceIO. Please allow camera permissions and try again.';
          }
          sendResult({ success: false, error: errorMsg });
        }
      }
      run();
    </script>
  </body>
</html>
`;

export default function FaceIOScreen() {
  const webviewRef = useRef(null);
  const router = useRouter();
  const { mode, mark } = useLocalSearchParams(); // mode: 'enroll' or 'auth', mark: '1' for attendance

  // For enrollment modal
  const [modalVisible, setModalVisible] = React.useState(false);
  const [newUser, setNewUser] = React.useState({ name: '', email: '' });
  const [faceioId, setFaceioId] = React.useState(null);

  const handleMessage = async (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.success) {
        const faceId = data.payload.facialId;
        if ((mode || 'auth') === 'auth') {
          // User login or attendance marking
          const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('faceio_id', faceId)
            .single();
          if (user) {
            if (mark === '1') {
              // Mark attendance
              const today = new Date().toISOString().slice(0, 10);
              const { error: attError } = await supabase.from('attendance').insert([
                {
                  user_id: user.id,
                  date: today,
                  status: 'present',
                  marked_by: null, // Optionally, set admin ID if available
                },
              ]);
              if (attError) {
                Alert.alert('Attendance Error', attError.message);
              } else {
                Alert.alert('Attendance Marked', `Attendance marked for ${user.name}`);
                router.replace('/admin-dashboard');
              }
            } else {
              // User login
              Alert.alert('Login Success', `Welcome, ${user.name}`);
              router.replace({ pathname: '/user-dashboard', params: { userId: user.id } });
            }
          } else {
            Alert.alert('Not Found', 'Face not recognized.');
          }
        } else {
          // Enrollment: prompt for user details
          setFaceioId(faceId);
          setModalVisible(true);
        }
      } else {
        Alert.alert('FaceIO Error', data.error);
      }
    } catch (e) {
      Alert.alert('Error', 'Invalid message from WebView');
    }
  };

  const handleRegister = async () => {
    if (!newUser.name || !newUser.email) {
      Alert.alert('Error', 'Please enter name and email');
      return;
    }
    // Register new user in Supabase
    const { data, error } = await supabase.from('users').insert([
      {
        name: newUser.name,
        email: newUser.email,
        role: 'user',
        faceio_id: faceioId,
      },
    ]);
    if (error) {
      Alert.alert('Registration Error', error.message);
    } else {
      Alert.alert('User Registered', 'User has been added successfully!');
      setModalVisible(false);
      setNewUser({ name: '', email: '' });
      setFaceioId(null);
      router.replace('/admin-dashboard');
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webviewRef}
        originWhitelist={['*']}
        source={{ html: faceioHTML(mode || 'auth') }}
        onMessage={handleMessage}
        javaScriptEnabled
        style={{ flex: 1 }}
        mediaPlaybackRequiresUserAction={false}
        allowsInlineMediaPlayback={true}
        androidHardwareAccelerationDisabled={false}
        allowsFullscreenVideo={true}
      />
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Register New User</Text>
            <TextInput
              placeholder="Name"
              value={newUser.name}
              onChangeText={(text) => setNewUser((u) => ({ ...u, name: text }))}
              style={styles.input}
            />
            <TextInput
              placeholder="Email"
              value={newUser.email}
              onChangeText={(text) => setNewUser((u) => ({ ...u, email: text }))}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Button title="Register" onPress={handleRegister} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} color="red" />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginBottom: 12,
  },
});