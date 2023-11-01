import React, { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Photo from "../Profile/ProfilePhoto";
import Test from "../Test.jsx"


function Create() {
  // State to control the visibility of the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h2>Create Profile</h2>
      <div>
        <TextField id="standard-basic" label="First Name" variant="standard" />
      </div>
      <div>
        <TextField id="standard-basic" label="Last Name" variant="standard" />
      </div>
      <div>
        <TextField id="standard-basic" label="Email" variant="standard" />
      </div>
      <div>
        <TextField id="standard-basic" label="Password" variant="standard" />
      </div>
      <div>
        <TextField id="standard-basic" label="Username" variant="standard" />
      </div>
      <Button
        style={{ margin: "1rem" }}
        variant="contained"
        disableElevation
        onClick={openModal}
      >
        Create Account
      </Button>

      {/* Modal for Photo Import */}
      <Modal
        id="photoModel"
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="photo-import-modal"
        aria-describedby="photo-import-description"
      >
        <div className="modal-content">
          <h2 id="photo-import-modal">Photo Import</h2>
          <Test />
        </div>
      </Modal>
    </div>
  );
}

export default Create;
