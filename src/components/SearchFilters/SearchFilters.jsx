import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoCloseCircle } from "react-icons/io5";
import { selectSearchParams } from "../../redux/search/search-selectors";
import FilterItem from "./FilterItem";
import "./SearchFilters.scss";
import CustomButton from "../CustomButton/CustomButton";
import { useEffect } from "react";
import { setSearchParams } from "../../redux/search/search-actions";

const SearchFilters = ({ active }) => {
  const searchParams = useSelector(selectSearchParams);
  const dispatch = useDispatch();

  const toggleSelect = (group, value, isSelected) => {
    if (isSelected) {
      !searchParams[group].includes(value) &&
        dispatch(
          setSearchParams({
            [group]: [...searchParams[group], value],
          })
        );
    } else {
      searchParams[group].includes(value) &&
        dispatch(
          setSearchParams({
            [group]: searchParams[group].filter((item) => item !== value),
          })
        );
    }
  };

  const deleteFilters = () => {
    dispatch(
      setSearchParams({
        searchWords: "",
        searchDifficulty: [],
        searchDuration: [],
        searchOrder: "-createdAt",
        searchCategory: [],
        searchPage: 1,
      })
    );
  };

  const isSelectedInStore = (group, value) => {
    if (!group || !value) return;
    return searchParams[group]?.includes(value);
  };

  return (
    // <div className="SearchFilters" onClick={onClose}>
    <div className={`SearchFilters__wrapper ${active && "active"}`} onClick={(e) => e.stopPropagation()}>
      <h2>Ajouter des filtres</h2>
      <div className="SearchFilters__filter-group">
        <h4>Durée</h4>
        <div className="SearchFilters__options">
          <FilterItem group="searchDuration" value="15" toggleSelect={toggleSelect} isSelectedInStore={isSelectedInStore("searchDuration", "15")}>
            Moins de 15 min
          </FilterItem>
          <FilterItem group="searchDuration" value="30" toggleSelect={toggleSelect} isSelectedInStore={isSelectedInStore("searchDuration", "30")}>
            Moins de 30 min
          </FilterItem>
          <FilterItem group="searchDuration" value="60" toggleSelect={toggleSelect} isSelectedInStore={isSelectedInStore("searchDuration", "60")}>
            Moins de 60 min
          </FilterItem>
        </div>
      </div>
      <div className="SearchFilters__filter-group">
        <h4>Difficulté</h4>
        <div className="SearchFilters__options">
          <FilterItem
            group="searchDifficulty"
            value="facile"
            toggleSelect={toggleSelect}
            isSelectedInStore={isSelectedInStore("searchDifficulty", "facile")}
          >
            Facile
          </FilterItem>
          <FilterItem
            group="searchDifficulty"
            value="moyen"
            toggleSelect={toggleSelect}
            isSelectedInStore={isSelectedInStore("searchDifficulty", "moyen")}
          >
            Moyenne
          </FilterItem>
          <FilterItem
            group="searchDifficulty"
            value="difficile"
            toggleSelect={toggleSelect}
            isSelectedInStore={isSelectedInStore("searchDifficulty", "difficile")}
          >
            Difficile
          </FilterItem>
        </div>
      </div>
      <div className="SearchFilters__filter-group">
        <h4>Catégorie</h4>
        <div className="SearchFilters__options">
          <FilterItem
            group="searchCategory"
            value="apero"
            toggleSelect={toggleSelect}
            isSelectedInStore={isSelectedInStore("searchCategory", "apero")}
          >
            Apéro
          </FilterItem>
          <FilterItem
            group="searchCategory"
            value="entree"
            toggleSelect={toggleSelect}
            isSelectedInStore={isSelectedInStore("searchCategory", "entree")}
          >
            Entrées
          </FilterItem>
          <FilterItem group="searchCategory" value="plat" toggleSelect={toggleSelect} isSelectedInStore={isSelectedInStore("searchCategory", "plat")}>
            Plat
          </FilterItem>
          <FilterItem
            group="searchCategory"
            value="dessert"
            toggleSelect={toggleSelect}
            isSelectedInStore={isSelectedInStore("searchCategory", "dessert")}
          >
            Dessert
          </FilterItem>
          <FilterItem
            group="searchCategory"
            value="snack"
            toggleSelect={toggleSelect}
            isSelectedInStore={isSelectedInStore("searchCategory", "snack")}
          >
            Snack
          </FilterItem>
          <FilterItem
            group="searchCategory"
            value="fauxmage"
            toggleSelect={toggleSelect}
            isSelectedInStore={isSelectedInStore("searchCategory", "fauxmage")}
          >
            Fauxmage
          </FilterItem>
          <FilterItem
            group="searchCategory"
            value="petit-dejeuner"
            toggleSelect={toggleSelect}
            isSelectedInStore={isSelectedInStore("searchCategory", "petit-dejeuner")}
          >
            Petit-déjeuner
          </FilterItem>
          <FilterItem
            group="searchCategory"
            value="boisson"
            toggleSelect={toggleSelect}
            isSelectedInStore={isSelectedInStore("searchCategory", "boisson")}
          >
            Boisson
          </FilterItem>
          <FilterItem
            group="searchCategory"
            value="autre"
            toggleSelect={toggleSelect}
            isSelectedInStore={isSelectedInStore("searchCategory", "autre")}
          >
            Autre
          </FilterItem>
        </div>
      </div>
      <div className="SearchFilters__save">
        <CustomButton type="button" level="secondary" onClick={deleteFilters}>
          Supprimer les filtres
        </CustomButton>
        <CustomButton type="submit" level="primary">
          Manger !
        </CustomButton>
      </div>
    </div>
    // </div>
  );
};

export default SearchFilters;
