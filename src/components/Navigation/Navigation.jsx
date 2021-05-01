import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { setClickedUserAction, setCurrentUserAction } from "../../redux/user/user-actions";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

import "./Navigation.scss";

const Navigation = ({ setNavOpen }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setCurrentUserAction(false));
  };

  const handleNavClose = () => {
    setNavOpen(false);
  };

  return (
    <div className="Navigation" onClick={(e) => e.stopPropagation()}>
      <div className="Navigation__header">
        <div className="Navigation__header--menu" onClick={handleNavClose}>
          <IoMenu />
        </div>
        <NavLink exact to="/" onClick={handleNavClose}>
          <h1>Vegmiam</h1>
        </NavLink>
      </div>

      <div className="Navigation__links">
        <NavLink className="Navigation__links--link" exact to="/" onClick={handleNavClose}>
          Recettes
        </NavLink>
        <NavLink className="Navigation__links--link" to="/publier" onClick={handleNavClose}>
          Publier
        </NavLink>
        <NavLink className="Navigation__links--link" to="/favoris" onClick={handleNavClose}>
          Favoris
        </NavLink>
        <NavLink
          className="Navigation__links--link"
          to="/compte"
          onClick={() => {
            dispatch(setClickedUserAction());
            handleNavClose();
          }}
        >
          Compte
        </NavLink>
        <NavLink className="Navigation__links--link" to="/parametres" onClick={handleNavClose}>
          Paramètres
        </NavLink>
      </div>
      <div
        className="Navigation__deconnexion"
        onClick={() => {
          handleNavClose();
          handleLogout();
        }}
      >
        Déconnexion
      </div>
      <ThemeToggle />
    </div>
  );
};

export default Navigation;
