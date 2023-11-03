import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations/userMutations";
import { useNavigate } from "react-router-dom";
import Auth from "../../utils/auth";

function LoginTab() {
  const navigation = useNavigate();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const [login, { error }] = useMutation(LOGIN_USER);
  if (error) {
    console.log(JSON.stringify(error));
  }

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(formState);

    try {
      const { data } = await login({
        variables: {
          email: formState.email,
          password: formState.password,
        },
      });
      console.log(data);
      Auth.login(data.login.token, navigation);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            id="standard-basic"
            label="Email"
            variant="standard"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            id="standard-basic"
            label="Password"
            variant="standard"
            name="password"
            type="password"
            value={formState.password}
            onChange={handleChange}
          />
        </div>
        <Button
          // style={{ margin: "1rem" }}
          variant="contained"
          disableElevation
          type="submit"
        >
          Login
        </Button>
      </form>
    </div>
  );
}

export default LoginTab;
