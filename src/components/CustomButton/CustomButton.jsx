import React from "react";

import "./CustomButton.scss";

const CustomButton = ({ level, className, children, ...otherProps }) => {
  return (
    <button className={`CustomButton ${level && "CustomButton-" + level} ${className ? className : ""} `} {...otherProps}>
      {children}
    </button>
  );
};

export default CustomButton;
