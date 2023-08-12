import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  changed: false,
};

const CartSlice = createSlice({
  name: "cart-item",
  initialState,
  reducers: {
    replaceCart(state, action) {
      state.items = action.payload.items;
      state.totalQuantity = action.payload.totalQuantity;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const ExistingItem = state.items.find((item) => item.id === newItem.id);
      state.changed = true;
      if (!ExistingItem) {
        state.items.push({
          id: newItem.id,
          quantity: 1,
          price: newItem.price,
          totalPrice: newItem.price,
          name: newItem.title,
          description: newItem.description,
        });
      } else {
        ExistingItem.quantity++;
        ExistingItem.totalPrice += ExistingItem.price;
      }
      state.totalQuantity++;
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const ExistingItem = state.items.find((el) => el.id === id);
      state.changed = true;
      if (ExistingItem.quantity > 1) {
        ExistingItem.quantity--;
        ExistingItem.totalPrice -= ExistingItem.price;
      } else {
        state.items = state.items.filter((item) => item.id !== id);
      }
      if (state.totalQuantity < 1) return;
      state.totalQuantity--;
    },
  },
});

export const cartSliceActions = CartSlice.actions;

export default CartSlice;
