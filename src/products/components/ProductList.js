import React from "react";

import Card from "../../shared/components/UIElements/Card";
import ProductItem from "./ProductItem";
import "./ProductList.css";

const ProductList = (props) => {
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
    <ul className="product-list">
      {props.items.map((product) => (
        
        <ProductItem
          key={product.id}
          id={product.id}
          image={product.image}
          title={product.title}
          description={product.description}
          price={product.price}
          storeId={product.store}
          ownerId={product.owner}
          favorites={props.favorites}
          onDelete={props.onDeleteProduct}
        />
      ))}
    </ul>
  );
};

export default ProductList;
