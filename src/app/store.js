import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "../redux/studentSlice";
import bookingReducer from "../redux/bookingSlice";

export const store = configureStore({
  reducer: {
    student: studentReducer,
    bookings: bookingReducer,
  },
});
