import React, { useEffect, useState, useRef } from "react";
//`useRef` is a React Hook that lets you reference a value that’s not needed for rendering.
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Contacts from "../components/Contacts";
import { allUsersRoute, host } from "../utils/APIRoutes";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";

/*the chat page*/
/*using contacts component to show contacts to user*/
/* using chatContainer component*/

export default function Chat(){

  const navigate = useNavigate();
  const socket = useRef();

  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  
  const UserLoginStatus = async () => {
    //check if user not loged or login data not stored in localStorage, then navigate to login page
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
      //else get data and set on `setCurrentUser` varable
    } else{
      setCurrentUser(await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)));
    }
  }
  useEffect(()=>{
    UserLoginStatus();
  },[])

  //geting datas of other users to show in contacts field
  const getUserData = async () => {
    const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
    setContacts(data.data);
  }
  useEffect(()=>{
    if(currentUser){
      getUserData();
    }
  },[currentUser])


  //check for what user select from chats list and apply in `setCurrentChat`
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  useEffect(() => {
    if (currentUser) {
      /* useRef has a property called "current" used to retrieve the value of the referenced object at any time
      while also accepting an initial value as an argument.
      You can change the value of a referenced object by updating the current value.*/
      socket.current = io(host);
      // The Socket.IO API is inspired from the Node.js EventEmitter, which means you can emit events on one side and register listeners on the other
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);
  
  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} changeChat={handleChatChange} />
        {currentChat === undefined ? (
          <Welcome />
        ) : (
          <ChatContainer currentChat={currentChat}/>
        )}
      </div>
    </Container>
  )
}

const Container = styled.div`
  flex-direction: column;
  overflow: hidden;
  background-color: #16697A;
  align-items: center;
  height: 100vh;
  width: 100vw;

  .brand {
    width: 100vw;
    height: 2%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #16697A;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .container {
    height: 100%;
    width: 100vw;
    background-color: #16697A;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;