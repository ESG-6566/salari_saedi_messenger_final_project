import axios from "axios";
//Axios is used to communicate with the backend
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
//The useNavigate hook returns a function that lets you navigate programmatically, in between pages
import { ToastContainer, toast } from "react-toastify";
//React-Toastify allows you to add notifications to your app with ease. No more nonsense!
import "react-toastify/dist/ReactToastify.css";
import loader from "../assets/loader.gif"
import {setAvatarRoute} from "../utils/APIRoutes"
import {Buffer} from "buffer";
import {LogoField} from "./components/Logo field";
//a cpmponent for showing application Logo
import {FormContainer} from "./components/User data field style";
//a style cpmponent for user inputs form
import normalPicture from "../assets/pexels.jpg";

export default function SetAvatar() {

  const navigate = useNavigate();

  const toastOptions = {
    //Defining options for `toastify` module
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
 };

  const randomAvatarAPI = `https://source.boringavatars.com/beam`;
  //Geting random avatar picture from "api.multiavatar.com"
  const [avatars,setAvatars] = useState([]);
  //Hooks are a new addition in React 16.8. They let us use state and other React features without writing a class.
  const [isLoading,setIsLoading] = useState(true);
  const [selectedAvatar,setSelectedAvatar] = useState(undefined);

  const changeAvatarHandler = async (event) => {
    randomAvatarAPI = `https://source.boringavatars.com/beam`;
  }

  const setProfilePicture = async () => {
    //react async is used in API calls
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );

      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(user)
        );
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  };

  useEffect(async () => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const image = await axios.get(
        `${randomAvatarAPI}/${Math.round(Math.random() * 1000)}`
      );
      const buffer = new Buffer(image.data);
      data.push(buffer.toString("base64"));
    }
    setAvatars(data);
    setIsLoading(false);
  }, []);
  
  return (

    <FormContainer>
      <form>
        <div className="title-container">
          <h1>Profile picture</h1>
        </div>
        <img className="profile-picture"
          src={normalPicture}
          alt="avatar"
        />
        
        <button 
          className="change-avatar-button"
          onClick={changeAvatarHandler}
          >change picture
        </button>
        
        <button onClick={setProfilePicture} className="submit-btn">Set as Profile Picture</button>
        <ToastContainer />
      </form>
      <LogoField/>
    </FormContainer>

  )
}