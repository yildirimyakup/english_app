import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Text,
  ActivityIndicator,
  View,
  StyleSheet,
  ImageBackground,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useLazyGetWordsExportQuery,
  useLazyGetLevelsExportQuery,
} from '../store/api';
import { getLastSync } from '../utils/storage';
import { syncAll } from '../services/sync.service';

export default function SyncScreen({ navigation }: any) {
  const [getWords] = useLazyGetWordsExportQuery();
  const [getLevels] = useLazyGetLevelsExportQuery();
  const [progress, setProgress] = useState(0);
  const [lastWord, setLastWord] = useState('');
  const animatedProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(animatedProgress, {
      toValue: progress,
      useNativeDriver: false,
      friction: 8,
      tension: 40,
    }).start();
  }, [animatedProgress, progress]);

  const syncData = useCallback(async () => {
    return await syncAll({ getWords, getLevels, setProgress, setLastWord });
  }, [getWords, getLevels]);

  useEffect(() => {
    const checkSync = async () => {
      const token = await AsyncStorage.getItem('user_token');
      try {
        const lastSync = await getLastSync();
        if (lastSync) {
          if (token) navigation.replace('Dashboard');
          else navigation.replace('Login');

          setTimeout(() => {
            syncData();
          }, 1000);
        } else {
          const ok = await syncData();
          if (ok) {
            if (token) navigation.replace('Dashboard');
            else navigation.replace('Login');
          }
        }
      } catch (err) {
        Alert.alert('Hata', 'Sync kontrolü başarısız.');
      }
    };
    checkSync();
  }, [syncData, navigation]);

  return (
    <ImageBackground
      source={require('../../assets/bg.png')}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.title}>🎯</Text>
        <Text style={styles.title}>Word Battle</Text>
        <Text style={styles.subtitle}>Veriler Senkronize Ediliyor</Text>
        <Text style={styles.subtitle}>
          Lütfen bekleyin... {lastWord ? `(${lastWord})` : ''}
        </Text>

        <View style={styles.progressContainer}>
          <View style={styles.progressWrapper}>
            <View style={styles.progressBackground} />
            <Animated.View
              style={[
                styles.progressFill,
                {
                  width: animatedProgress.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  }),
                },
              ]}
            />
          </View>
          <Text style={styles.percentage}>{Math.round(progress * 100)}%</Text>
        </View>

        {progress < 1 && (
          <ActivityIndicator
            size="large"
            color="#fdfcffff"
            style={{ marginTop: 20 }}
          />
        )}
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  safeArea: { width: '100%', paddingHorizontal: 20 },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#eee',
    marginBottom: 32,
  },
  progressContainer: { width: '100%', alignItems: 'center' },
  progressWrapper: {
    width: '100%',
    height: 12,
    backgroundColor: '#E0E0E0',
    borderRadius: 6,
    overflow: 'hidden',
    marginTop: 10,
  },
  progressBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#f9eeeeff',
  },
  progressFill: { height: '100%', backgroundColor: '#6C63FF', borderRadius: 6 },
  percentage: { marginTop: 10, fontSize: 16, color: '#444' },
});
