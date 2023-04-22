import axios from "axios";
//Axios is used to communicate with the backend
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
//The useNavigate hook returns a function that lets you navigate programmatically, in between pages

// import Logo from "../assets/logo.svg";
import Logo2 from "../assets/logo2.svg";
//import styles from '../mystyle.module.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";

export default function Login() {
   const navigate = useNavigate();

   const toastOptions = {
      position: "bottom-right",
      autoClose: 8000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
   };

   const [values, setValues] = useState({
      username: "",
      password: "",
   });

   //The Effect Hook lets us perform side effects in function components
   useEffect(() => {
      //navigate to chat page if values are true and sets on local storage and dont stay in login
      localStorage.getItem("chat-app-user") && navigate("/");
   }, []);

   const handleValidation = () => {
      //Checking the correctness of user inputs
      const { password, username } = values;
      if (password === "") {
         toast.error("Username and password required.", toastOptions);
         return false;
      } else if (username.length === "") {
         toast.error("Username and password required.", toastOptions);
         return false;
      }
      return true;
   };

   const handleSubmit = async (event) => {
      event.preventDefault();

      if (handleValidation()) {
         //  console.log("in validation", loginRoute);
         const { username, password } = values;
         const { data } = await axios.post(loginRoute, {
            username,
            password,
         });
         if (data.status === false) toast.error(data.message, toastOptions);
         if (data.status === true) {
            localStorage.setItem("chat-app-user", JSON.stringify(data.user));
            // The JSON.stringify() static method converts a JavaScript value to a JSON string,
            // optionally replacing values if a replacer function is specified or optionally including only the specified properties if a replacer array is specified.
            navigate("/");
            //navigat to chat page
         }
      }
   };

   const handleChange = (event) => {
      setValues({ ...values, [event.target.name]: event.target.value });
   };

   return (
      <React.Fragment>
         <FormContainer>
            <form onSubmit={(event) => handleSubmit(event)}>
               <div className="nrand">
                  <h1>Login</h1>
               </div>
               <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  onChange={(e) => handleChange(e)}
                  min="3"
               />
               <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={(e) => handleChange(e)}
               />
               <button type="submit">Enter</button>
               <span>
                  Don't have an account ?<Link to="./register"> Sign in</Link>
               </span>
            </form>
            <LogoField>
               <img src={Logo2} alt="Logo" />
            </LogoField>
         </FormContainer>
         <ToastContainer />
      </React.Fragment>
   );
}

const LogoField = styled.div`
   height: 100%;
   width: 100%;
   background-color: #0094ff;
   justify-content: center;
   align-items: center;
   img {
      margin: 30vh;
   }
`;

const FormContainer = styled.div`
   height: 100vh;
   width: 100vw;
   display: flex;
   flex-direction: row;
   justify-content: center;
   align-items: center;
   background-color: #white;
   .brand {
      display: flex;
      align-items: center;
      gap: 1rem;
      justify-content: center;
      img {
         height: 5rem;
      }
      h1 {
         color: white;
         text-transform: uppercase;
      }
   }

   form {
      width: 50vw;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      background-color: #white;
      padding: 3rem 5rem;
   }
   input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #0094ff;
      border-radius: 0.4rem;
      color: black;
      width: 100%;
      font-size: 1rem;
      &:focus {
         border: 0.1rem solid #997af0;
         outline: none;
      }
   }
   button {
      background-color: #0094ff;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      &:hover {
         background-color: #4e0eff;
      }
   }
   span {
      color: black;
      text-transform: uppercase;
      a {
         color: #blue;
         text-decoration: none;
         font-weight: bold;
      }
   }
`;
