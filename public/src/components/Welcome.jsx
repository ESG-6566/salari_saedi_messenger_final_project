import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";


//Welcom massage for new users
export default function Welcome() {
  
  const [userName, setUserName] = useState("");

  //geting user data to show in welcome message
  useEffect(async () => {
    setUserName(
      await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      ).username
    );
  }, []);
  
  return (
    <Container>
   
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
border: .6rem solid #00000076;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
