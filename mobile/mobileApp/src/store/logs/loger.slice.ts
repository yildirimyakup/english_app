import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type LogType = 'info' | 'success' | 'error';

interface Log {
  type: LogType;
  message: string;
  time: string;
}

const loggerSlice = createSlice({
  name: 'logger',
  initialState: [] as Log[],
  reducers: {
    addLog: (state, action: PayloadAction<Log>) => {
      state.push(action.payload);
    },
    clearLogs: () => {
      return [];
    },
  },
});

export const { addLog, clearLogs } = loggerSlice.actions;
export default loggerSlice.reducer;
