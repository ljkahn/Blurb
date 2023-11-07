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
import { styled } from "@mui/material/styles";

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 70,
    width: "100%",
    backgroundColor: "#f7e258",
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(20),
    marginRight: theme.spacing(1),
    color: "rgba(255, 255, 255, 0.7)",
    "&.Mui-selected": {
      color: "#fff",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)",
    },
  })
);

function Login({ isRegistered }) {
  const [tabValue, setTabValue] = useState("login");
  const [blurb, setBlurb] = useState(null);
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const { loading, data } = useQuery(RANDOM_BLURB);
  useEffect(() => {
    if (!loading) {
      // console.log(data.randomBlurb);
      setBlurb(
        data
          ? data.randomBlurb
          : {
              blurbText: "placeholder",
              blurbAuthor: {
                username: "placeholder",
                profile: {
                  profilePic: "cld-sample-5",
                },
              },
            }
      );
    }
  }, [loading]);
  // const blurb = data?.randomBlurb || {
  //   blurbText: "placeholder",
  //   blurbAuthor: { username: "placeholder" },
  // };

  //if statement

  // console.log(blurb);

  console.log(data);
  return (
    <>
      <div id="loginBlurb">
        {blurb && (
          <BlurbCard
            username={blurb.blurbAuthor.username}
            profilePic={blurb.blurbAuthor.profile.profilePic}
          >
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
          {/* <h2>Login or Create</h2> */}
          <StyledTabs
            id="tabs"
            value={tabValue}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="Login or Create Tabs"
          >
            <StyledTab value="login" label="Login" />
            <StyledTab value="create" label="Create" />
          </StyledTabs>

          {tabValue === "login" && <LoginTab isRegistered={isRegistered} />}
          {tabValue === "create" && <Create isRegistered={isRegistered} />}
        </div>
      </div>
    </>
  );
}

export default Login;
