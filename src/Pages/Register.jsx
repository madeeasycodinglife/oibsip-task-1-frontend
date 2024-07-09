import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import TicketService from "../services/api";
import "../styles/login.css";

import registerImg from "../assets/register.png";
import userIcon from "../assets/user.png";

const Register = () => {
  const navigate = useNavigate();
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
    roles: ["USER"], // Initial value for roles
  });

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

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      console.log(credentials);
      // Call the addPassenger function with the form data
      const response = await TicketService.addPassengers(credentials);
      console.log(response);
      navigate("/login");
      // Handle the response as needed
    } catch (error) {
      console.error("Error adding passenger", error);
      // Handle the error
    }
  };

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="8" className="m-auto">
              <div className="login_container flex justify-content-between">
                <div className="login_img">
                  <img src={registerImg} alt="register_img" />
                </div>
                <div className="login_form">
                  <div className="user">
                    <img src={userIcon} alt="useIconr" />
                  </div>
                  <h2>Register</h2>
                  <Form onSubmit={handleClick}>
                    <FormGroup>
                      <input
                        type="text"
                        placeholder="Name"
                        required
                        id="name"
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <Row>
                      <Col>
                        <FormGroup>
                          <input
                            type="text"
                            placeholder="Street"
                            required
                            id="address.street"
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <input
                            type="text"
                            placeholder="City"
                            required
                            id="address.city"
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup>
                          <input
                            type="text"
                            placeholder="State"
                            required
                            id="address.state"
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <input
                            type="text"
                            placeholder="Country"
                            required
                            id="address.country"
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup>
                      <input
                        type="email"
                        placeholder="Email"
                        required
                        id="email"
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <input
                        type="password"
                        placeholder="Password"
                        required
                        id="password"
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <Button className="btn auth_btn" type="submit">
                      Create Account
                    </Button>
                  </Form>
                  <p>
                    Already have an account? <Link to="/login">Login</Link>
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Register;
