import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookings: [],
};

export const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    setBookings: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.bookings = action.payload;
      }
    },
    addBooking: (state, action) => {
      if (action.payload && Array.isArray(action.payload.seats)) {
        state.bookings.push(action.payload);
        try {
          localStorage.setItem("movieBookings", JSON.stringify(state.bookings));
        } catch (error) {
          console.error("Lỗi khi lưu vào localStorage:", error);
        }
      }
    },
  },
});

export const { setBookings, addBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
