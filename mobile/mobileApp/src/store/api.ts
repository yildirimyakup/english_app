import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:4000/api', // 🔹 backend adresi buraya
  }),
  endpoints: builder => ({
    login: builder.mutation<any, any>({
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
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
} = api;
