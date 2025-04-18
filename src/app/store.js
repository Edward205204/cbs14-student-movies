import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "../stores/student-slice";
import bookingReducer from "../stores/booking-slice";

export const store = configureStore({
  reducer: {
    student: studentReducer,
    bookings: bookingReducer,
  },
});
