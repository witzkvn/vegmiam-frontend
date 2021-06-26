import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IoCloseCircle } from "react-icons/io5";
import { selectSearchParams } from "../../redux/search/search-selectors";
import "./SearchFilters.scss";
import CustomButton from "../CustomButton/CustomButton";

const SearchFilters = ({ onClose }) => {
  const { searchDifficulty, searchDuration, searchOrder, searchCategory } = useSelector(selectSearchParams);
  const [duration, setDuration] = useState();
  const [difficulties, setDifficulties] = useState();
  const [order, setOrder] = useState();
  const [categories, setCategories] = useState();

  return (
    <div className="SearchFilters" onClick={onClose}>
      <div className="SearchFilters__wrapper">
        <h2>Ajouter des filtres</h2>
        <div className="SearchFilters__filter-group">
          <h4>Durée</h4>
        </div>
        <div className="SearchFilters__filter-group">
          <h4>Difficulté</h4>
        </div>
        <div className="SearchFilters__filter-group">
          <h4>Catégorie</h4>
        </div>
        <div className="SearchFilter__save">
          <CustomButton level="primary">Enregistrer</CustomButton>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
