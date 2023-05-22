import React, {useState, useEffect} from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Contacts from "./components/Contacts";
import { allUsersRoute, host } from "../utils/APIRoutes";
import Welcome from "./components/Welcome";
import ChatContainer from "./components/ChatContainer";
import { io } from "socket.io-client";

export default function Chat(){

  const navigate = useNavigate();

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
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
      }
    }
    UserLoginStatus();
  },[])
  useEffect(()=>{
    if(currentUser){
      if (currentUser.isAvatarImageSet) {
        const getUserData = async () => {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        }
        setContacts(getUserData.data.data);
      }
    }
  },[currentUser])


  //check for what user select from chats list and apply in `setCurrentChat`
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
  <Container>
      <>
      <Container>
        <div className="container">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <h1>the chat</h1>
            //<ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </div>
      </Container>
    </>
  </Container>)
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;