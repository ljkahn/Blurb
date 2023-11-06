import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { useMutation } from "@apollo/client";
import { ADD_Blurb } from "../../utils/mutations/Blurb/BlurbMutations";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const tags =
  "FUNNY INSPIRATIONAL LIFE LOVE NATURE TRAVEL MUSIC FITNESS FOOD ART TECH SPORTS HEALTH FASHION BEAUTY SCIENCE EDUCATION POLITICS BUSINESS PHOTOGRAPHY".split(
    " "
  );

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function AddBlurb() {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [blurbText, setBlurbText] = React.useState("");

  const [addBlurb] = useMutation(ADD_Blurb);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  const handlePostClick = () => {
    // Get the user's input and selected tags
    const inputValue = blurbText;
    const selectedTags = personName;

    // Call the mutation to add the blurb
    addBlurb({
      variables: { blurbText: inputValue, tags: selectedTags },
    })
      .then((response) => {
        // Handle the response, e.g., show a success message
        console.log("Blurb added successfully:", response);
      })
      .catch((error) => {
        // Handle the error, e.g., show an error message
        console.error("Error adding blurb:", error);
      });
  };


  return (
    <form id="blForm">
      <TextField
        id="outlined-basic"
        label="Blurb"
        variant="outlined"
        value={blurbText}
        onChange={(e) => setBlurbText(e.target.value)}
      />
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {tags.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        style={{ margin: ".5rem" }}
        variant="contained"
        disableElevation
        onClick={handlePostClick}
      >
        Post
      </Button>
    </form>
  );
}
