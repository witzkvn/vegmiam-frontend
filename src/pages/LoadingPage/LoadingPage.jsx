import React from "react";

import "./LoadingPage.scss";

const LoadingPage = () => {
  return (
    <div className="LoadingPage">
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingPage;
