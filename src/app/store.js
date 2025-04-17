import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "../redux/studentSlice";

export const store = configureStore({
  reducer: {
    student: studentReducer,
  },
});
