import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  ImageBackground,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../store/store';
import { fetchLevelsFromDB } from '../../../store/levels/levelSlice';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/AppNavigator';
import LevelCard from '../../../components/single/LevelCard';

type LevelNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'LevelMap'
>;

export default function LevelMapScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { levels, loading } = useSelector((state: RootState) => state.levels);
  const navigation = useNavigation<LevelNavigationProp>();

  useEffect(() => {
    dispatch(fetchLevelsFromDB());
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>⏳ Seviyeler yükleniyor...</Text>
      </View>
    );
  }

  if (levels.length === 0) {
    return (
      <View style={styles.center}>
        <Text>⚠️ Henüz seviye bulunamadı</Text>
        <Button
          title="Debug Mode"
          onPress={() => navigation.navigate('Debug')}
        />
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../../../../assets/bg.png')}
      style={styles.container}
    >
      <View style={styles.container}>
        <Button
          title="Debug Mode"
          onPress={() => navigation.navigate('Debug')}
        />
        <FlatList
          data={levels}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <LevelCard item={item} />}
          contentContainerStyle={{ paddingVertical: 12 }}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
