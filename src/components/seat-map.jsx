const rows = ["A", "B", "C", "D", "E", "", "F", "G", "H", "J", "K"];
const cols = [1, 2, 3, 4, 5, 0, 6, 7, 8, 9, 10, 11, 12];

export default function SeatMap({
  selectedSeats,
  reservedSeats,
  isSelectingSeats,
  maxSeats,
  onSeatClick,
}) {
  return (
    <table className="table-auto mx-auto">
      <thead>
        <tr>
          <th></th>
          {cols.map((c) =>
            c === 0 ? (
              <th key="col-gap" className="w-8"></th>
            ) : (
              <th key={c} className="px-2">
                {c}
              </th>
            )
          )}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => {
          if (row === "") {
            return <tr key="row-gap" className="h-8"></tr>;
          }
          return (
            <tr key={row}>
              <td className="pr-4">{row}</td>
              {cols.map((c) => {
                if (c === 0)
                  return <td key={`${row}-gap`} className="w-8"></td>;

                const seat = `${row}${c}`;
                const isReserved = reservedSeats.includes(seat);
                const isSelected = selectedSeats.includes(seat);
                return (
                  <td key={`${row}-${c}`} className="px-2 py-1">
                    <button
                      disabled={
                        isReserved ||
                        !isSelectingSeats ||
                        (selectedSeats.length >= maxSeats && !isSelected)
                      }
                      onClick={() => onSeatClick(seat)}
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
          );
        })}
      </tbody>
    </table>
  );
}
