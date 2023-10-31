import React from "react";
import Create from "../components/Login/CreateTab.jsx";
import LoginTab from "../components/Login/LoginTab.jsx";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

function Login() {
  return (
    <div>
      <h2>Login or Create Tab</h2>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="one" label="Item One" />
        <Tab value="two" label="Item Two" />
        <Tab value="three" label="Item Three" />
      </Tabs>
    </div>
  );
}

export default Login;
