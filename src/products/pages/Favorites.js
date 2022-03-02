import React, { useState, useEffect, useContext } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import FavoriteList from "../components/FavoritesList";
const Favorites = () => {
  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [data, setData] = useState();
  useEffect(() => {
    const getData=async()=>{
      try {
        const responseData =await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/favorites/${auth.userId}`,
          "GET",
          null,
          {
            Authorization: "Bearer " + auth.token,
          }
        );
        setData(responseData.favorites);
        auth.setUserFavorites(responseData.favorites);
      } catch (error) {}
    }
    getData();
  }, [sendRequest, auth]);

  const favoritesDeletedHandler = (deletedDataId) => {
    const newData=data.filter((d) => d._id !== deletedDataId);
    console.log(newData)
    setData(newData);
    console.log("Data:",data)
    auth.setUserFavorites(newData);

  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && data && (
        <FavoriteList items={data} onDeleteFavoritesList={favoritesDeletedHandler} />

      )}
    </React.Fragment>
  );
};

export default Favorites;
