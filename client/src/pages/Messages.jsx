import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_USER_MESSAGES,
  GET_CONVERSATION_MESSAGES,
  SEND_MESSAGE,
} from "../utils/Queries/userQueries";
import io from "socket.io-client";

const socket = io();

const Messages = () => {
  // State to manage selected conversation and its messages
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);

  // Query to get user conversations
  const { loading, error, data } = useQuery(GET_USER_CONVERSATIONS, {
    variables: { userId: "currentUserId" },
  });

  // Function to handle conversation selection
  const handleConversationSelect = (conversationId) => {
    // Set the selected conversation
    setSelectedConversation(conversationId);

    // Fetch messages for the selected conversation
    // You need to replace 'GET_CONVERSATION_MESSAGES' with the actual query to get messages for a conversation
    const { data: conversationData } = useQuery(GET_CONVERSATION_MESSAGES, {
      variables: { conversationId },
    });

    // Update the messages state with the fetched messages
    setMessages(conversationData.messages);
  };

  // Function to send a message
  const sendMessage = () => {
    socket.emit("message", {
      text: inputValue,
      conversationId: selectedConversation, // Include the conversation ID in the message
    });

    setInputValue("");
  };

  return (
    <div>
      <h1>Real-Time Chat App</h1>

      {/* Display a list of user conversations */}
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

      {/* Display selected conversation messages */}
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

      {/* Input for sending messages */}
      <input
        type="text"
        placeholder="Enter your message"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Messages;
