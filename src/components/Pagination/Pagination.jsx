import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { setSearchParams } from "../../redux/search/search-actions";
import { selectCurrentPage, selectSearchParams, selectTotalPages } from "../../redux/search/search-selectors";
import CustomButton from "../CustomButton/CustomButton";

import "./Pagination.scss";

const Pagination = () => {
  const totalPages = useSelector(selectTotalPages);
  const currentPage = useSelector(selectSearchParams).searchPage;
  const [pagesArr, setPagesArr] = useState([]);
  const dispatch = useDispatch();

  const setButtonsArray = useCallback(() => {
    let array = [];
    for (let i = 0; i < totalPages; i++) {
      array.push(i);
    }
    setPagesArr(array);
  }, [totalPages]);

  useEffect(() => {
    setButtonsArray();
  }, [setButtonsArray, totalPages]);

  const handlePageClick = (page) => {
    // history.push(``);
    dispatch(setSearchParams({ searchPage: page + 1 }));
  };

  return (
    <div className="Pagination">
      {pagesArr.map((page) => (
        <CustomButton onClick={() => handlePageClick(page)} level={currentPage - 1 === page ? "primary" : "transparent"}>
          {page + 1}
        </CustomButton>
      ))}
    </div>
  );
};

export default Pagination;
