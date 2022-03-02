import React from "react";

import "./ProfileList.css";
import ProfileItem from "./ProfileItem";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";

const ProfileList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No stores found.</h2>
          <Button to="/stores/new">Create Store</Button>
        </Card>
      </div>
    );
  }
  return (
    <React.Fragment>
      <ul className="profile-list">
        {props.items.map((store) => (
          <ProfileItem
            key={store.id}
            id={store.id}
            image={store.image}
            name={store.title}
            productCount={store.products.length}
            onDelete={props.onDeleteStore}
          />
        ))}
      </ul>
      <div className="center">
        <Button to="/stores/new">Create Store</Button>
      </div>
    </React.Fragment>
  );
};

export default ProfileList;
