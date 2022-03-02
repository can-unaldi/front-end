import React, { useState, useContext } from "react";
import Button from "../../shared/components/FormElements/Button";

import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";
import Modal from "../../shared/components/UIElements/Modal";
import "./ProfileItem.css";

import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const ProfileItem = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const openDeleteModalHandler = () => setShowConfirmModal(true);
  const closeDeleteModalHandler = () => setShowConfirmModal(false);

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/stores/${props.id}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      props.onDelete(props.id);
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
            <Button onClick={closeDeleteModalHandler}>
              Cancel
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              Delete
            </Button>
          </React.Fragment>
        }
      >
        <p>Are you sure? It can't bu undone!</p>
      </Modal>
      {isLoading && <LoadingSpinner asOverlay />}
      <li className="profile-item">
        <Card className="profile-item__content">
          <div className="profile-item-a" to={`/${props.id}/products`}>
            <div className="profile-item-left">
              <div className="profile-item__image">
                <Avatar image={props.image} alt={props.name} />
              </div>
              <div className="profile-item__info">
                <h2>{props.name}</h2>
                <h3>
                  {props.productCount}{" "}
                  {props.productCount === 1 ? "Product" : "Products"}
                </h3>
              </div>
            </div>
            <div className="buttons">
              <Button to={`/products/new/${props.id}`} inverse>Add Product</Button>
              <Button to={`/${props.id}/products`} inverse >See/Edit Products</Button>
              <Button to={`/stores/update/${props.id}`} inverse>Edit Shop</Button>
              <Button danger onClick={openDeleteModalHandler}>
                Delete
              </Button>
            </div>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default ProfileItem;
