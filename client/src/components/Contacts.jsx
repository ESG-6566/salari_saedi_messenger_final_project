import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logout from "./Logout";
import SetAvatarButton from "./SetAvatarButton";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  //get logined user data from localStorage
  useEffect(() => {
    const setUserDatat = async () => {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      setCurrentUserName(data.username);
      setCurrentUserImage(data.avatarImage);
    }
    setUserDatat();
  }, []);

  //selected user defining for click chat event
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return currentUserName && (
    <Container>
      <div className="header">
        <div className="current-user">
          <div className="avatar">
            <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt=""/>
          </div>
          <div className="username">
            <h2>{currentUserName}</h2>
          </div>
        </div>
        <div className="Button">
          <SetAvatarButton/>
        </div>
        <div className="Button">
          <Logout/>
        </div>
      </div>
      <div className="space"/>
      <div className="contacts">
          {contacts.map((contact,index)=>{
              return(
                <div className={`contact ${index === currentSelected ? "selected" : ""}`}
                  key={contact._id}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img src={`data:image/svg+xml;base64,${contact.avatarImage}`}alt=""/>
                  </div>
                  <div className="username">
                      <h3>{contact.username}</h3>
                  </div>
                </div>
              )
          })}
      </div>
      <div className="footer"/>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  flex-direction: column;
  overflow: hidden;
  background-color: #16697A;
  display: flex;
  min-width: 170px;

  .header{
    height: 50px;
    flex-direction: row;
    overflow: hidden;
    background-color: #16697A;
    display: grid;
    grid-template-columns: 50% 25% 25%;
    background-color: #489FB5;
    min-height: 50px;

    .current-user {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.3rem;
      .avatar {
        img {
          border-radius: 50% ;
          height: 3rem;
        }
      }
      .username {
        h2 {
          color: white;
        }
      }
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        gap: 0.5rem;
        .username {
          h2 {
            font-size: 1rem;
          }
        }
      }
    }
    .Button{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
    
  .space{
    height: 1px;
    width: 100%;
    background-color: #EDE7E3;
  }

  .contacts {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #489FB5;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #489FB5;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          border-radius: 50% ;
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #82C0CC;
      .username {
        h3 {
          color: black;
        }
      }
    }
  }
  
  .footer{
    height: 2px;
  }
`;