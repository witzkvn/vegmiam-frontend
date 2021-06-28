import React, { useEffect } from "react";
import { useState } from "react";

import "./FilterItem.scss";

const FilterItem = ({ children, isSelectedInStore, value, group, filterValue, toggleSelect }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    toggleSelect(group, value, !isSelectedInStore);
  };

  return (
    <div className={`FilterItem ${isSelectedInStore ? "active" : ""}`} onClick={handleClick}>
      {children}
    </div>
  );
};

export default FilterItem;
