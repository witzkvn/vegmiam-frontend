import React from "react";
import { useSelector } from "react-redux";
import { selectOverlayMessageOpen } from "../../redux/layout/layout-selectors";
import CustomButton from "../CustomButton/CustomButton";

import "./AlertOverlayPopup.scss";

const AlertOverlayPopup = ({ message, actionOnClick, actionText }) => {
  const overlayOpen = useSelector(selectOverlayMessageOpen);

  if (!overlayOpen) return null;
  return (
    <div className="AlertOverlayPopup">
      <div className="AlertOverlayPopup__wrapper">
        {message}
        <CustomButton level="primary" onClick={actionOnClick}>
          {actionText || "OK"}
        </CustomButton>
      </div>
    </div>
  );
};

export default AlertOverlayPopup;
