import React from 'react';
import { SafeAreaView, Text, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { logout } from '../store/auth.slice';
import { removeToken } from '../utils/storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { showFeedback } from '../store/feedback.slice';

type DashboardNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Dashboard'
>;

export default function DashboardScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<DashboardNavigationProp>();

  const handleLogout = async () => {
    await removeToken(); // Token sil
    dispatch(logout()); // Redux state sıfırla
    dispatch(showFeedback({ message: 'Çıkış başarılı.', type: 'success' }));
    navigation.replace('Login'); // Login ekranına yönlendir
  };

  return (
    <SafeAreaView>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Dashboard 🚀</Text>
      <Button title="Bireysel Oyna" onPress={() => {}} />
      <Button title="Çoklu Oyna" onPress={() => {}} />
      <Button title="Profil" onPress={() => {}} />
      <Button title="Çıkış Yap" onPress={handleLogout} color="red" />
    </SafeAreaView>
  );
}
