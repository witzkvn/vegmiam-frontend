import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkTheme } from "../../helper/functions/themeSwitcher";
import { setThemeAction } from "../../redux/layout/layout-actions";
import { selectTheme } from "../../redux/layout/layout-selectors";
import { IoMoon, IoSunny } from "react-icons/io5";

import "./ThemeToggle.scss";

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    dispatch(setThemeAction(newTheme));
  };

  useEffect(() => {
    toggleDarkTheme(theme);
  }, [theme]);

  return (
    <div className="ThemeToggle" onClick={toggleTheme}>
      {theme === "light" ? (
        <>
          <IoMoon /> Mode Sombre
        </>
      ) : (
        <>
          <IoSunny /> Mode Jour
        </>
      )}
    </div>
  );
};

export default ThemeToggle;
