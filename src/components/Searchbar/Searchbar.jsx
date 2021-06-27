import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setSearchParams } from "../../redux/search/search-actions";
import { selectSearchParams } from "../../redux/search/search-selectors";
import SearchFilters from "../SearchFilters/SearchFilters";

import "./Searchbar.scss";

const Searchbar = () => {
  // const [search, setSearch] = useState();
  const { searchWords } = useSelector(selectSearchParams);
  const dispatch = useDispatch();
  const searchInputEl = useRef();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [search, setSearch] = useState();
  const [newSearchState, setNewSearchState] = useState({
    searchWords: search,
    searchDifficulty: [],
    searchDuration: [],
    searchOrder: "recent",
    searchCategory: [],
    searchPage: 1,
  });

  const onClose = useCallback(
    (e) => {
      if (filtersOpen && searchInputEl.current && !searchInputEl.current.contains(e.target)) {
        setFiltersOpen(false);
        console.log("call");
      }
      e.stopPropagation();
    },
    [filtersOpen, searchInputEl]
  );

  const handleChange = (e) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
  };

  const focusSearch = (e) => {
    e.stopPropagation();
    setFiltersOpen(true);
  };

  const getFilters = (filters) => {
    setNewSearchState({
      searchWords: search,
      searchDifficulty: filters.searchDifficulty,
      searchDuration: filters.searchDuration,
      searchCategory: filters.searchCategory,
      searchOrder: "recent",
      searchPage: 1,
    });
  };

  useEffect(() => {
    document.addEventListener("mousedown", onClose);
    return () => {
      document.removeEventListener("mousedown", onClose);
    };
  }, [onClose]);

  return (
    <>
      <div className="Searchbar" ref={searchInputEl}>
        <input type="text" placeholder="Recherche..." onChange={handleChange} onFocus={focusSearch} value={search} />
        <SearchFilters active={filtersOpen} onClose={onClose} getFilters={getFilters} />
      </div>
    </>
  );
};

export default Searchbar;
