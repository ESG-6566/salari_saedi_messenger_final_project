import React from "react";
import styled from "styled-components";

export { FormContainer };

const FormContainer = styled.div`
   height: 100vh;
   width: 100vw;
   display: flex;
   flex-direction: row;
   justify-content: center;
   align-items: center;
   background-color: #EDE7E3;

   form {
      justify-content: center;
      align-items: center;
      width: 50vw;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      padding: 3rem 5rem;
   }
   input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #489FB5;
      border-radius: 0.4rem;
      color: black;
      width: 100%;
      font-size: 1rem;
      &:focus {
         border: 0.1rem solid #FFA62B;
         outline: none;
      }
   }
   button {
      width: 100%;
      background-color: #489FB5;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      &:hover {
         background-color: #82C0CC;
      }
   }

   .profile-picture{
      width: 25%;
      height: 25%;
   }

   .change-avatar-button{
      padding: 0.5rem;
      background-color: #7DC9FF;
      width: 40%;
      margin-bottom: 10vh;
   }

   span {
      color: black;
      text-transform: uppercase;
      a {
         color: #489FB5;
         text-decoration: none;
         font-weight: bold;
      }
   }
`;