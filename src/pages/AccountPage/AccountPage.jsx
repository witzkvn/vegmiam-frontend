import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import UserAvatar from "../../components/UserAvatar/UserAvatar";
import RecipesGrid from "../../components/RecipesGrid/RecipesGrid";
import { selectClickedUser, selectCurrentUser } from "../../redux/user/user-selectors";

import "./AccountPage.scss";
import { getAllRecipesFromUserByIdAction } from "../../redux/recipes/recipes-actions";
import { selectRecipesArray } from "../../redux/recipes/recipes-selectors";
import { getUserByIdAction, setClickedUserAction } from "../../redux/user/user-actions";

const AccountPage = ({ location }) => {
  const { pathname } = location;
  const currentUser = useSelector(selectCurrentUser);
  const clickedUser = useSelector(selectClickedUser);
  const [user, setUser] = useState(null);
  const userId = user?._id;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [error, setError] = useState();
  const [userError, setUserError] = useState();
  const recipesArray = useSelector(selectRecipesArray);

  const getUser = useCallback(async () => {
    console.log("call getUser");
    setUserError(null);
    try {
      if (pathname === "/compte") {
        setUser(currentUser);
      } else if (pathname.startsWith("/chef/")) {
        const clickedUserId = pathname.split("/chef/")[1];
        const clickedUserRes = await dispatch(getUserByIdAction(clickedUserId));
        dispatch(setClickedUserAction(clickedUserRes));
        setUser(clickedUserRes);
      } else {
        setUserError(true);
      }
    } catch (error) {
      setUserError(error.message);
    }
    setIsUserLoading(false);
  }, [pathname, dispatch, currentUser]);

  const fetchRecipes = useCallback(
    async (userId) => {
      setError(null);
      try {
        await dispatch(getAllRecipesFromUserByIdAction(userId));
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    },
    [dispatch]
  );

  useEffect(() => {
    setIsUserLoading(true);
    getUser().then(() => setIsUserLoading(false));
  }, [getUser]);

  useEffect(() => {
    setIsLoading(true);
    userId && fetchRecipes(userId).then(() => setIsLoading(false));
  }, [fetchRecipes, userId]);

  useEffect(() => {
    return () => {
      dispatch(setClickedUserAction());
    };
  }, [dispatch]);

  const UserHeader = () => {
    if (isUserLoading) {
      return (
        <>
          <div className="UserAvatar loadingBox"></div>
          <div className="AccountPage__header--right">
            <div className="AccountPage__header--loading loadingBox"></div>
            <div className="AccountPage__header--loading loadingBox"></div>
          </div>
        </>
      );
    } else if (!isUserLoading && user) {
      return (
        <>
          <UserAvatar imgSrc={user?.avatar} />
          <div className="AccountPage__header--right">
            <p>Chef {user?.name}</p>
            <p>{recipesArray?.length} recettes publiées</p>
          </div>
        </>
      );
    } else {
      return <p>Une erreur est survenue...</p>;
    }
  };

  return (
    <div className="AccountPage">
      <div className="AccountPage__header">
        <UserHeader />
      </div>
      {error ? <p>Une erreur est survenue...</p> : <RecipesGrid recipes={recipesArray} isLoading={isLoading} />}
    </div>
  );
};

export default withRouter(AccountPage);
