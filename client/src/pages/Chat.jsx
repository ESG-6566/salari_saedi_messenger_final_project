import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Contacts from "../components/Contacts";
import { allUsersRoute, host } from "../utils/APIRoutes";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";

export default function Chat(){

  const navigate = useNavigate();
  const socket = useRef();

  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  
  useEffect(()=>{
    const UserLoginStatus = async () => {
      //check if user not loged or login data not stored in localStorage, then navigate to login page
      if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
        navigate("/login");
        //else get data and set on `setCurrentUser` varable
      } else{
        setCurrentUser(await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)));
      }
    }
    UserLoginStatus();
  },[])

  //geting datas of other users to show in contacts field
  useEffect(()=>{
    if(currentUser){
      const getUserData = async () => {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data.data);
      }
      getUserData();
    }
  },[currentUser])


  //check for what user select from chats list and apply in `setCurrentChat`
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  
  return (
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
    : 100%height;
    width: 100vw;
    background-color: #16697A;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;