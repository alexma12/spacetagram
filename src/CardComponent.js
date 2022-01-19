import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as HeartIcon } from "./svg/heart-outline.svg";

const CardComponent = ({ img, title, copyright = null, explanation }) => {
  let copyrightComponent = null;
  if (copyright !== null) {
    copyrightComponent = (
      <div className="CardComponent-copyright">
        <strong> Taken By: </strong> {copyright}
      </div>
    );
  }
  return (
    <div className="CardComponent">
      <div className="CardComponent-header">
        <div className="CardComponent-title">{title}</div>
        <HeartIcon className="CardComponent-likeIcon" />
      </div>
      <img className="CardComponent-img" src={img} alt="nasa-img" />
      {copyrightComponent}
      <div className="CardComponent-explanation"> {explanation}</div>
    </div>
  );
};

CardComponent.propTypes = {
  img: PropTypes.string,
  title: PropTypes.string,
  copyright: PropTypes.string,
  explanation: PropTypes.string,
};

export default CardComponent;
