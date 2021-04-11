import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { setCurrentUserAction } from "../../redux/user/user-actions";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

import "./Navigation.scss";

const Navigation = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setCurrentUserAction(false));
  };

  return (
    <div className="Navigation">
      <h1>Vegmiam</h1>
      <div className="Navigation__links">
        <NavLink className="Navigation__links--link" exact to="/">
          Accueil
        </NavLink>
        <NavLink className="Navigation__links--link" to="/recettes">
          Recettes
        </NavLink>
        <NavLink className="Navigation__links--link" to="/publier">
          Publier
        </NavLink>
        <NavLink className="Navigation__links--link" to="/favoris">
          Favoris
        </NavLink>
        <NavLink className="Navigation__links--link" to="/compte">
          Compte
        </NavLink>
        <NavLink className="Navigation__links--link" to="/parametres">
          Paramètres
        </NavLink>
      </div>
      <div className="Navigation__user">{/* user infos */}</div>
      <div className="Navigation__deconnexion" onClick={handleLogout}>
        Déconnexion
      </div>
      <ThemeToggle />
    </div>
  );
};

export default Navigation;
