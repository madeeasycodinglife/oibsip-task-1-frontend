import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Train = ({ trains, headers, type, requiredSeats }) => {
  const navigate = useNavigate();
  const onBookTicket = (selectedTrain) => {
    // Implement your booking logic here
    console.log(`Booking ticket for train: ${selectedTrain.trainName}`);
    if (type == "AC" || type == "Sleeper" || type == "General")
      navigate(`/booking/${selectedTrain.trainId}/${type}`);
    else alert("Please Select the class type!!");
    // You can also navigate to a booking page or perform other actions
  };

  const calculateRemainingSeats = (coaches, selectedClass) => {
    if (!selectedClass) {
      // If no class is selected, calculate the total remaining seats
      return coaches.reduce((total, coach) => total + coach.availableSeats, 0);
    }

    // If a class is selected, filter coaches based on the selected class
    const selectedCoaches = coaches
      .filter((coach) => {
        switch (selectedClass) {
          case "AC":
            return coach.name.startsWith("AC");
          case "General":
            return coach.name.startsWith("D") || coach.name.startsWith("G");
          case "Sleeper":
            return coach.name.startsWith("S");
          default:
            return false; // Handle unexpected selectedClass values
        }
      })
      .map((coach) => {
        return coach.availableSeats;
      });

    // Calculate the remaining seats for the selected class
    return selectedCoaches.reduce(
      (total, availableSeats) => total + availableSeats,
      0
    );
  };

  const renderClassesAndSeats = (classes) => {
    return (
      <table>
        <tbody>
          {classes.map((classItem) => (
            <React.Fragment key={classItem.classId}>
              <tr>
                <th colSpan="3">{classItem.className}</th>
              </tr>
              {classItem.coaches.map((coach) => (
                <tr key={coach.coachId}>
                  <td>{coach.name}</td>
                  <td>Total Seats: {coach.seats}</td>
                  <td>Available Seats: {coach.availableSeats}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    );
  };

  const renderSelectedClass = (selectedClass) => {
    return (
      <table>
        <tbody>
          <tr>
            <th colSpan="3">{selectedClass.className}</th>
          </tr>
          {selectedClass.coaches.map((coach) => (
            <tr key={coach.coachId}>
              <td>{coach.name}</td>
              <td>Total Seats: {coach.seats}</td>
              <td>Available Seats: {coach.availableSeats}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      {trains.length > 0 ? (
        <table className="details-table">
          <thead>
            <tr>
              <th>Train Name</th>
              <th>Train Number</th>
              <th>Starting Station</th>
              <th>Ending Station</th>
              <th>Classes</th>
              <th>Remaining Seats</th>
              <th>Book Ticket</th>
            </tr>
          </thead>
          <tbody>
            {trains
              .filter(
                (train) =>
                  !type ||
                  (train.classes.some((cls) => cls.className === type) &&
                    (!requiredSeats ||
                      calculateRemainingSeats(
                        train.classes.flatMap((cls) => cls.coaches),
                        type
                      ) >= parseInt(requiredSeats, 10)))
              )
              .map((train) => (
                <tr key={train.trainId}>
                  <td>{train.trainName}</td>
                  <td>{train.trainNumber}</td>
                  <td>{train.startingStation}</td>
                  <td>{train.endingStation}</td>
                  <td>
                    {type
                      ? renderSelectedClass(
                          train.classes.find((cls) => cls.className === type)
                        )
                      : renderClassesAndSeats(train.classes)}
                  </td>
                  <td>
                    {calculateRemainingSeats(
                      train.classes.flatMap((cls) => cls.coaches),
                      type
                    )}
                  </td>
                  <td>
                    <button
                      className="bookbtn"
                      type="button"
                      onClick={() => onBookTicket(train)}
                    >
                      Book Ticket
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <p>No train details available.</p>
      )}
    </div>
  );
};

export default Train;
