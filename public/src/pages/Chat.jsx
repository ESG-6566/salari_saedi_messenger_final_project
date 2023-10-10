import React, { useEffect, useState, useRef } from "react";
//`useRef` is a React Hook that lets you reference a value that’s not needed for rendering.
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";



/*the chat page*/
/*using contacts component to show contacts to user*/
/* using chatContainer component*/

export default function Chat() {
  const navigate = useNavigate();
  /* useRef has a property called "current" used to retrieve the value of the referenced object at any time
  while also accepting an initial value as an argument.
  You can change the value of a referenced object by updating the current value.*/
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  //check if user not loged or login data not stored in localStorage, then navigate to login page
  useEffect(async () => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
      //else get data and set on `setCurrentUser` varable
    } else {
      setCurrentUser(
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )
      );
    }
  }, []);

  //add user to socket.IO
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      // The Socket.IO API is inspired from the Node.js EventEmitter, which means you can emit events on one side and register listeners on the other
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  //geting datas of other users to show in contacts field
  useEffect(async () => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data.data);
      } else {
        navigate("/setAvatar");
      }
    }
  }, [currentUser]);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <>
      <Container>
        <div className="container">
        
          <Contacts contacts={contacts} changeChat={handleChatChange} />
         
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #757575;
  .container {
    height: 100vh;
    width: 100vw;
    background-color: #0B4F6C;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
