import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useSelector, useDispatch } from "react-redux";
import { addBooking, setBookings } from "../stores/booking-slice";
import { formSchema } from "../utils/zod";
import Input from "../components/input";
import SeatMap from "../components/seat-map";
import BookingHistory from "../components/booking-history";

const TOTAL_SEATS = 120; //12 cột và 10 hàng

export default function MoviesBooking() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [remainingSeats, setRemainingSeats] = useState(TOTAL_SEATS);
  const [isSelectingSeats, setIsSelectingSeats] = useState(false);
  const dispatch = useDispatch();
  const bookings = useSelector((state) =>
    Array.isArray(state?.bookings?.bookings) ? state.bookings.bookings : []
  );

  useEffect(() => {
    try {
      const savedBookings =
        JSON.parse(localStorage.getItem("movieBookings")) || [];
      if (Array.isArray(savedBookings)) {
        dispatch(setBookings(savedBookings));
      }
    } catch (error) {
      console.error("Error loading from localStorage:", error);
      dispatch(setBookings([]));
    }
  }, [dispatch]);

  useEffect(() => {
    let allReservedSeats = [];
    bookings.forEach((booking) => {
      if (booking?.seats && Array.isArray(booking.seats)) {
        allReservedSeats = [...allReservedSeats, ...booking.seats];
      }
    });
    setRemainingSeats(TOTAL_SEATS - allReservedSeats.length);
  }, [bookings]);

  const formik = useFormik({
    initialValues: { name: "", numSeats: 1 },
    validationSchema: toFormikValidationSchema(formSchema),
    onSubmit: (values) => {
      if (values.numSeats > remainingSeats) {
        alert(`Only ${remainingSeats} seats remaining!`);
        return;
      }
      setIsSelectingSeats(true);
    },
  });

  const toggleSeat = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else if (selectedSeats.length < formik.values.numSeats) {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleConfirm = () => {
    if (selectedSeats.length !== formik.values.numSeats) {
      alert(`Please select ${formik.values.numSeats} seats`);
      return;
    }

    const booking = {
      name: formik.values.name,
      numSeats: formik.values.numSeats,
      seats: [...selectedSeats],
      date: new Date().toLocaleString(),
    };

    dispatch(addBooking(booking));
    setIsSelectingSeats(false);
    formik.resetForm();
    setSelectedSeats([]);
  };

  const reservedSeats = [];
  bookings.forEach((booking) => {
    if (booking?.seats && Array.isArray(booking.seats)) {
      reservedSeats.push(...booking.seats);
    }
  });

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <h1 className="text-5xl font-bold mb-4 mt-16">Movie Seat Selection</h1>
      <div className="mb-4 text-lg">
        Available seats:{" "}
        <span className="font-bold">
          {remainingSeats}/{TOTAL_SEATS}
        </span>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mb-8"
      >
        <div className="m-4 text-yellow-400">
          fill the required details below and select your seats
        </div>

        <Input
          id="name"
          name="name"
          label="Name"
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.touched.name && formik.errors.name}
          disabled={isSelectingSeats}
        />

        <Input
          id="numSeats"
          name="numSeats"
          type="number"
          label="Number of seats"
          onChange={formik.handleChange}
          value={formik.values.numSeats}
          error={formik.touched.numSeats && formik.errors.numSeats}
          min={1}
          max={remainingSeats}
          disabled={isSelectingSeats}
          className="mt-4"
        />
        <button
          type="submit"
          disabled={
            !formik.values.name ||
            formik.values.numSeats > remainingSeats ||
            isSelectingSeats
          }
          className={`w-full py-2 rounded ${
            !formik.values.name ||
            formik.values.numSeats > remainingSeats ||
            isSelectingSeats
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          Start Selecting Seats
        </button>
      </form>

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-4">
          Seat Selection{" "}
          {isSelectingSeats && (
            <span className="text-sm font-normal">
              ({selectedSeats.length}/{formik.values.numSeats} selected)
            </span>
          )}
        </h2>

        <SeatMap
          selectedSeats={selectedSeats}
          reservedSeats={reservedSeats}
          isSelectingSeats={isSelectingSeats}
          maxSeats={formik.values.numSeats}
          onSeatClick={toggleSeat}
        />

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleConfirm}
            disabled={selectedSeats.length !== formik.values.numSeats}
            className={`py-2 px-8 rounded text-lg ${
              selectedSeats.length !== formik.values.numSeats
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            Confirm Selection
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl mt-8">
        <BookingHistory bookings={bookings} />
      </div>
    </div>
  );
}
