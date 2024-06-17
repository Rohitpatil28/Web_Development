import { configureStore } from "@reduxjs/toolkit";
import cartDataSlice from "./slices/cartSlice";

const store = configureStore({
  reducer: {
    cartReducer: cartDataSlice.reducer
  }
})

export default store;