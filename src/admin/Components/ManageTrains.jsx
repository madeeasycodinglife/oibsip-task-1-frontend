import React, { useState, useEffect } from "react";
import TicketService from "../../services/api";
import { Form, FormGroup, Button, Table } from "reactstrap";
import "../../main.css";

const ManageTrains = () => {
  const [trains, setTrains] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [selectedCoach, setSelectedCoach] = useState("");
  const [trainName, setTrainName] = useState("");
  const [startingStation, setStartingStation] = useState("");
  const [endingStation, setEndingStation] = useState("");
  const [trainDescription, setTrainDescription] = useState("");
  const [className, setClassName] = useState("");
  const [totalSeats, setTotalSeats] = useState(0);
  const [coachName, setCoachName] = useState("");
  const [coachSeats, setCoachSeats] = useState(0);
  const [stationName, setStationName] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [classes, setClasses] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [selectedClass, setSelectedClass] = useState(""); // If you need to track the selected class
  const [stops, setStops] = useState([]);
  const [selectedClassIndex, setSelectedClassIndex] = useState(null);
  const [displayMsg, setDisplayMsg] = useState("");

  //get All Trains
  useEffect(() => {
    TicketService.getAllTrains()
      .then((data) => {
        console.log(data);
        setTrains(data);
        const newHeaders = data.length > 0 ? Object.keys(data[0]) : [];
        setHeaders(newHeaders);
      })
      .catch((error) => {
        console.error("error", error);
      });
  }, []);
  console.log(trains);

  const filteredTrainDetails = trains.filter((train) => {
    return (
      selectedCoach === "" ||
      train.classes.some(
        (coach) => coach.className.toLowerCase() === selectedCoach.toLowerCase()
      )
    );
  });

  //   Create Trains
  // Update handleAddClass and handleAddCoach accordingly
  const handleAddClass = () => {
    // Add the class to the classes array
    // You can add validation here if needed

    const newClass = {
      className,
      totalSeats,
      coaches: [],
    };

    setClasses([...classes, newClass]);

    // Clear class-related form fields after adding the class
    setClassName("");
    setTotalSeats(0);
    setCoaches([]); // Clear the coaches state when adding a new class
    setSelectedClassIndex(classes.length); // Select the newly added class
  };

  const handleAddCoach = () => {
    // Add the coach to the current class's coaches array
    // You can add validation here if needed

    const updatedClasses = classes.map((trainClass, index) =>
      index === selectedClassIndex
        ? {
            ...trainClass,
            coaches:
              trainClass.coaches.length < 3
                ? [
                    ...trainClass.coaches,
                    { name: coachName, seats: coachSeats },
                  ]
                : trainClass.coaches,
          }
        : trainClass
    );

    setClasses(updatedClasses);
    setCoaches([...coaches, { name: coachName, seats: coachSeats }]); // Update coaches state

    // Clear coach-related form fields after adding the coach
    setCoachName("");
    setCoachSeats(0);
  };

  const handleAddStop = () => {
    // Add the stop to the stops array
    // You can add validation here if needed

    const newStop = {
      stationName,
      arrivalTime,
      departureTime,
    };

    setStops([...stops, newStop]);

    // Clear stop-related form fields after adding the stop
    setStationName("");
    setArrivalTime("");
    setDepartureTime("");
  };

  const handleCreateTrain = async () => {
    // Create the train object based on the form data
    // e.preventDefault();
    const trainData = {
      trainName,
      startingStation,
      endingStation,
      trainDescription,
      classes: classes.map((trainClass) => ({
        className: trainClass.className,
        totalSeats: trainClass.totalSeats,
        coaches: trainClass.coaches.map((coach) => ({
          name: coach.name,
          seats: coach.seats,
        })),
      })),
      stops: stops.map((stop) => ({
        stationName: stop.stationName,
        arrivalTime: stop.arrivalTime,
        departureTime: stop.departureTime,
      })),
    };
    console.log(trainData);
    TicketService.createTrain(trainData)
      .then((response) => {
        setDisplayMsg("Train Created Successfully!!");
        console.log("Train created successfully:", response);
        // Clear form fields after creating the train
        // You may also want to handle navigation or show a success message
        setTrainName("");
        setStartingStation("");
        setEndingStation("");
        setTrainDescription("");
        setClassName("");
        setTotalSeats(0);
        setCoachName("");
        setCoachSeats(0);
        setStationName("");
        setArrivalTime("");
        setDepartureTime("");
      })
      .catch((error) => {
        console.error("Error creating train:", error);
      });
  };

  return (
    <div className="manage-trains">
      <h2>All Trains</h2>
      <table className="train-details-table">
        <thead>
          <tr>
            <th>Train Id</th>
            <th>Train Name</th>
            <th>Train Number</th>
            <th>Starting Station</th>
            <th>Ending Station</th>
          </tr>
        </thead>
        <tbody>
          {trains.map((train) => (
            <tr key={train.trainId}>
              <td>{train.trainId}</td>
              <td>{train.trainName}</td>
              <td>{train.trainNumber}</td>
              <td>{train.startingStation}</td>
              <td>{train.endingStation}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="create-trains">
        <h2>Add Trains</h2>
        {/* <AddTrainForm/> */}
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleCreateTrain();
          }}
        >
          <FormGroup className="train-input">
            <label>
              Train Name:
              <input
                type="text"
                name="trainName"
                value={trainName}
                onChange={(e) => setTrainName(e.target.value)}
              />
            </label>
            <br />
            <label>
              Starting Station:
              <input
                type="text"
                name="startingStation"
                value={startingStation}
                onChange={(e) => setStartingStation(e.target.value)}
              />
            </label>
            <br />
            <label>
              Ending Station:
              <input
                type="text"
                name="endingStation"
                value={endingStation}
                onChange={(e) => setEndingStation(e.target.value)}
              />
            </label>
            <br />
            <label>
              Train Description:
              <input
                type="text"
                name="trainDescription"
                value={trainDescription}
                onChange={(e) => setTrainDescription(e.target.value)}
              />
            </label>
            {/* </div> */}
          </FormGroup>

          <FormGroup className="class-input">
            {/* Classes input fields */}
            <label>
              Class Name:
              <input
                type="text"
                name="className"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
              />
            </label>
            <br />
            <label>
              Total Seats:
              <input
                type="number"
                name="totalSeats"
                value={totalSeats}
                onChange={(e) => setTotalSeats(e.target.value)}
              />
            </label>
            <br />
            <button type="button" onClick={handleAddClass}>
              Add Class
            </button>
          </FormGroup>
          <FormGroup className="coach-input">
            {/* Coaches input fields */}
            {/* <div key={coachIndex}> */}
            <label>
              Coach Name:
              <input
                type="text"
                name="name"
                value={coachName}
                onChange={(e) => setCoachName(e.target.value)}
              />
            </label>
            <br />
            <label>
              Seats:
              <input
                type="number"
                name="seats"
                value={coachSeats}
                onChange={(e) => setCoachSeats(e.target.value)}
              />
            </label>
            {/* </div> */}
            <br />
            <button type="button" onClick={() => handleAddCoach()}>
              Add Coach
            </button>
          </FormGroup>
          <FormGroup className="stop-input">
            {/* Stops input fields */}
            <label>
              Station Name:
              <input
                type="text"
                name="stationName"
                value={stationName}
                onChange={(e) => setStationName(e.target.value)}
              />
            </label>
            <br />
            <label>
              Arrival Time:
              <input
                type="text"
                name="arrivalTime"
                value={arrivalTime}
                onChange={(e) => setArrivalTime(e.target.value)}
              />
            </label>
            <br />
            <label>
              Departure Time:
              <input
                type="text"
                name="departureTime"
                value={departureTime}
                onChange={(e) => setDepartureTime(e.target.value)}
              />
            </label>
            <button type="button" onClick={handleAddStop}>
              Add Stop
            </button>
          </FormGroup>
          {classes.length > 0 && (
            <>
              <h3>Classes and Coaches</h3>
              <table className="dynamic-table">
                <thead>
                  <tr>
                    <th>Class Name</th>
                    <th>Total Seats</th>
                    {/* <th>Coach Name</th>
                <th>Seats</th> */}
                  </tr>
                </thead>
                <tbody>
                  {classes.map((trainClass, index) => (
                    <React.Fragment key={index}>
                      <tr>
                        <td>{trainClass.className}</td>
                        <td>{trainClass.totalSeats}</td>
                        {/* <td colSpan="2"></td> Placeholder for coach cells */}
                      </tr>
                      {/* {selectedClassIndex === index && // Only render coaches if this class is selected
                    trainClass.coaches.map((coach, coachIndex) => (
                      <tr key={`${index}-${coachIndex}`}>
                        <td></td> 
                        <td></td> 
                        <td>{coach.name}</td>
                        <td>{coach.seats}</td>
                      </tr>
                    ))} */}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>

              <table className="dynamic-table">
                <thead>
                  <tr>
                    <th>Class Name</th>
                    {/* <th>Total Seats</th> */}
                    <th>Coach Name</th>
                    <th>Seats</th>
                  </tr>
                </thead>
                <tbody>
                  {classes.map((trainClass, index) => (
                    <React.Fragment key={index}>
                      {/* <tr> */}
                      {/* <td>{trainClass.className}</td> */}
                      {/* <td>{trainClass.totalSeats}</td> */}
                      {/* <td colSpan="2"></td> Placeholder for coach cells */}
                      {/* </tr> */}
                      {selectedClassIndex === index && // Only render coaches if this class is selected
                        trainClass.coaches.map((coach, coachIndex) => (
                          <tr key={`${index}-${coachIndex}`}>
                            <td>{trainClass.className}</td>{" "}
                            {/* Placeholder for class cell */}
                            {/* <td></td> Placeholder for total seats cell */}
                            <td>{coach.name}</td>
                            <td>{coach.seats}</td>
                          </tr>
                        ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </>
          )}
          {stops.length > 0 && (
            <>
              {/* Dynamic Table for Stops */}
              <h3>Stops</h3>
              <table className="dynamic-table">
                <thead>
                  <tr>
                    <th>Station Name</th>
                    <th>Arrival Time</th>
                    <th>Departure Time</th>
                  </tr>
                </thead>
                <tbody>
                  {stops.map((stop, index) => (
                    <tr key={index}>
                      <td>{stop.stationName}</td>
                      <td>{stop.arrivalTime}</td>
                      <td>{stop.departureTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
          <div className="submit-btn">
            <button
              className="btn"
              type="submit"
              //   onSubmit={(e) => {
              //     // e.preventDefault();
              //     handleCreateTrain();
              //   }}
            >
              Add Train
            </button>
          </div>
          <div className="display-msg">{displayMsg}</div>
        </Form>
      </div>
    </div>
  );
};

export default ManageTrains;
