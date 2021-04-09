import React from "react";

const CustomButton = ({ type, className, children, ...props }) => {
  return (
    <button className={`btn ${className ? className : ""} ${type === "primary" ? "btn-primary" : "btn-secondary"}`} {...props}>
      {children}
    </button>
  );
};

export default CustomButton;
