import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as React from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { useMutation } from "@apollo/client";
import { ADD_Blurb } from "../../utils/mutations/Blurb/BlurbMutations";
import { QUERY_MY_PROFILE } from "../../utils/Queries/userQueries";
import { ALL_BLURBS } from "../../utils/Queries/queries";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";




const customTheme = (outerTheme) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiFormControl: {
        styleOverrides: {
          root: {
            "--FormControl-brandBorderColor": "#E0E3E7",
            "--FormControl-brandBorderHoverColor": "#B2BAC2",
            "--FormControl-brandBorderFocusedColor": "#f7e258",
            "& label.Mui-focused": {
              color: "var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "--TextField-brandBorderColor": "#E0E3E7",
            "--TextField-brandBorderHoverColor": "#B2BAC2",
            "--TextField-brandBorderFocusedColor": "#f7e258",
            "& label.Mui-focused": {
              color: "var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            "--FormControl-brandBorderColor": "#E0E3E7",
            "--FormControl-brandBorderHoverColor": "#B2BAC2",
            "--FormControl-brandBorderFocusedColor": "#f7e258",
            "& label.Mui-focused": {
              color: "var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: "var(--TextField-brandBorderColor)",
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderHoverColor)",
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            "&:before, &:after": {
              borderBottom: "2px solid var(--TextField-brandBorderColor)",
            },
            "&:hover:not(.Mui-disabled, .Mui-error):before": {
              borderBottom: "2px solid var(--TextField-brandBorderHoverColor)",
            },
            "&.Mui-focused:after": {
              borderBottom:
                "2px solid var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            "&:before": {
              borderBottom: "2px solid var(--TextField-brandBorderColor)",
            },
            "&:hover:not(.Mui-disabled, .Mui-error):before": {
              borderBottom: "2px solid var(--TextField-brandBorderHoverColor)",
            },
            "&.Mui-focused:after": {
              borderBottom:
                "2px solid var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
    },
  });

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

export default function AddBlurb({ setIsModalOpen }) {
  const theme = useTheme();
  const outerTheme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [blurbText, setBlurbText] = React.useState("");

  const [addBlurb] = useMutation(ADD_Blurb, {
    refetchQueries: [{ query: ALL_BLURBS }],
  });

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    const newSelection = typeof value === "string" ? value.split(",") : value;

    if (newSelection.length <= 3) {
      setPersonName(newSelection);
    } else {
      console.warn("You can only select up to 3 tags");
    }
  };

  const handlePostClick = () => {
    // Get the user's input and selected tags
    const inputValue = blurbText;
    const selectedTags = personName;

    // Call the mutation to add the blurb
    addBlurb({
      variables: { blurbText: inputValue, tags: selectedTags },
      refetchQueries: [{ query: QUERY_MY_PROFILE }, { query: ALL_BLURBS }],
    })
      .then((response) => {
        // Handle the response, e.g., show a success message
        console.log("Blurb added successfully:", response);
        setIsModalOpen(false);
      })
      .catch((error) => {
        // Handle the error, e.g., show an error message
        console.error("Error adding blurb:", error);
      });
  };

  return (
    <form id="blForm">
      <ThemeProvider theme={customTheme(outerTheme)}>
        <TextField
          id="outlined-basic"
          label="Blurb"
          variant="outlined"
          value={blurbText}
          onChange={(e) => setBlurbText(e.target.value)}
        />
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-chip-label">Tags</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Tags" />}
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
          className="modalButton"
          style={{ margin: ".5rem" }}
          variant="contained"
          disableElevation
          onClick={handlePostClick}
        >
          Post
        </Button>
      </ThemeProvider>
    </form>
  );
}
