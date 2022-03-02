import React, { useState, useContext, useEffect } from "react";

import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import Modal from "../../shared/components/UIElements/Modal";

import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./ProductItem.css";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const ProductItem = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { favorites, id } = props;
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [favoriteStatus, setFavoriteStatus] = useState(false);
  const openDeleteModalHandler = () => setShowConfirmModal(true);
  const closeDeleteModalHandler = () => setShowConfirmModal(false);

  useEffect(() => {
    const checkfavorite = async () => {
      setFavoriteStatus(favorites.includes(id));
    };
    checkfavorite();
  }, [favorites, id]);

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/product/${props.id}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      props.onDelete(props.id);
    } catch (error) {}
  };

  const addFavorite = async () => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/favorites/${id}`,
        "POST",
        null,
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      setFavoriteStatus(true);
      auth.setUserFavorites(responseData.favorites);
    } catch (error) {}
  };

  const removeFavorite = async () => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/favorites/${id}`,
        "DELETE",
        null,
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      setFavoriteStatus(false);
      auth.setUserFavorites(responseData.favorites);
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showConfirmModal}
        onCancel={closeDeleteModalHandler}
        header="Are you sure?"
        footerClass="product-item__modal-actions"
        footer={
          <React.Fragment>
            <Button onClick={closeDeleteModalHandler}>Cancel</Button>
            <Button danger onClick={confirmDeleteHandler}>
              Delete
            </Button>
          </React.Fragment>
        }
      >
        <p>Are you sure? It can't bu undone!</p>
      </Modal>
      <li className="product-item">
        <Card className="product-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="product-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="product-item__info">
            <h2>{props.title}</h2>
            <h3>{props.price}$</h3>
            <p>
              {props.description.slice(0, 20)}
              {props.description.length > 20 ? "..." : ""}
            </p>
          </div>
          <div className="product-item__actions">
            {favoriteStatus && auth.userId && (
              <Button danger onClick={removeFavorite}>Remove from Favorites</Button>
            )}
            {!favoriteStatus && auth.userId && (
              <Button onClick={addFavorite}>Add to Favorites</Button>
            )}
            {auth.userId === props.ownerId && (
              <Button to={`/products/${props.id}`}>Edit</Button>
            )}
            {auth.userId === props.ownerId && (
              <Button danger onClick={openDeleteModalHandler}>
                Delete
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default ProductItem;
