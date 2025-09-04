import { Platform } from 'react-native';

export const apiURLConfig = () => {
  const API_URL =
    Platform.OS === 'android'
      ? 'http://192.168.1.159:4000/api'
      : 'http://127.0.0.1:4000/api';
  return { API_URL };
};
