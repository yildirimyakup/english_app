import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../store/auth.slice';
import {
  resetUserData,
  insertUserWords,
  insertUserLevels,
} from '../database/user.sync';
import { api } from '../store/api';

export const loginService = async (
  dispatch: any,
  email: string,
  password: string,
) => {
  // 1. API çağrısı
  const res: any = await dispatch(
    api.endpoints.login.initiate({ email, password }),
  ).unwrap();

  const { token, user } = res;

  // 2. Redux + AsyncStorage
  dispatch(login({ token, user: user }));
  await AsyncStorage.setItem('user_token', token);
  await AsyncStorage.setItem('userId', user._id);

  // 3. Local tabloları temizle + backend’den verileri getir
  await resetUserData();

  const [words, levels] = await Promise.all([
    dispatch(api.endpoints.getUserWords.initiate(user._id)).unwrap(),
    dispatch(api.endpoints.getUserLevels.initiate(user._id)).unwrap(),
  ]);

  await insertUserWords(user._id, words.words);
  await insertUserLevels(user._id, levels.levels);

  return { message: 'Giriş başarılı', user };
};
