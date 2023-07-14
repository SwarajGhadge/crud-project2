import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";

const store = configureStore({
  reducer: {
    cart: userSlice,       
  },
});


export default store;
