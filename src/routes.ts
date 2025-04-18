import { createBrowserRouter } from "react-router";
import { path } from "./constants/path";
import Form from "./pages/form.jsx";
import Home from "./pages/home.jsx";
import MoviesBooking from "./pages/movies-booking-tickets.jsx";

export const router = createBrowserRouter([
  {
    path: "",
    Component: Home,
  },
  {
    path: path.form,
    Component: Form,
  },
  {
    path: path.bookMovieTickets,
    Component: MoviesBooking,
  },
]);
