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
          onChange={setSelectedOption}
          onInputChange={handleInputChange}
          options={userList}
          menuIsOpen={menuIsOpen}
          isSearchable={true}
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

      <div id="button">
        {/* <button type="submit">Search</button> */}
        {/* <IconButton type="submit">
            <SearchIcon sx={{ fontSize: 40 }} />
          </IconButton> */}
      </div>
    </form>
  );
}
