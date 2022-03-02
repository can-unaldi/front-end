import React, { useEffect, useState, useContext } from "react";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

import ProfileList from "../components/ProfileList";

const Profile = () => {
  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/stores/user/${auth.userId}`);
        setData(responseData.stores);
      } catch (error) {
      }
    };
    fetchData();
  }, [sendRequest, auth.userId]);

  const storeDeletedHandler = (deletedDataId) => {
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
      {!isLoading && data && <ProfileList items={data} onDeleteStore={storeDeletedHandler} />}
    </React.Fragment>
  );
};

export default Profile;