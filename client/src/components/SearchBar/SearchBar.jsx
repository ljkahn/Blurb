import React, { useState, useEffect } from "react";
import Select from "react-select";
import { ThreeDots } from "react-loader-spinner";
import { useQuery } from "@apollo/client";
import { USER_LIST } from "../../utils/Queries/userQueries";
import { useParams, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";

export default function SearchBar() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [userList, setUserList] = useState(null);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");

  const { loading, data } = useQuery(USER_LIST);
  const { username } = useParams();
  const navigation = useNavigate();

  useEffect(() => {
    if (!loading) {
      const cleanList = data.users.map((obj) => {
        return {
          value: obj._id,
          label: obj.username,
        };
      });
      setUserList(cleanList);
    }
  }, [loading]);

  const handleInputChange = (inputValue) => {
    // Open the menu if the user starts typing
    setMenuIsOpen(!!inputValue);
  };

  const handleUserSelect = (selectedOption) => {
    setSelectedUser(selectedOption.label);
    navigation(`/profile/${selectedOption.label}`);
    setSelectedOption(null); // Clear the selected option
    setSelectedUser(""); // Clear the selected user
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: "225px",
      border: "1px solid #ced4da",
      boxShadow: "none",
      marginRight: "5px",
      borderRadius: "4px",
      "&:hover": {
        border: "1px solid #ced4da",
      },
    }),
    dropdownIndicator: () => ({ display: "none" }),
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    navigation(`/profile/${selectedUser}`);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      {!loading ? (
        <Select
          id="searchTxt"
          defaultValue={selectedOption}
          onChange={(selectedOption) => {
            setSelectedOption(selectedOption);
            handleUserSelect(selectedOption);
          }}
          onInputChange={handleInputChange}
          options={userList}
          menuIsOpen={menuIsOpen}
          isSearchable={true}
          styles={customStyles}
        />
      ) : (
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#F7E258"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      )}
    </form>
  );
}
