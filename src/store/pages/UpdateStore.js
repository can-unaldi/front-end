import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./StoreForm.css";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { AuthContext } from "../../shared/context/auth-context";

const UpdateStore = () => {
  const auth=useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedData, setLoadedData] = useState();
  const storeId = useParams().storeId;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/stores/${storeId}`
        );
        setLoadedData(responseData.store);
        setFormData(
          {
            title: {
              value: responseData.store.title,
              isValid: true,
            },
            description: {
              value: responseData.store.description,
              isValid: true,
            },
          },
          false
        );
      } catch (error) {}
    };
    fetchData();
  }, [sendRequest, storeId, setFormData]);

  const storeUpdateSubmitHandler =async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/stores/${storeId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
          "Authorization":"Bearer "+auth.token
        }
      );
      history.push(`/profile/${auth.userId}/`);
    } catch (error) {}

  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedData && !error) {
    return (
      <div className="center">
        <Card>
          <h2 className="center">Cannot find store.</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedData && <form className="store-form" onSubmit={storeUpdateSubmitHandler}>
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter valid title."
          onInput={inputHandler}
          initialValue={loadedData.title}
          initialValid={true}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter valid description."
          onInput={inputHandler}
          initialValue={loadedData.description}
          initialValid={true}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Update
        </Button>
      </form>}
    </React.Fragment>
  );
};

export default UpdateStore;
