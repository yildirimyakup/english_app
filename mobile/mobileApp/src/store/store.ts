import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth.slice';
import feedbackReducer from './feedback.slice';
import { api } from './api';
export const store = configureStore({
  reducer: {
    // reducerlarımız buraya gelecek
    auth: authReducer,
    feedback: feedbackReducer, // ✅ buraya ekle
    [api.reducerPath]: api.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
});

// store tipleri
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
