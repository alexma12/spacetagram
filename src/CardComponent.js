import React from "react";

const CardComponent = ({ img, title, date, copyright, explanation }) => {
  return (
    <div className="CardComponent">
      <div className="CardComponent-title">{title}</div>
      <img className="CardComponent-img" src={img} alt="nasa-img" />
      <div className="CardComponent-explanation"> {explanation}</div>
    </div>
  );
};

export default CardComponent;
