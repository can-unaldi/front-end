import React from "react";
import { Link } from "react-router-dom";

import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";
import "./StoreItem.css";

const StoreItem = (props) => {
  return (
    <li className="store-item">
      <Card className="store-item__content">
        <Link to={`/${props.id}/products`}>
          <div className="store-item__image">
            <Avatar image={props.image} alt={props.name} />
          </div>
          <div className="store-item__info">
            <h2>{props.name}</h2>
            <h3>
              {props.productCount} {props.productCount === 1 ? "Product" : "Products"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default StoreItem;
