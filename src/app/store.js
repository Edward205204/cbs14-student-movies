import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "../stores/studentSlice";
import bookingReducer from "../stores/bookingSlice";

export const store = configureStore({
  reducer: {
    student: studentReducer,
    bookings: bookingReducer,
  },
});
