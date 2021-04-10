import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { setCurrentuser } from "../../redux/user/user-actions";
import CustomButton from "../CustomButton/CustomButton";
import Searchbar from "../Searchbar/Searchbar";

import "./Navigation.scss";

const Navigation = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setCurrentuser(false));
  };

  const toggleTheme = () => {
    const root = document.documentElement;
    const blackLight = getComputedStyle(root).getPropertyValue("--bg-black-light");
    const blackDark = getComputedStyle(root).getPropertyValue("--bg-black-dark");
    const whiteLight = getComputedStyle(root).getPropertyValue("--bg-white-light");
    const whiteDark = getComputedStyle(root).getPropertyValue("--bg-white-dark");
    const textColor = getComputedStyle(root).getPropertyValue("--text-color");
    const textWhite = getComputedStyle(root).getPropertyValue("--text-white");
    const textBlack = getComputedStyle(root).getPropertyValue("--text-black");

    root.style.setProperty("--bg-black-light", whiteLight);
    root.style.setProperty("--bg-black-dark", whiteDark);
    root.style.setProperty("--bg-white-light", blackLight);
    root.style.setProperty("--bg-white-dark", blackDark);

    if (textColor === textWhite) {
      root.style.setProperty("--text-color", textBlack);
    } else {
      root.style.setProperty("--text-color", textWhite);
    }
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
      <div className="Navigation__toggle-theme" onClick={toggleTheme}>
        Changer de thème
      </div>
    </div>
  );
};

export default Navigation;
