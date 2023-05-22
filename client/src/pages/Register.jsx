import axios from "axios";
//Axios is used to communicate with the backend
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
//The useNavigate hook returns a function that lets you navigate programmatically, in between pages
// import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
//React-Toastify allows you to add notifications to your app with ease. No more nonsense!
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";
import {LogoField} from "./components/Logo field";
//a cpmponent for showing application Logo
import {FormContainer} from "./components/User data field style";
//a style cpmponent for user inputs form

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

   //The Effect Hook lets us perform side effects in function components
   useEffect(() => {
      //navigate to chat page if values are true and sets on local storage and dont stay in register page
      if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
        navigate("/");
      }
    }, []);

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
            localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, JSON.stringify(data.user));
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
            <LogoField/>
         </FormContainer>
         <ToastContainer />
      </React.Fragment>
   );
}