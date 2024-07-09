import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Col, FormGroup, Button, Table } from "reactstrap";
import TicketService from "../services/api";
import cryptoRandomString from "crypto-random-string";

import DatePicker from "react-datepicker"; // Import date picker component
import "react-datepicker/dist/react-datepicker.css"; // Import date picker styles

const Booking = () => {
  const { trainId, type } = useParams();
  const [train, setTrain] = useState([]);
  const [passengers, setPassengers] = useState([]);
  const [passengerList, setPassengerList] = useState([]);
  const [passengerName, setPassengerName] = useState("");
  const [passengerAge, setPassengerAge] = useState("");
  const [numberOfTickets, setNumberOfTickets] = useState("");
  const [selectedDate, setSelectedDate] = useState(null); // State for selected date
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTrain = async () => {
      try {
        console.log("typeof trainid string ", typeof trainId);
        const trainData = await TicketService.getTrainById(trainId);
        console.log("trainData", trainData);
        // Update the state for trains (assuming trainsData is an array)
        setTrain(trainData);
      } catch (error) {
        console.error("Error fetching trains and passengers:", error);
      }
    };
    fetchTrain();
  }, []);
  const handleAddPassenger = () => {
    const newPassenger = {
      passengerName: passengerName,
      age: passengerAge,
    };
    setPassengerList([...passengerList, newPassenger]);
  };

  const handleCreateBooking = () => {
    if (!selectedDate) {
      alert("Please select a date before submitting the form.");
      return;
    }
    console.log("Selected Train:", train);
    console.log("date ", selectedDate);

    // Assuming trainName corresponds to the trainId, you can directly use it
    const selectedTrain = {
      trainId: trainId,
    };

    console.log("Selected Train:", selectedTrain);

    // Assuming passengerList is used instead of selectedPassenger
    if (passengerList.length > 0 && numberOfTickets > 0) {
      // Construct date string manually with prefix '0' for single-digit month and date values
      const month =
        selectedDate.getMonth() + 1 < 10
          ? `0${selectedDate.getMonth() + 1}`
          : selectedDate.getMonth() + 1;
      const day =
        selectedDate.getDate() < 10
          ? `0${selectedDate.getDate()}`
          : selectedDate.getDate();

      const bookingData = {
        seatClass: type,
        trainNumber: train.trainNumber,
        date: `${selectedDate.getFullYear()}-${month}-${day}`,

        passengers: passengerList.map((passenger) => ({
          passengerName: passenger.passengerName,
          age: passenger.age,
        })),
      };

      if (bookingData.passengers.length == numberOfTickets) {
        sessionStorage.setItem("bookingData", JSON.stringify(bookingData));
        navigate(
          `/payment/${trainId}${cryptoRandomString({
            length: 8,
            type: "alphanumeric",
          })}/${bookingData.passengers.length}`
        );
      } else if (bookingData.passengers.length == 0) {
        alert("Select passengers!");
      } else {
        alert("Not enough passengers!!");
      }
    } else {
      console.error("No passengers selected for booking");
      alert("Select passengers!");
    }
  };

  return (
    <div className="booking container ">
      <div className="sectionContainer grid">
        <p>
          Booking for train: {trainId} &nbsp;&nbsp;&nbsp;&nbsp; Class type:{" "}
          {type}
        </p>
        <Form>
          <FormGroup className="ticketsinput">
            <input
              type="number"
              placeholder="Number of Tickets"
              value={numberOfTickets}
              onChange={(e) => setNumberOfTickets(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup className="bookinginput" style={{ marginLeft: "1.2rem" }}>
            <input
              type="text"
              placeholder="Passenger Name"
              value={passengerName}
              onChange={(e) => setPassengerName(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Passenger Age"
              value={passengerAge}
              onChange={(e) => setPassengerAge(e.target.value)}
              required
            />
            <Button type="button" onClick={handleAddPassenger}>
              Add Passenger
            </Button>
          </FormGroup>
          <FormGroup className="dateinput" style={{ marginLeft: "3rem" }}>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              minDate={new Date()} // Allow only current date and future dates
              dateFormat="yyyy-MM-dd" // Set the date format
              placeholderText="Select Date"
              showTimeSelect={false} // Disable time selectio
            />
          </FormGroup>
        </Form>
        {passengerList.length > 0 && (
          <Table className="booking-table">
            <thead>
              <tr>
                <th>Passenger Name</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              {passengerList.map((passenger, index) => (
                <tr key={index}>
                  <td>{passenger.passengerName}</td>
                  <td>{passenger.age}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        <div className="booking-btn">
          <Button type="button" onClick={handleCreateBooking}>
            Create Booking
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Booking;
