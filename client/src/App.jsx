import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
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
import SearchBar from "./components/SearchBar/SearchBar";
import Auth from "./utils/auth";
import ForgotPassword from "./pages/ForgotPassword";
import FollowersListCom from "./components/Follow/FollowersListCom";
import ResetPassword from "./pages/ResetPassword";
import Followers from "./pages/FollowerList";
import FollowingList from "./pages/FollowingList";
import Messages from "./pages/Messages";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

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

const isLoggedIn = () => {
  return !!localStorage.getItem("id_token");
};

function App() {
  const [registered, isRegistered] = useState(Auth.getToken() ? true : false);

  return (
    <ApolloProvider client={client}>
      <Router>
        <Header registered={registered} isRegistered={isRegistered} />
        <Routes>
          {registered ? (
            <Route path="/" element={<Navigate to="/home" />} />
          ) : (
            <Route path="/" element={<Login isRegistered={isRegistered} />} />
          )}
          <Route path="/home" element={<Home />} />
          <Route path="/flame" element={<Flame />} />
          <Route
            path="/profile"
            element={
              registered ? <Profile registered={registered} /> : <Login />
            }
          />
          <Route path="/profile/:username" element={<UserProfile />} />
          <Route path="/followers/:userID" element={<Followers />} />
          <Route path="/following/:userID" element={<FollowingList />} />
          <Route path="*" element={<Error />} />
          <Route path="/likes" element={<Likes />} />
          <Route path="/comment" element={<CommentPage />} />
          <Route path="/blurb" element={<BlurbStream />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/messages/:username" element={<Messages />} />
        </Routes>
        {registered && <NavBar />}{" "}
      </Router>
    </ApolloProvider>
  );
}

export default App;
