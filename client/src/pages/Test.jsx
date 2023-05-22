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
import {LogoField} from "./components/Logo field"

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

  const randomAvatarAPI = "https://source.boringavatars.com/beam";
  //Geting random avatar picture from "api.multiavatar.com"
  const [avatars,setAvatars] = useState([]);
  //Hooks are a new addition in React 16.8. They let us use state and other React features without writing a class.
  const [isLoading,setIsLoading] = useState(true);
  const [selectedAvatar,setSelectedAvatar] = useState(undefined);

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
    <>
      <Container>
        <Form>
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            <img
              src={randomAvatarAPI}
              alt="avatar"
            />
          </div>
          <button className="get-image-button">choose picture</button>
          <button onClick={setProfilePicture} className="submit-btn">Set as Profile Picture</button>
          <ToastContainer />
        </Form>
        <LogoField/>
      </Container>
    </>
  )
}

const Form = styled.div`
  height: 100%;
  width: 50.6vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #white;
`;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #white;
  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: black;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    border: 0.4rem solid transparent;
    padding: 0.3rem;
    border-radius: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s ease-in-out;
    img {
      height: 6rem;
      transition: 0.5s ease-in-out;
    }
    
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  }
  .get-image-button {
    background-color: #A484FF;
    color: white;
    padding: 1rem 1rem;
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
  .submit-btn {
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
`;