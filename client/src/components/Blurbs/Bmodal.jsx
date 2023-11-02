import React from "react";
import Modal from "@mui/material/Modal";

function Bmodal() {
  return (
    <div>
      <Modal>
        <form>
          <TextField id="outlined-basic" label="Blurb" variant="outlined" />
          <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={age}
    label="Topic"
    onChange={handleChange}
  >
    <MenuItem value={10}>Why Jordan Is Cool</MenuItem>
    <MenuItem value={20}>Why Mitch Is Cool</MenuItem>
    <MenuItem value={30}>Why Lia Is Cool</MenuItem>
    <MenuItem value={30}>Why Pete is a Pedo</MenuItem>
  </Select>
        </form>
      </Modal>
    </div>
  );
}

export default Bmodal;
