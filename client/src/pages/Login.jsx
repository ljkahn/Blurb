import React, { useState, useEffect } from "react";
import Create from "../components/Login/CreateTab.jsx";
import LoginTab from "../components/Login/LoginTab.jsx";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "../style/Login.css";
import BlurbCard from "../components/Blurbs/BlurbCard.jsx";
import { TypeAnimation } from "react-type-animation";
import { useQuery } from "@apollo/client";
import { RANDOM_BLURB } from "../utils/Queries/queries.js";

function Login({ isRegistered }) {
  const [tabValue, setTabValue] = useState("login");
  const [blurb, setBlurb] = useState(null);
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const { loading, data } = useQuery(RANDOM_BLURB);
  useEffect(() => {
    if (!loading) {
      console.log(data.randomBlurb);
      setBlurb(data.randomBlurb);
    }
  }, [loading]);
  // const blurb = data?.randomBlurb || {
  //   blurbText: "placeholder",
  //   blurbAuthor: { username: "placeholder" },
  // };

  //if statement

  console.log(blurb);

  return (
    <>
      <div id="loginBlurb">
        {blurb && (
          <BlurbCard username={blurb.blurbAuthor.username}>
            <TypeAnimation
              sequence={[blurb.blurbText, 500, " "]}
              style={{ fontSize: "1rem" }}
              repeat={Infinity}
            />
          </BlurbCard>
        )}
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

          {tabValue === "login" && <LoginTab isRegistered={isRegistered} />}
          {tabValue === "create" && <Create isRegistered={isRegistered} />}
        </div>
      </div>
    </>
  );
}

export default Login;
