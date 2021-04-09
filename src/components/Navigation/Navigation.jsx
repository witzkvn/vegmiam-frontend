import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { MdAdd, MdTurnedIn, MdPerson } from "react-icons/md";
import SearchBar from "../SearchBar/SearchBar";
import CustomButton from "../CustomButton/CustomButton";
import RoundButton from "../RoundButton/RoundButton";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user-selectors";
import "./Navigation.scss";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import DropdownLink from "../DropdownMenu/DropdownLink";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = React.createRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target) && userMenuOpen === true) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [userMenuOpen, userMenuRef]);

  return (
    <div className="w-full px-4 h-14 text-white bg-green-600 shadow-lg flex justify-between">
      <div className="flex items-center">
        <h4 className="pr-6 ">VegMiam</h4>
        {currentUser ? (
          <>
            <NavLink exact to="/" className="px-6 Navigation-link h-full flex items-center">
              Accueil
            </NavLink>
            <NavLink to="/recettes" className="px-6 Navigation-link h-full flex items-center">
              Recettes
            </NavLink>
          </>
        ) : (
          ""
        )}
      </div>
      {currentUser && <SearchBar />}
      <div className="flex items-center relative">
        {currentUser ? (
          <>
            <RoundButton className="mx-1">
              <MdAdd />
            </RoundButton>
            <RoundButton className="mx-1">
              <MdTurnedIn />
            </RoundButton>
            <RoundButton className="mx-1" onClick={() => setUserMenuOpen((prevState) => !prevState)}>
              <MdPerson />
            </RoundButton>
          </>
        ) : (
          <CustomButton type="secondary">Connexion</CustomButton>
        )}
      </div>
      <DropdownMenu open={userMenuOpen} ref={userMenuRef}>
        <DropdownLink>Compte</DropdownLink>
      </DropdownMenu>
    </div>
  );
};

export default Navigation;
