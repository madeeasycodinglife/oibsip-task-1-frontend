import React, { useState, useEffect } from "react";
import TicketService from "../services/api";
import Train from "../Components/Train/Train";

const Trains = () => {
  const [trains, setTrains] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [selectedCoach, setSelectedCoach] = useState("");

  useEffect(() => {
    TicketService.getAllTrains()
      .then((data) => {
        // console.log(data);
        setTrains(data);
        const newHeaders = data.length > 0 ? Object.keys(data[0]) : [];
        setHeaders(newHeaders);
      })
      .catch((error) => {
        // console.error(error);
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

  return (
    <>
      <div className="trains">
        <div className="trainsmaintext">
          <h1>All Trains</h1>
        </div>
        <div className="btns flex">
          <div
            className={`singleBtn ${selectedCoach === "AC" ? "active" : ""}`}
            onClick={() => setSelectedCoach("AC")}
          >
            <span>AC Coach</span>
          </div>
          <div
            className={`singleBtn ${
              selectedCoach === "General" ? "active" : ""
            }`}
            onClick={() => setSelectedCoach("General")}
          >
            <span>General Coach</span>
          </div>
          <div
            className={`singleBtn ${
              selectedCoach === "Sleeper" ? "active" : ""
            }`}
            onClick={() => setSelectedCoach("Sleeper")}
          >
            <span>Sleeper Coach</span>
          </div>
        </div>
        <Train
          trains={filteredTrainDetails}
          headers={headers}
          type={selectedCoach}
        />
      </div>
    </>
  );
};

export default Trains;
