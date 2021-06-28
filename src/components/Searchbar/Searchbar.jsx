import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getSearchApiUrl } from "../../helper/functions/getSearchApiUrl";
import { getAllRecipesAction } from "../../redux/recipes/recipes-actions";
import { setSearchParams } from "../../redux/search/search-actions";
import { selectSearchParams } from "../../redux/search/search-selectors";
import SearchFilters from "../SearchFilters/SearchFilters";

import "./Searchbar.scss";

const Searchbar = () => {
  // const [search, setSearch] = useState();
  const searchObj = useSelector(selectSearchParams);
  const dispatch = useDispatch();
  const searchInputEl = useRef();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const onClose = useCallback(
    (e) => {
      if (filtersOpen && searchInputEl.current && !searchInputEl.current.contains(e.target)) {
        setFiltersOpen(false);
      }
      e.stopPropagation();
    },
    [filtersOpen, searchInputEl]
  );

  const handleChange = (e) => {
    const newSearch = e.target.value;
    dispatch(
      setSearchParams({
        searchWords: newSearch,
      })
    );
  };

  const focusSearch = (e) => {
    e.stopPropagation();
    setFiltersOpen(true);
  };

  const fetchRecipes = useCallback(
    async (fetchUrl) => {
      setError(null);
      try {
        await dispatch(getAllRecipesAction(fetchUrl));
      } catch (error) {
        setError(error?.response?.data?.message);
      }
      setIsLoading(false);
    },
    [dispatch]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchRecipes(getSearchApiUrl(searchObj));
    setFiltersOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", onClose);
    return () => {
      document.removeEventListener("mousedown", onClose);
    };
  }, [onClose]);

  return (
    <>
      <form className="Searchbar" ref={searchInputEl} onSubmit={handleSubmit}>
        <input type="text" placeholder="Recherche..." onChange={handleChange} onFocus={focusSearch} value={searchObj?.searchWords} />
        <SearchFilters active={filtersOpen} onClose={onClose} />
      </form>
    </>
  );
};

export default Searchbar;
