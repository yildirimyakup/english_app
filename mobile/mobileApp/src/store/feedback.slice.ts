import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FeedbackState = {
  message: string | null;
  type: 'success' | 'error' | null;
};

const initialState: FeedbackState = {
  message: null,
  type: null,
};

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    showFeedback: (
      state,
      action: PayloadAction<{ message: string; type: 'success' | 'error' }>,
    ) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    clearFeedback: state => {
      state.message = null;
      state.type = null;
    },
  },
});

export const { showFeedback, clearFeedback } = feedbackSlice.actions;
export default feedbackSlice.reducer;
