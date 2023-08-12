import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./CartSlice";
import UiSlice from "./ui-slice";

const store = configureStore({
  reducer: {
    ui: UiSlice.reducer,
    cart: CartSlice.reducer,
  },
});

export default store;
