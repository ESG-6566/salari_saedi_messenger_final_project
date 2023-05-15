import axios from "axios";
//Axios is used to communicate with the backend
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
//The useNavigate hook returns a function that lets you navigate programmatically, in between pages

// import Logo from "../assets/logo.svg";
import Logo2 from "../assets/logo2.svg";
import { ToastContainer, toast } from "react-toastify";
//React-Toastify allows you to add notifications to your app with ease. No more nonsense!
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";

export default function Register() {

   const navigate = useNavigate();

   const toastOptions = {
      position: "bottom-right",
      autoClose: 8000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
   };
   //Defining options for `toastify` module

   const [values, setValues] = useState({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
   });

   // //The Effect Hook lets us perform side effects in function components
   // useEffect(() => {
   //    //navigate to chat page if values are true and sets on local storage and dont stay in register page
   //    localStorage.getItem("chat-app-user") && navigate("/");
   // }, []);

   const handleValidation = () => {
      //Checking the correctness of user inputs
      const { password, confirmPassword, username, email } = values;
      if (password !== confirmPassword) {
         toast.error("password and confirm password should be same.", toastOptions);
         return false;
      } else if (username.length < 3) {
         toast.error("Username should be greater than 3 characters.", toastOptions);
         return false;
      } else if (password.length < 8) {
         toast.error(
            "Password should be equal or greater than 8 characters.",
            toastOptions
         );
         return false;
      } else if (email === "") {
         toast.error("Email is required.", toastOptions);
         return false;
      }
      return true;
   };

   const handleSubmit = async (event) => {
      //react async is used in API calls
      
      event.preventDefault();

      if (handleValidation()) {
         const { email, username, password } = values;
         const { data } = await axios.post(registerRoute, {
            username,
            email,
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
                  <h1>Sign up</h1>
               </div>
               <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  onChange={(e) => handleChange(e)}
               />
               <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={(e) => handleChange(e)}
               />
               <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={(e) => handleChange(e)}
               />
               <input
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  onChange={(e) => handleChange(e)}
               />
               <button type="submit">Create User</button>
               <span>
                  Already have an account ?<Link to="/login"> Login</Link>
               </span>
            </form>
            <LogoField>
               <img src={Logo2} alt="logo" />
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
