import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'user_token';

export const saveToken = async (token: string) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error('Token kaydedilemedi:', error);
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Token okunamadı:', error);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
    await AsyncStorage.removeItem('userId');
  } catch (error) {
    console.error('Token silinemedi:', error);
  }
};
const LAST_SYNC_KEY = 'last_sync';

export const saveLastSync = async () => {
  const now = new Date().toISOString();
  await AsyncStorage.setItem(LAST_SYNC_KEY, now);
};

export const getLastSync = async (): Promise<string | null> => {
  return await AsyncStorage.getItem(LAST_SYNC_KEY);
};
