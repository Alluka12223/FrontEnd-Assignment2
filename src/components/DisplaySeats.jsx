import { useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/esm/Table";
import { useParams, Link } from "react-router-dom";
import { useStates } from "../utilities/states";
import { generateBookingNumber } from "../utilities/auto-key-lists";

export default function DisplayChairs() {
  const { screeningId } = useParams();
  const s = useStates({
    screening: null,
    movie: null,
    seats: [],
    selectedCount: 0,
    children: 0,
    adults: 0,
    seniors: 0,
    auditoriums: [],
    selectedSeats: [],
    bookingNumber: "",
  });

  useEffect(() => {
    (async () => {
      let screening = (
        await (
          await fetch(`/api/occupied_seats?screeningId=${screeningId}`)
        ).json()
      )[0];

      screening.occupiedSeats = screening.occupiedSeats
        .split(", ")
        .map((x) => +x);
      s.screening = screening;
      s.movie = (
        await (await fetch(`/api/movies?title=${screening.movie}`)).json()
      )[0];

      let auditoriumId =
        ["Stora Salongen", "Lilla Salongen"].indexOf(s.screening.auditorium) +
        1;
      let seats = await (
        await fetch(`/api/seats/?auditoriumId=${auditoriumId}&sort=seatNumber`)
      ).json();
      let rows = [];
      let row;
      let latestRow;

      for (let seat of seats) {
        seat.occupied = screening.occupiedSeats.includes(seat.seatNumber);
        if (latestRow !== seat.rowNumber) {
          row = [];
          rows.push(row);
        }
        row.push(seat);
        latestRow = seat.rowNumber;
      }
      s.seats = rows;
    })();
  }, []);

  function toggleSeatSelection(seat) {
    if (seat.occupied) {
      return;
    }
    if (seat.selected) {
      s.selectedSeats[seat.rowNumber] = s.selectedSeats[seat.rowNumber].filter(
        (se) => se.seatNumber !== seat.seatNumber
      );
      s.selectedCount -= 1;
      if (s.adults !== 0) s.adults -= 1;
      else if (s.seniors !== 0) s.seniors -= 1;
      else s.children -= 1;
    } else {
      if (s.selectedSeats[seat.rowNumber]) {
        s.selectedSeats[seat.rowNumber].push(seat.seatNumber);
      } else {
        s.selectedSeats[seat.rowNumber] = [seat.seatNumber];
      }
      s.adults += 1;
      s.selectedCount += 1;
    }
    seat.selected = !seat.selected;
    console.log(seat.selected);
  }

  return s.seats.length === 0 ? null : (
    <div className="screening-and-seats">
      <h1>{s.screening.movie}</h1>
      <h2>
        {new Intl.DateTimeFormat("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        }).format(new Date(s.screening.screeningTime))}
      </h2>
      <img
        className="poster-screen"
        src={
          "https://cinema-rest.nodehill.se" + s.movie.description.posterImage
        }
      />
      <div className="seats">
        {s.seats.map((row) => (
          <>
            <div className="seats-row">
              {row.map((seat) => (
                <div
                  className={
                    (seat.selected ? "selected" : "") +
                    (seat.occupied ? " occupied" : "")
                  }
                  onClick={() => toggleSeatSelection(seat)}
                >
                  {seat.seatNumber}
                </div>
              ))}
            </div>
            <br />
          </>
        ))}
      </div>
      <Container className="mt-3">
        <div className="ticketTable">
          <Table hover variant="light">
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td>Total</td>
              </tr>
              <tr>
                <th>Adults</th>
                <td className="d-flex flex-row justify-content-end">
                  <span className="mx-1">85 SEK </span>
                  <span className="mx-2">
                    <Button
                      size="sm"
                      style={{ height: "0.8 rem" }}
                      disabled={s.adults === 0}
                      onClick={() => {
                        s.adults -= 1;
                        s.children += 1;
                      }}
                    >
                      -
                    </Button>
                    <span className="px-1"> {s.adults} </span>
                    <Button
                      size="sm"
                      style={{ height: "0.8 rem" }}
                      disabled={s.adults === s.selectedCount}
                      onClick={() => {
                        s.adults += 1;
                        if (s.children) {
                          s.children -= 1;
                        } else {
                          s.seniors -= 1;
                        }
                      }}
                    >
                      +
                    </Button>
                  </span>
                </td>
                <td>
                  <span>{85 * s.adults}</span>
                </td>
              </tr>
              <tr>
                <th>Children</th>
                <td className="d-flex flex-row justify-content-end">
                  <span className="mx-1">65 SEK </span>
                  <span className="mx-2">
                    <Button
                      size="sm"
                      style={{ height: "0.8 rem" }}
                      onClick={() => {
                        s.children -= 1;
                        s.adults += 1;
                      }}
                      disabled={s.children === 0}
                    >
                      -
                    </Button>
                    <span className="px-1"> {s.children} </span>
                    <Button
                      size="sm"
                      style={{ height: "0.8 rem" }}
                      onClick={() => {
                        s.children += 1;
                        if (s.adults) {
                          s.adults -= 1;
                        } else {
                          s.seniors -= 1;
                        }
                      }}
                      disabled={s.children === s.selectedCount}
                    >
                      +
                    </Button>
                  </span>
                </td>
                <td>
                  <span>{65 * s.children}</span>
                </td>
              </tr>
              <tr>
                <th>Seniors</th>
                <td className="d-flex flex-row justify-content-end">
                  <span className="mx-1">75 SEK </span>
                  <span className="mx-2">
                    <Button
                      size="sm"
                      style={{ height: "0.8 rem" }}
                      disabled={s.seniors === 0}
                      onClick={() => {
                        s.seniors -= 1;
                        s.adults += 1;
                      }}
                    >
                      -
                    </Button>
                    <span className="px-1"> {s.seniors} </span>
                    <Button
                      size="sm"
                      style={{ height: "0.8 rem" }}
                      disabled={s.seniors === s.selectedCount}
                      onClick={() => {
                        s.seniors += 1;
                        if (s.adults) {
                          s.adults -= 1;
                        } else {
                          s.children -= 1;
                        }
                      }}
                    >
                      +
                    </Button>
                  </span>
                </td>
                <td>
                  <span>{75 * s.seniors}</span>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <th>{85 * s.adults + 75 * s.seniors + 65 * s.children}</th>
              </tr>
            </tbody>
          </Table>
        </div>
        {85 * s.adults + 75 * s.seniors + 65 * s.children === 0 ? null : (
          <div className="d-flex justify-content-end px-md-4 px-lg-5">
            <Link
              to={`/receipt?no=${generateBookingNumber()}&total=${85 * s.adults + 75 * s.seniors + 65 * s.children
                }&auditorium=${s.screening.auditorium}&movie=${s.screening.movie
                }&seats=${encodeURIComponent(
                  JSON.stringify(s.selectedSeats)
                )}&time=${new Intl.DateTimeFormat("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                }).format(
                  new Date(s.screening.screeningTime)
                )}&type=${encodeURIComponent(
                  JSON.stringify([s.adults, s.seniors, s.children])
                )}`}
              replace
            >
              <Button>Check Out</Button>
            </Link>
          </div>
        )}
      </Container>
    </div>
  );
}
