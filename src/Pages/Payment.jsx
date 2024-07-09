import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import QRCode from "qrcode.react";
import cryptoRandomString from "crypto-random-string";
import TicketService from "../services/api";
import CopyToClipboard from "react-copy-to-clipboard";
import '../styles/payment.css';

const CopyNotification = ({ content, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000); // Close after 2 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return <div className="copy-notification">{content}</div>;
};

const Payment = () => {
  const { bookingId, seats } = useParams();
  const [passengers, setPassengers] = useState([]);
  const [amount, setAmount] = useState(0);
  const [transactionId, setTransactionId] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [pnrNumbers, setPnrNumbers] = useState([]);
  const [showCopyNotification, setShowCopyNotification] = useState(false);
  const [copiedPNR, setCopiedPNR] = useState("");

  // Retrieve bookingData from sessionStorage
  const bookingData = JSON.parse(sessionStorage.getItem('bookingData')) || {};  

  // Generate a random 16-digit alphanumeric transaction ID
  useEffect(() => {
    setTransactionId(generateRandomTransactionId(16));
  }, []);

  useEffect(() => {
    // Calculate amount based on the number of seats and seatClass
    let seatMultiplier = 0;
    switch (bookingData.seatClass) {
      case "AC":
        seatMultiplier = 100;
        break;
      case "Sleeper":
        seatMultiplier = 50;
        break;
      case "General":
        seatMultiplier = 20;
        break;
      default:
        seatMultiplier = 0;
    }
    setAmount(seats * seatMultiplier);
  }, [seats, bookingData.seatClass]);

  const generateRandomTransactionId = (length) => {
    return cryptoRandomString({ length, type: "alphanumeric" });
  };

  const generateQRCode = () => {
    // Generate a mock UPI URL with the booking ID, amount, and seats
    const upiUrl = `upi://pay?pa=myselfrohitdey@okicici&pn=Merchant&mc=123456&tid=${transactionId}&tr=${bookingId}&tn=Booking&am=${amount}&cu=INR&url=https://example.com&seats=${seats}`;

    return upiUrl;
  };

  const handlePayment = () => {
    // Simulate payment processing
    // setPaymentStatus("success"); // For simplicity, always mark as success
    // Call TicketService.bookTicket with the data from sessionStorage
    console.log('bookingData',bookingData);
    TicketService.bookTicket(seats, bookingData)
      .then((response) => {
        console.log("Train booked successfully:", response);
        // Clear sessionStorage after booking is successful
        sessionStorage.removeItem('bookingData');
        setPaymentStatus("success");
        setPnrNumbers(response);
      })
      .catch((error) => {
        console.error("Error booking train:", error);
      });
  };

  const handleCopyToClipboard = (pnrNumber) => {
    setCopiedPNR(pnrNumber);
    setShowCopyNotification(true);
  };

  const closeCopyNotification = () => {
    setShowCopyNotification(false);
  };

  return (
    <div className="payment-container">
      
        {paymentStatus !== "success" && (
          <>
          <h2 className="payment-heading">Payment for Booking ID: {bookingId}</h2>
      <QRCode value={generateQRCode()} className="qr-code" />
      {/* <div className="payment-details"> */}
        <p>
          <strong>Transaction ID:</strong> {transactionId}
        </p>
        
        <p>
          <strong>Number of Seats:</strong> {seats}
        </p>
        <p>
          <strong>Total Amount (INR):</strong> {amount}
        </p>
        <button type="button" onClick={handlePayment} className="payment-button">
          Process Payment
        </button>
        </>
      )}
        {paymentStatus === "success" && (
          <>
            <h2 className="payment-heading">Payment Successful !!</h2>
            <p className="payment-success">Payment successful! Thank you for booking.</p>
            <div className="pnr-list">
              <p><strong>PNR Numbers:</strong></p>
              {pnrNumbers.map((pnr) => (
                <div key={pnr.pnrNumber} className="pnr-item">
                  {pnr.pnrNumber}
                  <CopyToClipboard text={pnr.pnrNumber} onCopy={() => handleCopyToClipboard(pnr.pnrNumber)}>
                    <button className="copy-button">
                      Copy
                    </button>
                  </CopyToClipboard>
                </div>
              ))}
              {showCopyNotification && (
                <>
                <p><CopyNotification
                  content={`PNR ${copiedPNR} copied to clipboard`}
                  onClose={closeCopyNotification}
                /></p>
                </>
              )}
            </div>
          </>
        )}
      </div>
      
    // </div>
  );
};

export default Payment;
