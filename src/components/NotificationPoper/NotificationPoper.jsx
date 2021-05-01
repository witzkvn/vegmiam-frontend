import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closePopupMessageAction } from "../../redux/layout/layout-actions";
import { selectPopup } from "../../redux/layout/layout-selectors";

import "./NotificationPoper.scss";

const NotificationPoper = () => {
  const dispatch = useDispatch();
  const { active, message, status } = useSelector(selectPopup);
  const timer = useRef(null);

  useEffect(() => {
    if (active) {
      timer.current = setTimeout(() => {
        dispatch(closePopupMessageAction());
      }, 4000);
    }
    return () => clearTimeout(timer.current);
  }, [dispatch, active]);

  return <div className={`NotificationPoper${status ? ` NotificationPoper__${status}` : ""}${active ? " active" : ""}`}>{message}</div>;
};

export default NotificationPoper;
