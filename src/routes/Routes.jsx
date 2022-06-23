import React, { lazy, Suspense } from "react";
import ErrorBoundary from "./ErrorBoundary";
import LoadingPage from "../pages/LoadingPage/LoadingPage";
import { Redirect, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

// console.log(HomePage);

import HomePage from "../pages/HomePage/HomePage";

// const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const RecipeDetailPage = lazy(() =>
  import("../pages/RecipeDetailPage/RecipeDetailPage")
);
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));
const AddRecipePage = lazy(() =>
  import("../pages/AddRecipePage/AddRecipePage")
);
const FavoritesPage = lazy(() =>
  import("../pages/FavoritesPages/FavoritesPage")
);
const AccountPage = lazy(() => import("../pages/AccountPage/AccountPage"));
const SettingsPage = lazy(() => import("../pages/SettingsPage/SettingsPage"));

const Routes = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingPage />}>
        <Switch>
          <ProtectedRoute exact path="/">
            <HomePage />
          </ProtectedRoute>
          <ProtectedRoute path="/recette/:id">
            <RecipeDetailPage />
          </ProtectedRoute>
          <ProtectedRoute path="/publier">
            <AddRecipePage />
          </ProtectedRoute>
          <ProtectedRoute path="/modifier">
            <AddRecipePage />
          </ProtectedRoute>
          <ProtectedRoute path="/favoris">
            <FavoritesPage />
          </ProtectedRoute>
          <ProtectedRoute path="/compte">
            <AccountPage />
          </ProtectedRoute>
          <ProtectedRoute path="/chef/:userid">
            <AccountPage />
          </ProtectedRoute>
          <ProtectedRoute path="/parametres">
            <SettingsPage />
          </ProtectedRoute>
          <ProtectedRoute path="/not-found">
            <NotFoundPage />
          </ProtectedRoute>
          <Redirect to="/not-found" />
        </Switch>
      </Suspense>
    </ErrorBoundary>
  );
};

export default Routes;
