import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import TicketService from "../services/api";
import "../styles/login.css";
import loginImg from "../assets/login.png";
import userIcon from "../assets/user.png";

import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    dispatch({ type: "LOGIN_START" });

    TicketService.getUserByEmail(credentials.email)
      .then((data) => {
        const user = data;
        console.log(user);
        TicketService.authenticateUser(credentials.email, credentials.password)
          .then((data) => {
            const token = data.accessToken;
            console.log(token);
            if (token) {
              e;
              dispatch({ type: "LOGIN_SUCCESS", payload: { user, token } });
              if (user.roles && user.roles.includes("ADMIN")) {
                navigate("/admin");
              } else {
                navigate("/");
              }
            } else {
              setError("Invalid password");
            }
          })
          .catch((error) => {
            setError("Invalid password");
          });
      })
      .catch((error) => {
        setError("Invalid email");
      });
  };

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="8" className="m-auto">
              <div className="login_container flex justify-content-between">
                <div className="login_img">
                  <img src={loginImg} alt="login_img" />
                </div>
                <div className="login_form">
                  <div className="user">
                    <img src={userIcon} alt="userIcon" />
                  </div>
                  <h2>Login</h2>
                  <Form onSubmit={handleClick}>
                    <FormGroup>
                      <input
                        type="email"
                        pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                        title="invalid email!"
                        placeholder="Email"
                        required
                        id="email"
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <input
                        type="password"
                        title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
                        placeholder="Password"
                        required
                        id="password"
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <Button className="btn auth_btn" type="submit">
                      Login
                    </Button>
                  </Form>
                  {error && <p className="error-message">{error}</p>}
                  <p>
                    Don't have an account? <Link to="/register">Create</Link>
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

export default Login;
