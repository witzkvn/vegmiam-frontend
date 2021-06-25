import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectSearchParams } from "../../redux/search/search-selectors";
import "./SearchFilters.scss";

const SearchFilters = () => {
  const { searchDifficulty, searchDuration, searchOrder, searchCategory } = useSelector(selectSearchParams);
  const [duration, setDuration] = useState();
  const [difficulties, setDifficulties] = useState();
  const [order, setOrder] = useState();
  const [categories, setCategories] = useState();
  return <div className="SearchFilters">FILTERS</div>;
};

export default SearchFilters;
