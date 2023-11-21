import React, { useState, useEffect } from "react";
import Select from "react-select";
import { ThreeDots } from "react-loader-spinner";
import { useQuery } from "@apollo/client";
import { USER_LIST } from "../utils/Queries/userQueries";
import { useParams, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";

export default function MessageSearch() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [userList, setUserList] = useState(null);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const { loading, data } = useQuery(USER_LIST);
  const { username } = useParams();
  const navigation = useNavigate();
  useEffect(() => {
    //   if (!loading) {
    //     const cleanList = data.users.map((obj) => {
    //       return {
    //         value: obj._id,
    //         label: obj.username,
    //       };
    //     });
    //     setUserList(cleanList);
    //   }
    // }, [loading]);
    const fetchData = async () => {
      try {
        const response = await fetchUserList(); // Assume you have a function to fetch user list
        const cleanList = response.data.users.map((obj) => ({
          value: obj._id,
          label: obj.username,
        }));
        setUserList(cleanList);
      } catch (error) {
        console.error("Error fetching user list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const handleInputChange = (inputValue) => {
    // Open the menu if the user starts typing
    setMenuIsOpen(!!inputValue);
  };
  const handleUserSelect = (selectedOption) => {
    setSelectedUser(selectedOption.label);
    navigation(`/messages/${selectedOption.label}`);
    setSelectedOption(null); // Clear the selected option
    setSelectedUser(""); // Clear the selected user
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: "200px",
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
  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   navigation(`/messages/${selectedUser}`);
  // };

  return (
    <form>
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
