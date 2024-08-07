// ThankYou.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { clearAccessToken } from "../components/Global";

const ThankYou = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { staffMemberNames, drinkChoice } = location.state || {};
  const [drink, setDrink] = useState("none");

  useEffect(() => {
    const fetchDrinkData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/get/drink/${drinkChoice}`
        );
        console.log(response);
        setDrink(response?.data?.data?.Name || "None");
      } catch (error) {
        console.error("Error fetching drink data:", error);
        setDrink("None");
      }
    };

    fetchDrinkData();

    const timer = setTimeout(() => {
      // const response = await axios.get(
      //     `${process.env.REACT_APP_API_URL_COFFEE}/api/logout`
      //   );
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate, drinkChoice]);

  return (
    <div className="visitor-container">
      <div
        className="form-container"
        style={{ backgroundColor: "rgb(227, 243, 249)" }}
      >
        <h2 className="text-center">Thank You!</h2>
        <p>
          Visiting: {staffMemberNames ? staffMemberNames.join(", ") : "Unknown"}
        </p>
        <p>Selected Drink: {drink}</p>
      </div>
    </div>
  );
};

export default ThankYou;
