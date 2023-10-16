import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { AppState, ShowNotificationPayload, SNACKBAR_COLORS } from './types';

const initialState: AppState = {
  notifications: [],
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    showSnackbar: (state, action: PayloadAction<ShowNotificationPayload>) => {
      const { payload } = action;

      state.notifications.push({
        message: payload.message,
        key: new Date().getTime(),
        options: {
          ...payload.options,
          variant: payload.type ?? SNACKBAR_COLORS.ERROR,
        },
      });
    },
    removeSnackbar: (state, action) => {
      state.notifications.filter((notification) => notification.key !== action.payload);
    },
  },
});

export const { showSnackbar, removeSnackbar } = appSlice.actions;
export default appSlice.reducer;
