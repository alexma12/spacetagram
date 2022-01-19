import React, { useState, useRef, useCallback } from "react";
import DatePicker from "react-datepicker";
import { ReactComponent as HeartIcon } from "./svg/heart-outline.svg";
import { ReactComponent as HomeIcon } from "./svg/home-outline.svg";
import { ReactComponent as NotificationIcon } from "./svg/notifications-outline.svg";
import CardComponent from "./CardComponent";
import useBatchedNasaImageQuery from "./hooks/useBatchedNasaImageQuery";
import { dateComparison } from "./utils/dateUtils";
import profilePic from "./profilepic.jpg";
import "./App.scss";
import "react-datepicker/dist/react-datepicker.css";

const App = () => {
  const [selectedDate, setSelectedDate] = useState(Date.now());
  const [currBatch, setCurrBatch] = useState(0);

  const setSelectedDateHandler = (newDate) => {
    if (!dateComparison(newDate, new Date(), "after")) {
      setSelectedDate(newDate);
      setCurrBatch(0);
    }
  };

  const batchSize = 7;
  const [data, isAllDataFetched, isLoading, error] = useBatchedNasaImageQuery(
    selectedDate,
    currBatch,
    batchSize
  );

  const ref = useRef();
  const lastCardComponent = useCallback(
    (lastElementRef) => {
      if (isLoading) return;
      if (ref.current) {
        ref.current.disconnect();
      }

      ref.current = new IntersectionObserver(
        (observees) => {
          if (observees[0].isIntersecting && !isAllDataFetched) {
            setCurrBatch((prevBatch) => prevBatch + 1);
          }
        },
        {
          threshold: 0.3,
        }
      );
      if (lastElementRef) {
        ref.current.observe(lastElementRef);
      }
    },
    [isAllDataFetched, isLoading]
  );

  let cardComponents = (data || []).map(
    ({ hdurl, copyright, explanation, title, date }, index) => {
      let refProp = null;
      if (index === data.length - 1) {
        refProp = lastCardComponent;
      }
      return (
        <CardComponent
          refProp={refProp}
          date={date}
          img={hdurl}
          title={title}
          copyright={copyright}
          explanation={explanation}
        />
      );
    }
  );

  return (
    <div className="App">
      <div className="Navbar">
        <div className="Navbar-title"> Spacestagram </div>
        <div className="Navbar-buttons">
          <HomeIcon className="Navbar-button Navbar-button-filled" />
          <NotificationIcon className="Navbar-button" />
          <HeartIcon className="Navbar-button" />
          <img src={profilePic} className="Navbar-avatar" alt="avatar" />
        </div>
      </div>
      <div className="Datepicker">
        <DatePicker
          open
          selected={selectedDate}
          onChange={setSelectedDateHandler}
        />
      </div>
      <div className="CardComponent-box">{cardComponents}</div>
    </div>
  );
};

export default App;
