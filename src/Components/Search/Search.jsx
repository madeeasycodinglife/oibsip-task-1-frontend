import React from "react";
import { useState, useEffect } from "react";

import { HiOutlineLocationMarker } from "react-icons/hi";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { MdOutlineDateRange } from "react-icons/md";
import { SectionWrapper } from "../../hoc";
import Train from "../Train/Train";
import TicketService from "../../services/api";

const Search = () => {
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");
  const [selectedCoach, setSelectedCoach] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [requiredSeats, setRequiredSeats] = useState("");

  const [trains, setTrains] = useState([]);
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    if (searchFrom && searchTo) {
      console.log(searchFrom);
      console.log(searchTo);
      TicketService.getTrainBetweenStations(
        searchFrom.toLowerCase(),
        searchTo.toLowerCase()
      )
        .then((data) => {
          console.log(data); //check
          setTrains(data);
          const newHeaders = data.length > 0 ? Object.keys(data[0]) : [];
          setHeaders(newHeaders);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [searchFrom, searchTo]);

  const filteredTrainDetails = trains.filter((train) => {
    return (
      selectedCoach === "" ||
      train.classes.some(
        (coach) => coach.className.toLowerCase() === selectedCoach.toLowerCase()
      )
    );
  });

  return (
    <div className="search container section">
      <div className="sectionContainer grid">
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

        <div className="searchInputs flex">
          {/* Single Input */}
          <div className="singleInput flex">
            <div className="iconDiv">
              <HiOutlineLocationMarker className="icon" />
            </div>
            <div className="texts">
              <h4>From</h4>
              <input
                type="text"
                placeholder="Where from? "
                value={searchFrom}
                onChange={(e) => setSearchFrom(e.target.value)}
              />
            </div>
          </div>
          {/* Single Input */}
          <div className="singleInput flex">
            <div className="iconDiv">
              <RiAccountPinCircleLine className="icon" />
            </div>
            <div className="texts">
              <h4>Destination</h4>
              <input
                type="text"
                placeholder="Where do you want to go?"
                value={searchTo}
                onChange={(e) => setSearchTo(e.target.value)}
              />
            </div>
          </div>
          {/* Travelers */}
          <div className="singleInput flex">
            <div className="iconDiv">
              <MdOutlineDateRange className="icon" />
            </div>
            <div className="texts">
              <h4>Passengers</h4>
              <input
                type="text"
                placeholder="Add passengers"
                value={requiredSeats}
                onChange={(e) => setRequiredSeats(e.target.value)}
              />
            </div>
          </div>
        </div>
        {searchFrom || searchTo ? (
          <Train
            trains={filteredTrainDetails}
            headers={headers}
            type={selectedCoach}
            requiredSeats={requiredSeats}
          />
        ) : null}
      </div>
    </div>
  );
};

export default SectionWrapper(Search, "search");
// export default Search
