import React, { lazy, Suspense } from "react";
import ErrorBoundary from "./ErrorBoundary";
import LoadingPage from "../pages/LoadingPage/LoadingPage";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/user/user-selectors";
import { Redirect, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

// console.log(HomePage);

// import HomePage from "./pages/HomePage/HomePage";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const RecipeDetailPage = lazy(() => import("../pages/RecipeDetailPage/RecipeDetailPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));
const AddRecipePage = lazy(() => import("../pages/AddRecipePage/AddRecipePage"));
const FavoritesPage = lazy(() => import("../pages/FavoritesPages/FavoritesPage"));
const AccountPage = lazy(() => import("../pages/AccountPage/AccountPage"));
const SettingsPage = lazy(() => import("../pages/SettingsPage/SettingsPage"));

const Routes = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingPage />}>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/recette/:id">
            <RecipeDetailPage />
          </Route>
          <Route path="/publier">
            <AddRecipePage />
          </Route>
          <Route path="/modifier">
            <AddRecipePage />
          </Route>
          <Route path="/favoris">
            <FavoritesPage />
          </Route>
          <Route path="/compte">
            <AccountPage />
          </Route>
          <Route path="/chef/:userid">
            <AccountPage />
          </Route>
          <Route path="/parametres">
            <SettingsPage />
          </Route>
          <Route path="/not-found">
            <NotFoundPage />
          </Route>
          <Redirect to="/not-found" />
        </Switch>
      </Suspense>
      {/* <Switch>
         {currentUser && (
           <>
             <Route path="/recette/:recette_id" component={RecipeDetailPage} />
           </>
         )}
         <Route path="/" component={HomePage} />
         <Route path="/not-found" component={NotFoundPage} />
         <Redirect to="/not-found" />
       </Switch>  */}
    </ErrorBoundary>
  );
};

export default Routes;
