import AsyncStorage from '@react-native-async-storage/async-storage';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { apiURLConfig } from '../services/api/index.service';

const { API_URL } = apiURLConfig();

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL, // 🔹 backend adresi buraya
    prepareHeaders: async headers => {
      const token = await AsyncStorage.getItem('user_token'); // mobilde AsyncStorage
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: builder => ({
    login: builder.mutation<any, { email: string; password: string }>({
      query: credentials => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<
      any, // response tipi
      { email: string; password: string; name: string; surename: string } // request body tipi
    >({
      query: newUser => ({
        url: 'auth/register',
        method: 'POST',
        body: newUser,
      }),
    }),
    forgotPassword: builder.mutation<
      { status: number; message: string }, // Response
      { email: string } // Request
    >({
      query: data => ({
        url: 'auth/forgot-password',
        method: 'POST',
        body: data,
      }),
    }),

    getWordsExport: builder.query<any, string | void>({
      query: updatedAfter =>
        updatedAfter
          ? `words/export/json?updatedAfter=${updatedAfter}`
          : 'words/export/json',
    }),
    getLevelsExport: builder.query<any, string | void>({
      query: updatedAfter =>
        updatedAfter
          ? `levels/export/json?updatedAfter=${updatedAfter}`
          : 'levels/export/json',
    }),
    getUserWords: builder.query<any, any>({
      query: userId => `/user-words/${userId}`,
    }),
    getUserLevels: builder.query<any, any>({
      query: userId => `/user-levels/${userId}`,
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useGetWordsExportQuery,
  useGetLevelsExportQuery,
  useLazyGetWordsExportQuery, // ✅ lazy query
  useLazyGetLevelsExportQuery, // ✅ lazy query
  useLazyGetUserWordsQuery,
  useLazyGetUserLevelsQuery,
} = api;
