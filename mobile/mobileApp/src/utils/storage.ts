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
  } catch (error) {
    console.error('Token silinemedi:', error);
  }
};
