import React from "react";

import Logo from "../../assets/logoo.png";

import { TiSocialFacebook } from "react-icons/ti";
import { AiOutlineTwitter } from "react-icons/ai";
import { AiFillYoutube } from "react-icons/ai";
import { FaPinterestP } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer">
      <div className="sectionContainer container grid">
        <div className="gridOne">
          <div className="logoDiv">
            <img src={Logo} className="Logo" />
          </div>
          <p>Thank you for travelling!</p>
          <div className="socialIcon flex">
            <TiSocialFacebook className="icon" />
            <AiOutlineTwitter className="icon" />
            <AiFillYoutube className="icon" />
            <FaPinterestP className="icon" />
          </div>
        </div>
        <div className="footerlinks">
          <span className="linkTitle">Information</span>
          <li>
            <a href="/#home">Home</a>
          </li>
          <li>
            <a href="">Explore</a>
          </li>
          <li>
            <a href="">Train Status</a>
          </li>
          <li>
            <a href="">Travel</a>
          </li>
          <li>
            <a href="">Manage Booking</a>
          </li>
        </div>
        <div className="footerlinks">
          <span className="linkTitle">Quick Guide</span>
          <li>
            <a href="">FAQ</a>
          </li>
          <li>
            <a href="">How to</a>
          </li>
          <li>
            <a href="">Features</a>
          </li>
          <li>
            <a href="">Routes</a>
          </li>
          <li>
            <a href="">Our Communities</a>
          </li>
        </div>
        <div className="footerlinks">
          <span className="linkTitle">Information</span>
          <li>
            <a href="#">Our Partners</a>
          </li>
          <li>
            <a href="#">Destinations</a>
          </li>
          <li>
            <a href="#">Carrers</a>
          </li>
          <li>
            <a href="#">Rules & Regulations</a>
          </li>
        </div>
      </div>

      <div className="copyRightDiv flex">
        <p>
          Courtesy Design | Developed by{" "}
          <a href="https://emailto-myselfrohitdey@gmail.com" target="_blank">
            Rohit Dey
          </a>
        </p>
      </div>
    </div>
  );
};
export default Footer;
