import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

const getToken = () => {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      resolve(token);
    } else {
      const checkTokenInterval = setInterval(() => {
        const newToken = localStorage.getItem("token");
        if (newToken !== null) {
          clearInterval(checkTokenInterval);
          resolve(newToken);
        }
      }, 1000); // Check every second for the token
    }
  });
};

const TicketService = {
  authenticateUser: (email, password) => {
    return axios
      .post(
        `${API_BASE_URL}/auth-service/authenticate/${encodeURIComponent(
          email
        )}/${encodeURIComponent(password)}`
      )
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error authenticating user:", error);
        throw error;
      });
  },
  addPassengers: (passengerData) => {
    return axios
      .post(`${API_BASE_URL}/user-service/create-user`, passengerData)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error adding/updating passengers:", error);
        throw error;
      });
  },

  getUserByEmail: (email) => {
    return axios
      .get(
        `${API_BASE_URL}/user-service/get-user-by-email/${encodeURIComponent(
          email
        )}`
      )
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching user by email:", error);
        throw error;
      });
  },
  getAllTrains: () => {
    return getToken().then((token) => {
      const config = {
        headers: {
          Authorization: token ? `Bearer ${token}` : null,
        },
      };

      console.log("getAllTrains token", config);
      return axios
        .get(`${API_BASE_URL}/train-service/get-all-trains`, config)
        .then((response) => response.data)
        .catch((error) => {
          console.error("Error fetching trains:", error);
          throw error;
        });
    });
  },
  getTrainBetweenStations: (start, end) => {
    return axios
      .get(
        `${API_BASE_URL}/train-service/trains/${encodeURIComponent(
          start
        )}/${encodeURIComponent(end)}`
      )
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error getting train between stations:", error);
        throw error;
      });
  },
  getTrainById: (id) => {
    return getToken().then((token) => {
      const config = {
        headers: {
          Authorization: token ? `Bearer ${token}` : null,
        },
      };

      console.log("getTrainById token", config);
      return axios
        .get(`${API_BASE_URL}/train-service/${id}`, config)
        .then((response) => response.data)
        .catch((error) => {
          console.error("Error getting train by id:", error);
          throw error;
        });
    });
  },
  bookTicket: (tickets, bookingData) => {
    return getToken().then((token) => {
      const config = {
        headers: {
          Authorization: token ? `Bearer ${token}` : null,
        },
      };

      return axios
        .post(
          `${API_BASE_URL}/ticket-service/book/tickets/${encodeURIComponent(
            tickets
          )}`,
          bookingData,
          config
        )
        .then((response) => response.data)
        .catch((error) => {
          console.error("Error booking ticket:", error);
          throw error;
        });
    });
  },
  getStatus: (pnr) => {
    return getToken().then((token) => {
      const config = {
        headers: {
          Authorization: token ? `Bearer ${token}` : null,
        },
      };

      return axios
        .get(
          `${API_BASE_URL}/ticket-service/check-tickets-status/by/pnr-number/${encodeURIComponent(
            pnr
          )}`,
          config
        )
        .then((response) => response.data)
        .catch((error) => {
          console.error("Error getting ticket status:", error);
          throw error;
        });
    });
  },
  cancelTicket: (pnr) => {
    return getToken().then((token) => {
      const config = {
        headers: {
          Authorization: token ? `Bearer ${token}` : null,
        },
      };

      return axios
        .delete(
          `${API_BASE_URL}/ticket-service/cancel/tickets/${encodeURIComponent(
            pnr
          )}`,
          config
        )
        .then((response) => response.data)
        .catch((error) => {
          console.error("Error canceling ticket:", error);
          throw error;
        });
    });
  },

  // Other methods...

  //ADMIN
  createTrain: (train) => {
    return getToken().then((token) => {
      const config = {
        headers: {
          Authorization: token ? `Bearer ${token}` : null,
        },
      };

      return axios
        .post(`${API_BASE_URL}/train-service/create`, train, config)
        .then((response) => response.data)
        .catch((error) => {
          console.error("Error creating train:", error);
          throw error;
        });
    });
  },
  getAllUsers: () => {
    return getToken().then((token) => {
      const config = {
        headers: {
          Authorization: token ? `Bearer ${token}` : null,
        },
      };

      return axios
        .get(`${API_BASE_URL}/user-service/get-all-users`, config)
        .then((response) => response.data)
        .catch((error) => {
          console.error("Error getting all users:", error);
          throw error;
        });
    });
  },
  getAllTickets: (trainNumber) => {
    return getToken().then((token) => {
      const config = {
        headers: {
          Authorization: token ? `Bearer ${token}` : null,
        },
      };

      return axios
        .get(
          `${API_BASE_URL}/ticket-service/get-all/by/train-number/${encodeURIComponent(
            trainNumber
          )}`,
          config
        )
        .then((response) => response.data)
        .catch((error) => {
          console.error("Error getting all tickets:", error);
          throw error;
        });
    });
  },
  getTrainBookings: () => {
    return getToken().then((token) => {
      const config = {
        headers: {
          Authorization: token ? `Bearer ${token}` : null,
        },
      };

      return axios
        .get(`${API_BASE_URL}/GetTrainBookings`, config)
        .then((response) => response.data)
        .catch((error) => {
          console.error("Error getting train bookings:", error);
          throw error;
        });
    });
  },
  getAllTrainsBookingsPassengerList: () => {
    return getToken().then((token) => {
      const config = {
        headers: {
          Authorization: token ? `Bearer ${token}` : null,
        },
      };

      return axios
        .get(`${API_BASE_URL}/GetAllTrainsBookingsPassengerList`, config)
        .then((response) => response.data)
        .catch((error) => {
          console.error(
            "Error getting all trains bookings passenger list:",
            error
          );
          throw error;
        });
    });
  },
  getTrainBookingPassengerListByTrainId: (trainId) => {
    return getToken().then((token) => {
      const config = {
        headers: {
          Authorization: token ? `Bearer ${token}` : null,
        },
      };

      return axios
        .get(
          `${API_BASE_URL}/GetTrainBookingPassengerListByTrainId?trainId=${trainId}`,
          config
        )
        .then((response) => response.data)
        .catch((error) => {
          console.error(
            "Error getting train booking passenger list by train id:",
            error
          );
          throw error;
        });
    });
  },
  getBookingByPassengerId: (passengerId) => {
    return getToken().then((token) => {
      const config = {
        headers: {
          Authorization: token ? `Bearer ${token}` : null,
        },
      };

      return axios
        .get(
          `${API_BASE_URL}/GetBookingByPassengerId?passengerId=${passengerId}`,
          config
        )
        .then((response) => response.data)
        .catch((error) => {
          console.error("Error getting booking by passenger id:", error);
          throw error;
        });
    });
  },
  bookTrain: (bookingData) => {
    return getToken().then((token) => {
      const config = {
        headers: {
          Authorization: token ? `Bearer ${token}` : null,
        },
      };

      return axios
        .post(`${API_BASE_URL}/BookTrain`, bookingData, config)
        .then((response) => response.data)
        .catch((error) => {
          console.error("Error booking train:", error);
          throw error;
        });
    });
  },
  cancelBookingByBookingId: (bookingId) => {
    return getToken().then((token) => {
      const config = {
        headers: {
          Authorization: token ? `Bearer ${token}` : null,
        },
      };

      return axios
        .delete(
          `${API_BASE_URL}/CancelBookingByBookingId?bookingId=${bookingId}`,
          config
        )
        .then((response) => response.data)
        .catch((error) => {
          console.error("Error canceling booking by booking id:", error);
          throw error;
        });
    });
  },
};

export default TicketService;
