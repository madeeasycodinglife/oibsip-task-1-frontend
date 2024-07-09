import React, { useState, useEffect } from "react";
import TicketService from "../../services/api";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";

const ManageUsers = () => {
  const availableRoles = ["USER", "ADMIN"];
  const [users, setUsers] = useState([]);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
    },
    roles: [],
  });

  useEffect(() => {
    TicketService.getAllUsers()
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id.includes(".")) {
      // Handle nested properties
      const [parent, child] = id.split(".");
      setCredentials((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setCredentials((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handleRoleChange = (selectedRoles) => {
    setCredentials((prev) => ({
      ...prev,
      roles: selectedRoles,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      console.log(credentials);
      // Call the addPassenger function with the form data
      const response = await TicketService.addPassengers(credentials);
      console.log(response);
      setCredentials({
        name: "",
        email: "",
        password: "",
        address: {
          street: "",
          city: "",
          state: "",
          country: "",
        },
        roles: [],
      });
      // Fetch updated user list after creating the account
      TicketService.getAllUsers()
        .then((data) => {
          setUsers(data);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });

      // Provide feedback to the user, e.g., display a success message
      alert("Account created successfully!");
    } catch (error) {
      console.error("Error adding passenger", error);
      // Handle the error
    }
  };

  return (
    <div className="manage-users">
      <h2>All Users</h2>
      <table className="user-details-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Roles</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 &&
            users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.address &&
                    `${user.address.street}, ${user.address.city}, ${user.address.state}, ${user.address.country}`}
                </td>
                <td>{user.roles.join(", ")}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <h2>Create User or ADMIN</h2>
      <Form className="user-input" onSubmit={handleClick}>
        <FormGroup className="form-group">
          <input
            type="text"
            placeholder="Name"
            required
            id="name"
            value={credentials.name}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Street"
            required
            id="address.street"
            value={credentials.address.street}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="City"
            required
            id="address.city"
            value={credentials.address.city}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="State"
            required
            id="address.state"
            value={credentials.address.state}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Country"
            required
            id="address.country"
            value={credentials.address.country}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup className="form-group">
          <input
            type="email"
            placeholder="Email"
            required
            id="email"
            value={credentials.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            required
            id="password"
            value={credentials.password}
            onChange={handleChange}
          />
          <select
            multiple
            value={credentials.roles}
            onChange={(e) =>
              handleRoleChange(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
          >
            {availableRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          <button className="btn auth_btn" type="submit">
            Create Account
          </button>
        </FormGroup>
      </Form>
    </div>
  );
};

export default ManageUsers;
