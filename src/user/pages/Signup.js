import React, { useContext } from "react";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";

import { AuthContext } from "../../shared/context/auth-context";
import "./Signup.css";

const Signup = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
      type: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const signupSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
        "POST",
        JSON.stringify({
          name: formState.inputs.name.value,
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
          type: formState.inputs.type.value === "true" ? true : false,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      auth.login(
        responseData.userId,
        responseData.token,
        responseData.userType
      );
    } catch (error) {}
    console.log(formState.inputs);
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        <h2>Signup</h2>
        <hr />
        {isLoading && <LoadingSpinner asOverlay />}
        <form onSubmit={signupSubmitHandler}>
          <Input
            element="input"
            id="name"
            type="text"
            label="Your Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid name."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="email"
            type="email"
            label="E-mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid Email adress."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password."
            onInput={inputHandler}
          />
          <Input
            element="select"
            id="type"
            name="type"
            label="User Type"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid user type."
            onInput={inputHandler}
            initialValue="disabled"
            initialValid={false}
          />
          <Button type="submit" disabled={!formState.isValid}>
            Signup
          </Button>
        </form>
        <hr />
        <h3>If you are signup already</h3>
        <Button to="/login">Let's Login</Button>
      </Card>
    </React.Fragment>
  );
};

export default Signup;
