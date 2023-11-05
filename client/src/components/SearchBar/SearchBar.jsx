import React, { useState, useEffect } from "react";
import Select from "react-select";
import { ThreeDots } from "react-loader-spinner";
import { useQuery } from "@apollo/client";
import { USER_LIST } from "../../utils/Queries/userQueries";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

export default function SearchBar() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [userList, setUserList] = useState(null);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const { loading, data } = useQuery(USER_LIST);
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

  return (
    <>
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
          color="#4fa94d"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      )}
    </>
  );
}
