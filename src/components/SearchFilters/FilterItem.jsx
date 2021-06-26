import React, { useEffect } from "react";
import { useState } from "react";

import "./FilterItem.scss";

const FilterItem = ({ children, value, group, filterValue, toggleSelect }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    toggleSelect(group, value, !isSelected);
    setIsSelected((prevState) => !prevState);
  };

  // useEffect(() => {
  // }, [group, isSelected, toggleSelect, value]);

  return (
    <div className={`FilterItem ${isSelected ? "active" : ""}`} onClick={handleClick}>
      {children}
    </div>
  );
};

export default FilterItem;
