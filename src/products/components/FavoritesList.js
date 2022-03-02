import React from "react";

import Card from "../../shared/components/UIElements/Card";
import FavoritesItem from "./FavoritesItem";
import "./FavoritesList.css";

const FavoriteList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="product-list center">
        <Card>
          <h2>No product found.</h2>
        </Card>
      </div>
    );
  }
  return (
    <ul className="favorite-list">
      {props.items.map((product) => (
        <FavoritesItem
          key={product._id}
          id={product._id}
          image={product.image}
          title={product.title}
          price={product.price}
          storeId={product.store}
          ownerId={product.owner}
          onDelete={props.onDeleteFavoritesList}
        />
      ))}
    </ul>
  );
};

export default FavoriteList;
