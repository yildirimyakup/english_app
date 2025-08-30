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
import { useRegisterMutation } from '../../store/api';
import { RootStackParamList } from '../../navigation/AppNavigator';
import Input from '../../components/auth/Input';
import PrimaryButton from '../../components/auth/PrimaryButton';
import { showFeedback } from '../../store/feedback.slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
type RegisterScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

export default function RegisterScreen() {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const [name, setName] = useState('');
  const [surename, setSurename] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch<AppDispatch>();

  const [register, { isLoading }] = useRegisterMutation();

  const handleRegister = async () => {
    try {
      const result = await register({
        email,
        password,
        name,
        surename,
      }).unwrap();
      if (result.status === 1) {
        dispatch(showFeedback({ message: result.message, type: 'success' }));
        navigation.replace('Login'); // Başarılı kayıt → login'e
      }
    } catch (err: any) {
      dispatch(showFeedback({ message: err.data.message, type: 'error' }));
    }
  };

  return (
    <ImageBackground
      source={require('../../../assets/bg.png')}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        {/* Başlık */}
        <Text style={styles.title}>📝</Text>
        <Text style={styles.title}>Kayıt Ol</Text>
        <Text style={styles.subtitle}>Word Battle Dünyasına Katıl!</Text>

        {/* Inputlar */}
        <View style={styles.inputWrapper}>
          <Input value={name} onChangeText={setName} placeholder="Ad" />
          <Input
            value={surename}
            onChangeText={setSurename}
            placeholder="Soyad"
          />
          <Input value={email} onChangeText={setEmail} placeholder="E-mail" />
          <Input
            value={password}
            onChangeText={setPassword}
            placeholder="Password/Şifre"
            secureTextEntry
          />
        </View>

        {/* Register butonu */}
        <PrimaryButton
          title={isLoading ? 'Kayıt yapılıyor...' : 'Kayıt Ol'}
          onPress={handleRegister}
          loading={isLoading}
        />

        {/* Alt Link */}
        <View style={styles.bottomLinks}>
          <TouchableOpacity onPress={() => navigation.replace('Login')}>
            <Text style={styles.linkText}>Zaten hesabın var mı? Giriş Yap</Text>
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
  bottomLinks: { marginTop: 25, alignItems: 'center', gap: 12 },
  linkText: {
    fontSize: 14,
    color: '#fbfbfbff',
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
});
