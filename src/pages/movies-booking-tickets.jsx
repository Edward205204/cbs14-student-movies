import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useSelector, useDispatch } from "react-redux";
import { addBooking, setBookings } from "../redux/bookingSlice";
import { formSchema } from "../utils/zod";

const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const cols = Array.from({ length: 12 }, (_, i) => i + 1);
const TOTAL_SEATS = rows.length * cols.length;

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
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1 font-medium">
            Name<span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
            className="w-full border border-gray-300 rounded p-2"
            disabled={isSelectingSeats}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="numSeats" className="block mb-1 font-medium">
            Number of seats<span className="text-red-500">*</span>
          </label>
          <input
            id="numSeats"
            name="numSeats"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.numSeats}
            min={1}
            max={remainingSeats}
            className="w-full border border-gray-300 rounded p-2"
            disabled={isSelectingSeats}
          />
          {formik.touched.numSeats && formik.errors.numSeats && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.numSeats}
            </p>
          )}
        </div>
        {!isSelectingSeats ? (
          <button
            type="submit"
            disabled={
              !formik.values.name || formik.values.numSeats > remainingSeats
            }
            className={`w-full py-2 rounded ${
              !formik.values.name || formik.values.numSeats > remainingSeats
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            Start Selecting Seats
          </button>
        ) : (
          <button
            type="button"
            onClick={handleConfirm}
            disabled={selectedSeats.length !== formik.values.numSeats}
            className={`w-full py-2 rounded ${
              selectedSeats.length !== formik.values.numSeats
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            Confirm Booking
          </button>
        )}
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
        <div className="overflow-x-auto">
          <table className="table-auto mx-auto">
            <thead>
              <tr>
                <th></th>
                {cols.map((c) => (
                  <th key={c} className="px-2">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row}>
                  <td className="pr-4">{row}</td>
                  {cols.map((c) => {
                    const seat = `${row}${c}`;
                    const isReserved = reservedSeats.includes(seat);
                    const isSelected = selectedSeats.includes(seat);
                    return (
                      <td key={c} className="px-2 py-1">
                        <button
                          disabled={
                            isReserved ||
                            !isSelectingSeats ||
                            (selectedSeats.length >= formik.values.numSeats &&
                              !isSelected)
                          }
                          onClick={() => toggleSeat(seat)}
                          className={`w-8 h-8 rounded transition
                            ${
                              isReserved
                                ? "bg-red-500"
                                : isSelected
                                ? "bg-green-500"
                                : "bg-gray-200"
                            }
                            ${
                              isReserved || !isSelectingSeats
                                ? "cursor-not-allowed"
                                : "cursor-pointer"
                            }`}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl mt-8">
        <h2 className="text-xl font-semibold mb-4">Booking History</h2>
        {bookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Number of Seats</th>
                  <th className="px-4 py-2 text-left">Seats</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2">{booking.name}</td>
                    <td className="px-4 py-2">{booking.numSeats}</td>
                    <td className="px-4 py-2">{booking.seats.join(", ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No booking history</p>
        )}
      </div>
    </div>
  );
}
