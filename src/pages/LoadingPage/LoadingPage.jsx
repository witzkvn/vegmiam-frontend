import React from "react";

import "./LoadingPage.scss";

const LoadingPage = () => {
  return (
    <div className="LoadingPage">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingPage;
