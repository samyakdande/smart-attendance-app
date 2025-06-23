import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Dimensions, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import PieChart from 'react-native-pie-chart';
import { supabase } from '../services/supabase';
import { Appbar, Card, Title, Text, DataTable } from 'react-native-paper';

const { width } = Dimensions.get('window');

export default function MyAttendanceScreen() {
  const { userId } = useLocalSearchParams();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState({ present: 0, absent: 0 });

  useEffect(() => {
    const fetchRecords = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('attendance')
        .select('id, date, status')
        .eq('user_id', userId)
        .order('date', { ascending: false });

      if (error) {
        setRecords([]);
      } else {
        setRecords(data);
        // Calculate stats for pie chart
        const presentCount = data.filter((r) => r.status === 'present').length;
        const absentCount = data.filter((r) => r.status === 'absent').length;
        setChartData({ present: presentCount, absent: absentCount });
      }
      setLoading(false);
    };
    fetchRecords();
  }, [userId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const series = [chartData.present, chartData.absent];
  const sliceColor = ['#4CAF50', '#F44336']; // Green for present, Red for absent

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="My Attendance" />
      </Appbar.Header>

      {records.length > 0 && (
        <Card style={styles.card}>
          <Card.Content style={styles.chartContainer}>
            <Title>Summary</Title>
            <PieChart
              widthAndHeight={width / 2.5}
              series={series}
              sliceColor={sliceColor}
              coverRadius={0.45}
              coverFill={'#FFF'}
            />
            <View style={styles.legendContainer}>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: sliceColor[0] }]} />
                <Text>Present: {chartData.present}</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: sliceColor[1] }]} />
                <Text>Absent: {chartData.absent}</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      )}

      <Card style={styles.card}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Date</DataTable.Title>
            <DataTable.Title>Status</DataTable.Title>
          </DataTable.Header>
          <FlatList
            data={records}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <DataTable.Row>
                <DataTable.Cell>{item.date}</DataTable.Cell>
                <DataTable.Cell>
                  <Text style={{ color: item.status === 'present' ? 'green' : 'red' }}>
                    {item.status}
                  </Text>
                </DataTable.Cell>
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
    marginTop: 0,
  },
  chartContainer: {
    alignItems: 'center',
    paddingBottom: 16,
  },
  legendContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  legendColor: {
    width: 10,
    height: 10,
    marginRight: 5,
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
  },
}); 