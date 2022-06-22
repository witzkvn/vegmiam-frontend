import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getSearchApiUrl } from "../../helper/functions/getSearchApiUrl";
import { getAllRecipesAction } from "../../redux/recipes/recipes-actions";
import { setSearchParams } from "../../redux/search/search-actions";
import { selectCurrentPage, selectSearchParams, selectTotalPages } from "../../redux/search/search-selectors";
import CustomButton from "../CustomButton/CustomButton";

import "./Pagination.scss";

const Pagination = () => {
  const totalPages = useSelector(selectTotalPages);
  const currentPage = useSelector(selectCurrentPage);
  // const [currentPageState, setCurrentPageState] = useState(1);
  const searchObj = useSelector(selectSearchParams);
  const [pagesArr, setPagesArr] = useState([]);
  const [error, setError] = useState();
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
    // setCurrentPageState(currentPage + 1)
    console.log(currentPage)
  }, [setButtonsArray, totalPages, currentPage]);

  const handlePageClick = (page) => {
    // history.push(``);
    // dispatch(setSearchParams({ searchPage: page + 1 }));
    fetchRecipes(getSearchApiUrl({...searchObj, searchPage: page + 1}));
  };

    const fetchRecipes = useCallback(
    async (fetchUrl) => {
      setError(null);
      try {
        await dispatch(getAllRecipesAction(fetchUrl));
      } catch (error) {
        setError(error?.response?.data?.message);
      }
    },
    [dispatch]
  );

  return (
    <div className="Pagination">
      {pagesArr.map((page, index) => (
        <CustomButton onClick={() => handlePageClick(page)} key={`page-${index}`} level={currentPage - 1 === page ? "primary" : "transparent"}>
          {page + 1}
        </CustomButton>
      ))}
    </div>
  );
};

export default Pagination;
