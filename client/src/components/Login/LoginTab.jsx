import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function LoginTab() {
  return (
    <div>
      <h2>Login</h2>
      <div>
        <div>
          <TextField id="standard-basic" label="Username" variant="standard" />
        </div>
        <div>
          <TextField id="standard-basic" label="Password" variant="standard" />
        </div>
      </div>
      <Button
        style={{ margin: "1rem" }}
        variant="contained"
        disableElevation
      >
        Login
      </Button>
    </div>
  );
}

export default LoginTab;
