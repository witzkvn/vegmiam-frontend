import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setSearchParams } from "../../redux/search/search-actions";
import { selectSearchParams } from "../../redux/search/search-selectors";

import "./Searchbar.scss";

const Searchbar = ({ focusSearch, setSearch, search }) => {
  // const [search, setSearch] = useState();
  const { searchWords } = useSelector(selectSearchParams);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
  };

  // test

  return (
    // <div className={`Searchbar ${active ? "active" : ""}`}>
    <div className="Searchbar">
      <input type="text" placeholder="Recherche..." onChange={handleChange} onFocus={focusSearch} value={search} />
    </div>
  );
};

export default Searchbar;
