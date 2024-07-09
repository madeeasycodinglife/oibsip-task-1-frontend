import React, { useState, useEffect } from "react";
import TicketService from "../../services/api";

const ManageTickets = () => {
  const [trainNumbers, setTrainNumbers] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [cancelMsgs, setCancelMsgs] = useState({});

  useEffect(() => {
    // Fetch train numbers
    TicketService.getAllTrains()
      .then((trainData) => {
        const numbers = trainData.map((train) => train.trainNumber);
        setTrainNumbers(numbers);
      })
      .catch((error) => console.error("Error fetching train numbers:", error));
  }, []);

  // Fetch tickets for each train
  const fetchTickets = async () => {
    for (const trainNumber of trainNumbers) {
      try {
        const trainTickets = await TicketService.getAllTickets(trainNumber);
        setTickets((prevTickets) => [
          ...prevTickets.filter((ticket) => ticket.trainNumber !== trainNumber),
          ...trainTickets,
        ]);
      } catch (error) {
        console.error(
          `Error fetching tickets for Train ${trainNumber}:`,
          error
        );
      }
    }
  };
  useEffect(() => {
    if (trainNumbers.length > 0) {
      fetchTickets();
    }
  }, [trainNumbers]);

  const handleCancelTicket = (pnrNumber, trainNumber) => {
    TicketService.cancelTicket(pnrNumber)
      .then((response) => {
        console.log(response);
        setCancelMsgs((prevCancelMsgs) => ({
          ...prevCancelMsgs,
          [pnrNumber]: "Ticket Cancelled",
        }));
      })
      .catch((error) => {
        console.error("Error cancelling Ticket:", error);
        // You can handle the error state or show a user-friendly message here
      });
  };

  return (
    <div className="manage-tickets">
      <h2>Manage Tickets</h2>
      {trainNumbers.map((trainNumber) => (
        <div className="ticket-details" key={trainNumber}>
          {console.log(tickets.length)}
          <h3>Tickets for Train {trainNumber}</h3>
          {tickets.filter((ticket) => ticket.trainNumber === trainNumber)
            .length > 0 ? ( // Check if there are tickets for the current train
            <div
              className="ticket-details-table"
              style={{ overflowX: "auto", maxHeight: "300px", maxWidth: "95%" }}
            >
              <table>
                <thead>
                  <tr>
                    <th>PNR Number</th>
                    <th>Source</th>
                    <th>Destination</th>
                    <th>Passenger</th>
                    <th>Seat</th>
                    <th>Date & Time</th>
                    <th>Ticket Status</th>
                    <th>Cancel Ticket</th>
                  </tr>
                </thead>
                <tbody style={{ overflowY: "auto" }}>
                  {tickets
                    .filter((ticket) => ticket.trainNumber === trainNumber)
                    .map((ticket) => (
                      <tr key={ticket.pnrNumber}>
                        <td>{ticket.pnrNumber}</td>
                        <td>{ticket.source}</td>
                        <td>{ticket.destination}</td>
                        <td>
                          <strong>Id:</strong>{" "}
                          {ticket.passengers[0].passengerId},&nbsp;{" "}
                          <strong>Name:</strong>{" "}
                          {ticket.passengers[0].passengerName},&nbsp;{" "}
                          <strong>Age:</strong> {ticket.passengers[0].age}{" "}
                        </td>
                        <td>
                          <strong>Class:</strong> {ticket.seatClass},&nbsp;{" "}
                          <strong>Coach:</strong> {ticket.coach},&nbsp;{" "}
                          <strong>Seat No:</strong>
                          {ticket.passengers[0].seatNumber}
                        </td>
                        <td>
                          <strong>Date:</strong> {ticket.date},&nbsp; <br />
                          <strong>Arrival Time:</strong> {ticket.arrivalTime}
                          ,&nbsp; <strong>Departure Time:</strong>{" "}
                          {ticket.departureTime},&nbsp;
                        </td>
                        <td
                          style={{
                            color:
                              ticket.statuses == "CONFIRMED" ? "green" : "red",
                          }}
                        >
                          {ticket.statuses}
                        </td>
                        <td>
                          {cancelMsgs[ticket.pnrNumber] ===
                          "Ticket Cancelled" ? (
                            <p
                              className="cancel-msg"
                              onAnimationEnd={() => {
                                setTimeout(() => {
                                  setCancelMsgs((prevCancelMsgs) => ({
                                    ...prevCancelMsgs,
                                    [trainNumber]: null,
                                  }));
                                }, 5000); // 2 seconds timeout
                                fetchTickets(); // Fetch updated tickets after animation ends
                              }}
                            >
                              {cancelMsgs[ticket.pnrNumber]}
                            </p>
                          ) : (
                            <button
                              className="cancel-button"
                              type="button"
                              onClick={() =>
                                handleCancelTicket(
                                  ticket.pnrNumber,
                                  trainNumber
                                )
                              }
                            >
                              Cancel
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No Ticket booking done !!</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ManageTickets;
