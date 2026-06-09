import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: function (state, action) {
      state.items.push(action.payload);
    },

    removeFromCart: function (state, action) {
      state.items = state.items.filter(function (item) {
        return item.id !== action.payload;
      });
    },

    clearCart: function (state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
