import React from "react";
import { useSelector } from "react-redux";
import { selectOverlayMessageOpen } from "../../redux/layout/layout-selectors";
import CustomButton from "../CustomButton/CustomButton";

import "./AlertOverlayPopup.scss";

const AlertOverlayPopup = ({ bgOnClick, children }) => {
  const overlayOpen = useSelector(selectOverlayMessageOpen);

  if (!overlayOpen) return null;
  return (
    <div className="AlertOverlayPopup" onClick={bgOnClick}>
      <div className="AlertOverlayPopup__wrapper">{children}</div>
    </div>
  );
};

export default AlertOverlayPopup;
