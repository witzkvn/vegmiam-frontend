import React from "react";

import "./CustomButton.scss";

const CustomButton = ({ type, className, children, ...otherProps }) => {
  return (
    <div className={`CustomButton ${type && "CustomButton-" + type} ${className ? className : ""} `} {...otherProps}>
      {children}
    </div>
  );
};

export default CustomButton;
