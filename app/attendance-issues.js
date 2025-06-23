import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, FlatList, Alert } from 'react-native';
import { supabase } from '../services/supabase';
import { Appbar, Card, Button, Text, Paragraph, Title } from 'react-native-paper';

export default function AttendanceIssuesScreen() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchIssues = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('issues')
      .select('id, date, message, resolved, users(name)')
      .order('created_at', { ascending: false });
    if (error) {
      setIssues([]);
    } else {
      setIssues(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const resolveIssue = async (id) => {
    const { error } = await supabase
      .from('issues')
      .update({ resolved: true })
      .eq('id', id);
    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Success', 'The issue has been marked as resolved.');
      fetchIssues(); // Refresh the list
    }
  };

  if (loading && !issues.length) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Attendance Issues" />
      </Appbar.Header>
      <FlatList
        data={issues}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Title>{item.users?.name || 'Unknown'}</Title>
              <Paragraph>Date: {item.date}</Paragraph>
              <Paragraph>Message: {item.message}</Paragraph>
              <Text style={{ color: item.resolved ? 'green' : 'orange' }}>
                Status: {item.resolved ? 'Resolved' : 'Pending'}
              </Text>
            </Card.Content>
            {!item.resolved && (
              <Card.Actions>
                <Button onPress={() => resolveIssue(item.id)}>Mark as Resolved</Button>
              </Card.Actions>
            )}
          </Card>
        )}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text>No pending issues found.</Text>
          </View>
        }
        onRefresh={fetchIssues}
        refreshing={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  listContent: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
}); 