import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Stores from "./store/pages/Stores";
import Profile from "./store/pages/Profile";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Store from "./products/pages/Store";
import UpdateProduct from "./products/pages/UpdateProduct";
import UpdateStore from "./store/pages/UpdateStore";

import Login from "./user/pages/Login";
import Signup from "./user/pages/Signup";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import NewProduct from "./products/pages/NewProduct";
import NewStore from "./store/pages/NewStore";
import Favorites from "./products/pages/Favorites";

const App = () => {
  const {
    token,
    login,
    logout,
    userId,
    userType,
    setUserFavorites,
    favorites,
  } = useAuth();

  let routes;
  if (token && !userType) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Stores />
        </Route>
        <Route path="/:storeId/products" exact>
          <Store />
        </Route>
        <Route path="/favorites/:userId" exact>
          <Favorites />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else if (token && userType) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Stores />
        </Route>
        <Route path="/:storeId/products" exact>
          <Store />
        </Route>
        <Route path={`/profile/${userId}`} exact>
          <Profile />
        </Route>
        <Route path="/favorites/:userId" exact>
          <Favorites />
        </Route>
        <Route path="/products/new/:storeId" exact>
          <NewProduct />
        </Route>
        <Route path="/stores/new" exact>
          <NewStore />
        </Route>
        <Route path="/products/:productId" exact>
          <UpdateProduct />
        </Route>
        <Route path="/stores/update/:storeId" exact>
          <UpdateStore />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Stores />
        </Route>
        <Route path="/:storeId/products" exact>
          <Store />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <Redirect to="/login" />
      </Switch>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        userType: userType,
        login: login,
        logout: logout,
        setUserFavorites: setUserFavorites,
        favorites: favorites,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
