import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
import Robot2 from "../assets/Wallpaper.jpg";

//Welcom massage for new users
export default function Welcome() {
   const [userName, setUserName] = useState("");

   //geting user data to show in welcome message
   useEffect(async () => {
      setUserName(
         await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
            .username
      );
   }, []);

   return (
      <Container>
         <div className="circle-bg">
            <img src={Robot} alt="" />
            <div className="text">
               <h1>
                  Welcome, <span>{userName} !</span>
               </h1>
               <h3>Please select a chat to Start messaging.</h3>
            </div>
         </div>
      </Container>
   );
}

const Container = styled.div`
   border: 0.6rem solid #00000076;
   display: flex;
   justify-content: center;
   align-items: center;
   color: white;
   flex-direction: column;
   img {
      height: 20rem;
   }
   .text {
      background-image: url(${Robot2});
      font-bold: 2rem;
      font-size: large;
      background-size: cover;
      background-position: top;
      -webkit-background-clip: text;
      color: transparent;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
   }
   .circle-bg {
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      flex-direction: column;
      width: 50%;
      height: 70%;
      background: #00000076;
      border-radius: 50%;
      box-shadow: 0 0 45px -5px;
   }
`;
