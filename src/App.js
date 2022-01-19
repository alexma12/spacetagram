import React, { useState } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import { ReactComponent as HeartIcon } from "./svg/heart-outline.svg";
import { ReactComponent as HomeIcon } from "./svg/home-outline.svg";
import { ReactComponent as NotificationIcon } from "./svg/notifications-outline.svg";
import CardComponent from "./CardComponent";
import useAxiosRequest from "./hooks/useAxiosRequest";
import logo from "./profilepic.jpg";
import "./App.scss";
import "react-datepicker/dist/react-datepicker.css";

const App = () => {
  const [selectedDate, setSelectedDate] = useState(Date.now());

  const setDateHandler = (newDate) => {
    const currentDate = new Date().setHours(0, 0, 0, 0);
    const newDateStart = new Date(newDate).setHours(0, 0, 0, 0);
    if (!moment(newDateStart).isAfter(currentDate)) {
      setSelectedDate(newDate);
    }
  };
  const dateFormat = (date) => {
    return moment(date).format("YYYY-MM-DD");
  };

  const requestParams = {
    url: `https://api.nasa.gov/planetary/apod?api_key=${
      process.env.REACT_APP_NASA_API_KEY
    }&start_date=${dateFormat(selectedDate)}&end_date=${dateFormat(
      new Date()
    )}`,
    method: "GET",
  };

  const [response, error] = useAxiosRequest(requestParams, [selectedDate]);

  console.log(response);
  let cardComponents;
  if (error === null && response !== null) {
    if (Array.isArray(response.data)) {
      cardComponents = response.data
        .reverse()
        .map(({ hdurl, copyright, explanation, title }) => (
          <CardComponent
            img={hdurl}
            title={title}
            copyright={copyright}
            explanation={explanation}
          />
        ));
    } else {
      const { hdurl, copyright, explanation, title } = response.data;
      cardComponents = (
        <CardComponent
          img={hdurl}
          title={title}
          copyright={copyright}
          explanation={explanation}
        />
      );
    }
  }
  return (
    <div className="App">
      <div className="Navbar">
        <div className="Navbar-title"> Spacestagram </div>
        <div className="Navbar-buttons">
          <HomeIcon className="Navbar-button Navbar-button-filled" />
          <NotificationIcon className="Navbar-button" />
          <HeartIcon className="Navbar-button" />
          <img src={logo} className="Navbar-avatar" alt="avatar" />
        </div>
      </div>
      <div className="Datepicker">
        <DatePicker open selected={selectedDate} onChange={setDateHandler} />
      </div>
      <div className="CardComponent-box">{cardComponents}</div>
    </div>
  );
};

export default App;
