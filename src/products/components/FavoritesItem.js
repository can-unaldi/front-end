import React, { useContext } from "react";

import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import Avatar from "../../shared/components/UIElements/Avatar";

import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./FavoriteItem.css";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const ProductItem = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const deleteHandler = async () => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/favorites/${props.id}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      props.onDelete(props.id);
    //   history.push(`/favorites/${auth.userId}`);
    } catch (error) {}
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <li className="favorite-item">
        <Card className="favorite-item__content">
          <div className="favorite-item-a">
            <div className="favorite-item-left">
              <div className="favorite-item__image">
                <Avatar image={props.image} alt={props.title} />
              </div>
              <div className="favorite-item__info">
                <h2>{props.title}</h2>
              </div>
            </div>
            <div className="buttons">
              <Button danger onClick={deleteHandler}>
                Remove
              </Button>
            </div>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default ProductItem;
