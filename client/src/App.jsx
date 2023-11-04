import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import React, { useState, useEffect } from "react";
import "./index.css";
import BlurbStream from "./components/Blurbs/BlurbCard";
import Notifications from "./pages/Notifications";
import Flame from "./pages/Flame";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import UserProfile from "./pages/UserProfile";
import Likes from "./pages/Likes";
import CommentPage from "./pages/CommentPage";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});
console.log(httpLink);

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/flame" element={<Flame />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:username" element={<UserProfile />} />
          <Route path="*" element={<Error />} />
          <Route path="/likes" element={<Likes />} />
          <Route path="/comment" element={<CommentPage />} />
          <Route path="/blurb" element={<BlurbStream />} />
        </Routes>
        <NavBar />
      </Router>
    </ApolloProvider>
  );
}

export default App;
