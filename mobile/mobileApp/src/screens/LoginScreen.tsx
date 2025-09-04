import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Button,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import Input from '../components/auth/Input';
import PrimaryButton from '../components/auth/PrimaryButton';
import { AppDispatch } from '../store/store';
import { RootStackParamList } from '../navigation/AppNavigator';
import { showFeedback } from '../store/feedback.slice';
import { handleLogin } from '../store/thunks/auth.thunks';
import { logInfo, logError } from '../utils/loger';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      logInfo('Deneme');

      const res: any = await dispatch(handleLogin(email, password));
      dispatch(showFeedback({ message: res.message, type: 'success' }));
      navigation.replace('Dashboard');
    } catch (err: any) {
      logError('Giriş Hatası');
      dispatch(
        showFeedback({
          message: '❌ Giriş başarısız: ' + (err?.message || 'Bilinmeyen hata'),
          type: 'error',
        }),
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/bg.png')}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>🎯</Text>
        <Text style={styles.title}>Word Battle</Text>
        <Text style={styles.subtitle}>Kelime Düellosuna Katıl!</Text>

        <View style={styles.inputWrapper}>
          <Input value={email} onChangeText={setEmail} placeholder="E-mail" />
          <Input
            value={password}
            onChangeText={setPassword}
            placeholder="Password/Şifre"
            secureTextEntry
          />
        </View>

        <View style={styles.rowLinks}>
          <TouchableOpacity
            style={styles.rememberRow}
            onPress={() => setRemember(!remember)}
          >
            <View
              style={[styles.checkbox, remember && styles.checkboxActive]}
            />
            <Text style={styles.rememberText}>Beni Hatırla</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text style={styles.linkText}>Şifremi Unuttum</Text>
          </TouchableOpacity>
        </View>

        <PrimaryButton
          title="Giriş Yap"
          onPress={handleSubmit}
          loading={isLoading}
        />

        <Button
          title="Debug Mode"
          onPress={() => navigation.navigate('Debug')}
        />

        <View style={styles.bottomLinks}>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.linkText}>Hesabın yok mu? Kayıt Ol</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: 'cover' },
  container: { flex: 1, justifyContent: 'center', paddingHorizontal: 24 },
  rowLinks: {
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
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
  inputWrapper: {
    backgroundColor: 'rgba(255,255,255,1)',
    padding: 16,
    borderRadius: 16,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#fff',
    marginRight: 8,
  },
  checkboxActive: { backgroundColor: '#6A11CB' },
  rememberText: { fontSize: 14, color: '#fff' },
  bottomLinks: { marginTop: 25, alignItems: 'center', gap: 12 },
  linkText: {
    fontSize: 14,
    color: '#fbfbfbff',
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
});
