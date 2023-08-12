import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartIsVisiable: false,
  notification: null,
};

const UiSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggle(state) {
      state.cartIsVisiable = !state.cartIsVisiable;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export const uiActions = UiSlice.actions;

export default UiSlice;
