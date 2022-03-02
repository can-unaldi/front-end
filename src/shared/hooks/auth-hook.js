import { useEffect, useState, useCallback } from "react";

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExperationDate, setExpirationDate] = useState();
  const [userId, setUserId] = useState(null);
  const [userType, setUserType] = useState(null);

  const setUserFavorites = useCallback((favorites) => {
    localStorage.removeItem("favorites");
    localStorage.setItem(
      "favorites",
      JSON.stringify({
        favorites: favorites,
      })
    );
  }, []);

  const login = useCallback((uid, token, uType, experationDate) => {
    setToken(token);
    setUserId(uid);
    setUserType(uType);
    const tokenExperationDate =
      experationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setExpirationDate(tokenExperationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        userType: uType,
        experation: tokenExperationDate.toISOString(),
      })
    );
    localStorage.setItem(
      "favorites",
      JSON.stringify({favorites:[]})
    );
  }, []);
  const logout = useCallback(() => {
    setToken(null);
    setExpirationDate(null);
    setUserId(null);
    setUserType(null);
    localStorage.removeItem("userData");
    localStorage.removeItem("favorites");

  }, []);

  useEffect(() => {
    if (token && tokenExperationDate) {
      const remainingTime =
        tokenExperationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExperationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.experation) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        storedData.userType,
        new Date(storedData.experation)
      );
    }
  }, [login]);

  return {
    token,
    login,
    logout,
    userId,
    userType,
    setUserFavorites,
  };
};
