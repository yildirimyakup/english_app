import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import Input from '../components/auth/Input';
import PrimaryButton from '../components/auth/PrimaryButton';
import { saveToken } from '../utils/storage';
import { useLoginMutation } from '../store/api';
import { AppDispatch } from '../store/store';
import { login } from '../store/auth.slice';
import { RootStackParamList } from '../navigation/AppNavigator';
import { showFeedback } from '../store/feedback.slice';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loginMutation, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = async () => {
    try {
      const result = await loginMutation({ email, password }).unwrap();
      if (result?.token) {
        await saveToken(result.token);
        dispatch(login());
        dispatch(showFeedback({ message: result.message, type: 'success' }));
        navigation.replace('Dashboard');
      }
    } catch (err: any) {
      dispatch(showFeedback({ message: err.data.message, type: 'error' }));
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/bg.png')} // 🎨 Buraya oyun tarzı gradient görsel ekleyin
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        {/* Başlık */}
        <Text style={styles.title}>🎯</Text>

        <Text style={styles.title}>Word Battle</Text>
        <Text style={styles.subtitle}>Kelime Düellosuna Katıl!</Text>

        {/* Inputlar */}
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
          {/* Beni Hatırla */}
          <TouchableOpacity
            style={styles.rememberRow}
            onPress={() => setRemember(!remember)}
          >
            <View
              style={[styles.checkbox, remember && styles.checkboxActive]}
            />
            <Text style={styles.rememberText}>Beni Hatırla</Text>
          </TouchableOpacity>

          {/* Şifremi Unuttum */}
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text style={styles.linkText}>Şifremi Unuttum</Text>
          </TouchableOpacity>
        </View>

        {/* Beni Hatırla */}

        {/* Login butonu */}
        <PrimaryButton
          title={'Giriş Yap'}
          onPress={handleLogin}
          loading={isLoading}
        />

        {/* Alt Linkler */}
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
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  rowLinks: {
    marginHorizontal: 10,
    flexDirection: 'row', // yan yana
    justifyContent: 'space-between', // biri sola, biri sağa yaslansın
    alignItems: 'center',
  },

  title: {
    fontSize: 36,
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
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
  checkboxActive: {
    backgroundColor: '#6A11CB',
  },
  rememberText: { fontSize: 14, color: '#fff' },
  bottomLinks: { marginTop: 25, alignItems: 'center', gap: 12 },
  linkText: {
    fontSize: 14,
    color: '#fbfbfbff',
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
});
