import React, { useEffect, useState } from "react";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import { useHttpClient } from "../../shared/hooks/http-hook";

import StoreList from "../components/StoreList";
const Stores = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/stores`);

        setData(responseData.stores);
      } catch (error) {
      }
    };
    fetchData();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && data && <StoreList items={data} />}
    </React.Fragment>
  );
};

export default Stores;