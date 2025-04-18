export default function BookingHistory({ bookings }) {
  return (
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
  );
}
