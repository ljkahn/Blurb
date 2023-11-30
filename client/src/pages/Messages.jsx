import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import {
  GET_USER_MESSAGES,
  GET_CONVERSATION_MESSAGES,
} from "../utils/Queries/userQueries";
import io from "socket.io-client";
import MessageSearch from "../components/MessageSearch";

const socket = io();

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const { loading, error, data } = useQuery(GET_USER_MESSAGES, {
    variables: { userId: "currentUserId" },
  });

  useEffect(() => {
    if (selectedConversation) {
      // Fetch messages for the selected conversation
      client
        .query({
          query: GET_CONVERSATION_MESSAGES,
          variables: { conversationId: selectedConversation },
        })
        .then((result) => {
          setMessages(result.data.messages);
        })
        .catch((error) => {
          console.error("Error fetching messages:", error);
        });
    }
  }, [selectedConversation]);

  const handleSearch = () => {
    // Update the searchResults state with the fetched search results
    setSearchResults(searchUserData.searchResults);
  };

  const handleButtonClick = () => {
    console.log(
      "Before sendMessage. selectedConversation:",
      selectedConversation
    );
    sendMessage();
  };

  const handleConversationSelect = (conversationId) => {
    setSelectedConversation(conversationId);
  };

  const sendMessage = () => {
    console.log("Button clicked!");
    console.log("inputValue:", inputValue);
    console.log("selectedConversation:", selectedConversation);

    socket.emit("message", {
      text: inputValue,
      conversationId: selectedConversation,
    });

    setInputValue("");
  };

  return (
    <div>
      <h1>Messages</h1>
      <MessageSearch>
        <input
          type="text"
          placeholder="Search for users"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <ul>
          {searchResults.map((user) => (
            <li key={user.id} onClick={() => handleConversationSelect(user.id)}>
              {user.name}
            </li>
          ))}
        </ul>
      </MessageSearch>
      <ul>
        {data &&
          data.userConversations.map((conversation) => (
            <li
              key={conversation.id}
              onClick={() => handleConversationSelect(conversation.id)}
            >
              {conversation.title}
            </li>
          ))}
      </ul>
      <div>
        {selectedConversation && (
          <>
            <h2>Conversation Messages</h2>
            <ul>
              {messages.map((message) => (
                <li key={message.id}>{message.text}</li>
              ))}
            </ul>
          </>
        )}
      </div>
      <input
        type="text"
        placeholder="Enter your message"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleButtonClick}>Send</button>
    </div>
  );
};

export default Messages;
