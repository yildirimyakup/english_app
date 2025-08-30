import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForgotPasswordMutation } from '../../store/api';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import Input from '../../components/auth/Input';
import PrimaryButton from '../../components/auth/PrimaryButton';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { showFeedback } from '../../store/feedback.slice';

type ForgotScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

export default function ForgotPasswordScreen() {
  const navigation = useNavigation<ForgotScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const dispatch = useDispatch<AppDispatch>();

  const handleForgot = async () => {
    try {
      const result = await forgotPassword({ email }).unwrap();
      dispatch(showFeedback({ message: result.message, type: 'success' }));
      navigation.replace('Login'); // başarıdan sonra login'e
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
        <Text style={styles.title}>🔑</Text>
        <Text style={styles.title}>Şifre Sıfırla</Text>
        <Text style={styles.subtitle}>
          Mail adresinizi girin, sıfırlama linki gönderelim
        </Text>

        {/* Input */}
        <View style={styles.inputWrapper}>
          <Input value={email} onChangeText={setEmail} placeholder="E-mail" />
        </View>

        {/* Buton */}
        <PrimaryButton
          title={isLoading ? 'Gönderiliyor...' : 'Mail Gönder'}
          onPress={handleForgot}
          loading={isLoading}
        />

        {/* Alt Link */}
        <View style={styles.bottomLinks}>
          <TouchableOpacity onPress={() => navigation.replace('Login')}>
            <Text style={styles.linkText}>Geri Dön → Giriş Yap</Text>
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
