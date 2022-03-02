import React from "react";

import "./StoreList.css";
import StoreItem from "./StoreItem";
import Card from "../../shared/components/UIElements/Card";

const StoreList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No stores found.</h2>
        </Card>
      </div>
    );
  }
  return (
    <ul className="stores-list">
      {props.items.map((store) => (
        <StoreItem
          key={store.id}
          id={store.id}
          image={store.image}
          name={store.title}
          productCount={store.products.length}
        />
      ))}
    </ul>
  );
};

export default StoreList;
