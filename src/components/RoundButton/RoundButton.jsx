import React from "react";

const RoundButton = ({ className, children, ...props }) => {
  return (
    <div
      className={`${
        className ? className : ""
      } w-8 h-8 bg-green-900 text-white flex items-center justify-center rounded-full cursor-pointer btn-ring focus:ring-green-700 hover:bg-green-800 `}
      {...props}
    >
      {children}
    </div>
  );
};

export default RoundButton;
