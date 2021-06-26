import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IoCloseCircle } from "react-icons/io5";
import { selectSearchParams } from "../../redux/search/search-selectors";
import FilterItem from "./FilterItem";
import "./SearchFilters.scss";
import CustomButton from "../CustomButton/CustomButton";
import { useEffect } from "react";

const SearchFilters = ({ onClose, getFilters }) => {
  const { searchDifficulty, searchDuration, searchOrder, searchCategory } = useSelector(selectSearchParams);
  const [newSearchState, setNewSearchState] = useState({
    searchDifficulty: [],
    searchDuration: [],
    searchCategory: [],
  });

  const toggleSelect = (group, value, isSelected) => {
    const stateCopy = { ...newSearchState };
    if (isSelected) {
      !stateCopy[group].includes(value) && stateCopy[group].push(value);
    } else {
      stateCopy[group].includes(value) && (stateCopy[group] = stateCopy[group].filter((item) => item !== value));
    }
    setNewSearchState({ ...stateCopy });
  };

  useEffect(() => {
    // console.log(newSearchState);
  }, [newSearchState]);

  const sendFilters = () => {
    const stateCopy = { ...newSearchState };
    stateCopy.searchDifficulty = newSearchState.searchDifficulty.join(",");
    stateCopy.searchDuration = newSearchState.searchDuration.join(",");
    stateCopy.searchCategory = newSearchState.searchCategory.join(",");
    getFilters(stateCopy);
  };

  return (
    <div className="SearchFilters" onClick={onClose}>
      <div className="SearchFilters__wrapper" onClick={(e) => e.stopPropagation()}>
        <h2>Ajouter des filtres</h2>
        <div className="SearchFilters__filter-group">
          <h4>Durée</h4>
          <div className="SearchFilters__options">
            <FilterItem group="searchDuration" value="15" toggleSelect={toggleSelect}>
              Moins de 15 min
            </FilterItem>
            <FilterItem group="searchDuration" value="30" toggleSelect={toggleSelect}>
              Moins de 30 min
            </FilterItem>
            <FilterItem group="searchDuration" value="60" toggleSelect={toggleSelect}>
              Moins de 60 min
            </FilterItem>
          </div>
        </div>
        <div className="SearchFilters__filter-group">
          <h4>Difficulté</h4>
          <div className="SearchFilters__options">
            <FilterItem group="searchDifficulty" value="facile" toggleSelect={toggleSelect}>
              Facile
            </FilterItem>
            <FilterItem group="searchDifficulty" value="moyen" toggleSelect={toggleSelect}>
              Moyenne
            </FilterItem>
            <FilterItem group="searchDifficulty" value="difficile" toggleSelect={toggleSelect}>
              Difficile
            </FilterItem>
          </div>
        </div>
        <div className="SearchFilters__filter-group">
          <h4>Catégorie</h4>
          <div className="SearchFilters__options">
            <FilterItem group="searchCategory" value="apero" toggleSelect={toggleSelect}>
              Apéro
            </FilterItem>
            <FilterItem group="searchCategory" value="entree" toggleSelect={toggleSelect}>
              Entrées
            </FilterItem>
            <FilterItem group="searchCategory" value="plat" toggleSelect={toggleSelect}>
              Plat
            </FilterItem>
            <FilterItem group="searchCategory" value="dessert" toggleSelect={toggleSelect}>
              Dessert
            </FilterItem>
            <FilterItem group="searchCategory" value="snack" toggleSelect={toggleSelect}>
              Snack
            </FilterItem>
            <FilterItem group="searchCategory" value="fauxmage" toggleSelect={toggleSelect}>
              Fauxmage
            </FilterItem>
            <FilterItem group="searchCategory" value="petit-dejeuner" toggleSelect={toggleSelect}>
              Petit-déjeuner
            </FilterItem>
            <FilterItem group="searchCategory" value="boisson" toggleSelect={toggleSelect}>
              Boisson
            </FilterItem>
            <FilterItem group="searchCategory" value="autre" toggleSelect={toggleSelect}>
              Autre
            </FilterItem>
          </div>
        </div>
        <div className="SearchFilters__save">
          <CustomButton level="primary" onClick={sendFilters}>
            Manger !
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
