import React, { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import CloudinaryUploadWidget from "../Upload";
import Photo from "../Profile/ProfilePhoto";

import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { ADD_USER } from "../../utils/mutations/userMutations";
import { useNavigate } from "react-router-dom";

function Create() {
  const navigation = useNavigate();
  // State to control the visibility of the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileImg, setProfileImg] = useState("");

  const [formState, setFormState] = useState({
    fullName: "",
    email: "",
    password: "",
    username: " ",
  });
  const [addUser, { error }] = useMutation(ADD_USER);
  if (error) {
    console.log(JSON.stringify(error));
  }

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: {
          username: formState.username,
          profile: {
            password: formState.password,
            email: formState.email,
            fullName: formState.fullName,
            profilePic: profileImg,
          },
        },
      });
      console.log(data);
      Auth.login(data.addUser.token, navigation);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Create Account</h2>
      <p>Add a profile picture, if you want!</p>
      <CloudinaryUploadWidget setProfileImg={setProfileImg} />
      <Photo profileImg={profileImg} />
      <form onSubmit={handleCreateSubmit}>
        <div>
          <TextField
            id="standard-basic"
            label="Full Name"
            variant="standard"
            name="fullName"
            type="text"
            value={formState.fullName}
            onChange={handleChange}
          />
        </div>
        {/* <div>
        <TextField id="standard-basic" label="Last Name" variant="standard" />
      </div> */}
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
        <div>
          <TextField
            id="standard-basic"
            label="Username"
            variant="standard"
            name="username"
            type="text"
            value={formState.username}
            onChange={handleChange}
          />
        </div>

        <Button
          style={{ margin: "1rem" }}
          variant="contained"
          disableElevation
          // onClick={openModal}
          type="submit"
        >
          Create Account
        </Button>
      </form>

    </div>
  );
}

export default Create;
