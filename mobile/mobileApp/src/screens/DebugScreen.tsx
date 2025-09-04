import React from 'react';
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { clearLogs } from '../store/logs/loger.slice';

export default function DebugScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const logs = useSelector((state: RootState) => state.logger);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📜 Debug Loglar</Text>
        <TouchableOpacity onPress={() => dispatch(clearLogs())}>
          <Text style={styles.clearButton}>Temizle</Text>
        </TouchableOpacity>
      </View>

      {logs.map((log, i) => (
        <View
          key={i}
          style={[styles.logRow, log.type === 'error' && styles.errorRow]}
        >
          <Text style={styles.time}>{log.time}</Text>
          <Text
            style={[styles.message, log.type === 'success' && styles.success]}
          >
            {log.message}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#111' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  clearButton: { color: '#f55', fontWeight: 'bold' },
  logRow: { flexDirection: 'row', marginBottom: 8 },
  errorRow: { backgroundColor: '#330000', borderRadius: 6, padding: 4 },
  time: { color: '#aaa', marginRight: 8, fontSize: 12 },
  message: { color: '#fff', flexShrink: 1 },
  success: { color: '#0f0' },
});
