import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as HeartIcon } from "./svg/heart-outline.svg";

const CardComponent = ({
  img,
  title,
  copyright = null,
  explanation,
  refProp,
  date,
}) => {
  let copyrightComponent = null;
  if (copyright !== null) {
    copyrightComponent = (
      <div className="CardComponent-copyright">
        <strong> Taken By: </strong> {copyright}
      </div>
    );
  }
  return (
    <div className="CardComponent" ref={refProp}>
      <div className="CardComponent-header">
        <div className="CardComponent-title">{title}</div>
        <HeartIcon className="CardComponent-likeIcon" />
        <div className="CardComponent-date">{date}</div>
      </div>
      <img className="CardComponent-img" src={img} alt="nasa-api-img" />
      {copyrightComponent}
      <div className="CardComponent-explanation"> {explanation}</div>
    </div>
  );
};

CardComponent.propTypes = {
  img: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string,
  copyright: PropTypes.string,
  refProp: PropTypes.func,
  explanation: PropTypes.string,
};

export default CardComponent;
