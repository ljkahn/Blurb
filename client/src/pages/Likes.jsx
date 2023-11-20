import Like from "../components/Notify/Notify";
import Nav from "../components/NavBar.jsx";
import React, { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useQuery } from "@apollo/client";
import { ALL_BLURBS } from "../utils/Queries/queries.js";
import auth from "../utils/auth.js";
import { QUERY_GET_NOTIFICATIONS } from "../utils/Queries/userQueries.js";

function Likes() {
  const { loading, error, data } = useQuery(QUERY_GET_NOTIFICATIONS);
  const notifyData = data;
  console.log("likes page", notifyData);

  return (
    <div>
      <Like></Like>
    </div>
  );
}

export default Likes;
