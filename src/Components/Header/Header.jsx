import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { SiConsul } from "react-icons/si";
import { BsPhoneVibrate } from "react-icons/bs";
import { AiOutlineGlobal } from "react-icons/ai";
import { CgMenuGridO } from "react-icons/cg";
import logo from "../../assets/logoo.png";
import { useContext } from "react"; // for auth
import { AuthContext } from "../../context/AuthContext"; //for auth

import TicketService from "../../services/api";

const navLinks = [
  {
    id: "home",
    title: "Home",
  },
  {
    id: "search",
    title: "Search",
  },
];

const Header = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext); // for Auth
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  }; //for auth

  const [act, setAct] = useState("");
  //remove Navabar in small screnn ==>
  const [active, setActive] = useState("navBarMenu");
  // const showNavBar = ()=>{
  //   setActive('navBarMenu showNavBar')
  // }
  const removeNavBar = () => {
    setActive("navBarMenu");
  };
  const toggleNavBar = () => {
    setActive((prevActive) =>
      prevActive === "navBarMenu" ? "navBarMenu showNavBar" : "navBarMenu"
    );
  };

  //add a backround to second navbar
  const [noBg, addBg] = useState("navBarTwo");
  const addBgColor = () => {
    if (window.scrollY >= 10) {
      addBg("navBarTwo navbar_With_Bg");
    } else {
      addBg("navBarTwo");
    }
  };
  window.addEventListener("scroll", addBgColor);

  //
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [showProfilePopup, setShowProfilePopup] = useState(false);

  const toggleProfilePopup = () => {
    setShowProfilePopup(!showProfilePopup);
  };

  const deletePassenger = () => {
    TicketService.deletePassengerByPassengerId(user.passengerID) // Directly pass passengerId as a number
      .then((response) => {
        // Handle the response as needed
        console.log("Passenger deleted successfully:", response);
        // Add any additional logic or state updates here
        logout();
      })
      .catch((error) => {
        // Handle errors
        console.error("Error deleting passenger:", error);
      });
  };

  return (
    <div className="navBar flex">
      <div className="navBarOne flex">
        <div>
          <SiConsul />
        </div>
        <div className="none flex">
          <li className="flex">
            <BsPhoneVibrate className="icon" />
            Support
          </li>
          <li className="flex">
            <AiOutlineGlobal className="icon" />
            Languages
          </li>
        </div>
        {user ? (
          <>
            <div className="atb flex">
              <span className="user" onClick={toggleProfilePopup}>
                {user.name}
              </span>
              {showProfilePopup && (
                <div className="profile-popup">
                  {/* Your profile details go here */}
                  <div>
                    <b>{user.roles}</b>
                  </div>
                  <div>Username: {user.name}</div>
                  <div>Email: {user.email}</div>
                  <button className="btn" onClick={logout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="atb flex">
            <span>
              <Link to="/login">Log In</Link>
            </span>
            <span>
              <Link to="/Register">Register</Link>
            </span>
          </div>
        )}
      </div>

      <div className={noBg}>
        <div className="logoDiv">
          <img src={logo} alt="logo.png" className="Logo"></img>
        </div>
        <div className={active}>
          <ul className="menu flex ">
            {navLinks.map((Links) => (
              <li
                key={Links.id}
                className={`listItem ${
                  act === Links.title ? "active" : "inactive"
                }`}
                onClick={() => {
                  removeNavBar();
                  setAct(Links.title);
                  scrollToSection(Links.id);
                }}
              >
                <Link to={`/#${Links.id}`}>{Links.title}</Link>
              </li>
            ))}
            <li className="listItem">
              <Link to="/trains">Trains</Link>
            </li>
            <li className="listItem">
              <Link to="/pnr">PNR</Link>
            </li>
            {user && user.roles.includes("ADMIN") && (
              <li className="listItem">
                <Link to="/admin/dashboard">Dashboard</Link>
              </li>
            )}
          </ul>
          <button onClick={removeNavBar} className="btn flex btnOne">
            <a href="mailto:pabitrabera2001@gmail.com" target="_blank">
              mail
            </a>
          </button>
          <button className="btn flex btnOne">
            <a href="tel:+8101187317" target="_blank">
              Call
            </a>
          </button>
        </div>
        <div className="contactButtons flex">
          <button className="btn flex btnTwo">
            <a href="mailto:pabitrabera2001@gmail.com" target="_blank">
              Mail
            </a>
          </button>
          <button className="btn flex btnTwo">
            <a href="tel:+8101187317" target="_blank">
              Call
            </a>
          </button>
        </div>
        <div onClick={toggleNavBar} className="toggleIcon">
          <CgMenuGridO className="icon" />
        </div>
      </div>
    </div>
  );
};

export default Header;
