import React, { useState, useEffect } from "react";
import Select from "react-select";
import { ThreeDots } from "react-loader-spinner";
import { useQuery } from "@apollo/client";
import { USER_LIST } from "../utils/Queries/userQueries";
import { useParams, useNavigate } from "react-router-dom";

export default function MessageSearch() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [userList, setUserList] = useState(null);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Initialize loading state
  const { username } = useParams();
  const navigation = useNavigate();

  const { data } = useQuery(USER_LIST);

  useEffect(() => {
    if (data) {
      const cleanList = data.users.map((obj) => ({
        value: obj._id,
        label: obj.username,
      }));
      setUserList(cleanList);
      setLoading(false); // Set loading to false once user list is available
    }
  }, [data]);

  const handleInputChange = (inputValue) => {
    setMenuIsOpen(!!inputValue);
  };

  const handleUserSelect = (selectedOption) => {
    console.log("Selected User:", selectedOption.label); // Log the selected user's label
    setSelectedOption(selectedOption);
    navigation(`/messages/${selectedOption.label}`);
    setSelectedOption(null);
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

  return (
    <form>
      {loading ? (
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#F7E258"
          ariaLabel="three-dots-loading"
        />
      ) : (
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
      )}
    </form>
  );
}
