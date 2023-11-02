import React, { useState } from "react";
import Create from "../components/Login/CreateTab.jsx";
import LoginTab from "../components/Login/LoginTab.jsx";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "../style/Login.css";
import BlurbCard from "../components/Blurbs/BlurbCard.jsx";
import { TypeAnimation } from "react-type-animation";

function Login() {
  const [tabValue, setTabValue] = useState("login");

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <div>
        <BlurbCard username="binx69">
          <TypeAnimation
            sequence={[
              "Spread",
              500,
              "Spread Those", //  Continuing previous Text
              500,
              "Spread Those Cheeks",
              500,
              " ",
            ]}
            style={{ fontSize: "1rem" }}
            repeat={Infinity}
          />
        </BlurbCard>
      </div>

      <div id="login">
        <div id="logBack">
          <h2>Login or Create</h2>
          <Tabs
            id="tabs"
            value={tabValue}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="Login or Create Tabs"
          >
            <Tab value="login" label="Login" />
            <Tab value="create" label="Create" />
          </Tabs>

          {tabValue === "login" && <LoginTab />}
          {tabValue === "create" && <Create />}
        </div>
      </div>
    </>
  );
}

export default Login;
