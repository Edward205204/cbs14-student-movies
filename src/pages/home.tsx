import React from "react";
import { Link } from "react-router";
import { path } from "../constants/path";

export default function Home() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex items-center gap-12">
        <Link
          to={path.form}
          className="px-10 py-10 min-w-[400px] text-center bg-blue-500 text-white text-6xl hover:opacity-65 rounded-4xl"
        >
          Student
        </Link>
        <Link
          to={path.bookMovieTickets}
          className="px-10 py-10 bg-blue-500 min-w-[400px] text-center text-white text-6xl hover:opacity-65 rounded-4xl"
        >
          Book tickets
        </Link>
      </div>
    </div>
  );
}
