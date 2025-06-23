import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { supabase } from '../services/supabase';
import { Appbar, Card, DataTable, Text } from 'react-native-paper';

export default function AttendanceRecordsScreen() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      const { data, error } = await supabase
        .from('attendance')
        .select('id, date, status, users(name)')
        .order('date', { ascending: false });
      if (error) {
        setRecords([]);
      } else {
        setRecords(data);
      }
      setLoading(false);
    };
    fetchRecords();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Attendance Records" />
      </Appbar.Header>
      <Card style={styles.card}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title>Date</DataTable.Title>
            <DataTable.Title>Status</DataTable.Title>
          </DataTable.Header>
          
          <FlatList
            data={records}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <DataTable.Row>
                <DataTable.Cell>{item.users?.name || 'Unknown'}</DataTable.Cell>
                <DataTable.Cell>{item.date}</DataTable.Cell>
                <DataTable.Cell>{item.status}</DataTable.Cell>
              </DataTable.Row>
            )}
            ListEmptyComponent={<View><Text style={styles.emptyText}>No records found.</Text></View>}
          />
        </DataTable>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  card: {
    margin: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    padding: 10,
  }
}); 