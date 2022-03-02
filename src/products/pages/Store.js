import React, { useState, useEffect, useContext } from "react";
import ProductList from "../components/ProductList";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Card from "../../shared/components/UIElements/Card";
import "./Store.css";
import Button from "../../shared/components/FormElements/Button";
const Store = () => {
  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [data, setData] = useState();
  const [favorites, setFavorites] = useState();
  const storeId = useParams().storeId;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/products/store/${storeId}`
        );

        setData(responseData);
      } catch (error) {}
    };
    fetchData();
    const items = localStorage.getItem("favorites");
    if (!items) {
      localStorage.setItem("favorites", JSON.stringify({ favorites: [] }));
    }
    const favorites = JSON.parse(
      localStorage.getItem("favorites")
    ).favorites.map((f) => f._id);
    console.log("Store Favorites", favorites);
    setFavorites(favorites);
  }, [sendRequest, storeId]);

  const productDeletedHandler = (deletedDataId) => {
    setData((prevData) => prevData.filter((data) => data.id !== deletedDataId));
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      <div className="center">
        <Card className="header-card">
          {!isLoading && data && (
            <div>
              <h2>{data.storeTitle}</h2>
              <p>{data.storeDescription}</p>
              {auth.userId === data.storeOwner && (
                <Button to={`/products/new/${storeId}`}>Add Product</Button>
              )}
            </div>
          )}
        </Card>
      </div>
      {!isLoading && data && (
        <ProductList
          items={data.products}
          favorites={favorites}
          onDeleteProduct={productDeletedHandler}
        />
      )}
    </React.Fragment>
  );
};

export default Store;
