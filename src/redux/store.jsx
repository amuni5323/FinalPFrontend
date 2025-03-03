import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import wishlistReducer from "./wishlistSlice";
import cartReducer from "./cartSlice";
import bookReducer from "./bookSlice";
import orderReducer from "./orderSlice"; // ✅ Import orderSlice
import userReducer from "./userSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
    books: bookReducer,
    orders: orderReducer, // ✅ Add orders slice
    users: userReducer,
  },
});

export default store;