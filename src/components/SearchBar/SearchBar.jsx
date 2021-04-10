import React, { useState } from "react";

import "./Searchbar.scss";

const Searchbar = () => {
  const [search, setSearch] = useState();

  const handleChange = (e) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
  };

  return (
    <div className="Searchbar">
      <input type="text" placeholder="Recherche..." onChange={handleChange} value={search} />
      <div className="Searchbar__button CustomButton CustomButton-primary">Manger !</div>
    </div>
  );
};

export default Searchbar;
