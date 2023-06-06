import React from "react";
import { useNavigate } from "react-router-dom";
import { RxExit } from "react-icons/rx";
import styled from "styled-components";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";

//logout button functionality defining
export default function Logout() {

  const navigate = useNavigate();

  // const handleClick = async () => {
  //   const id = await JSON.parse(
  //     localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
  //   )._id;
  //   const data = await axios.get(`${logoutRoute}/${id}`);
  //   if (data.status === 200) {
  //     localStorage.clear();
  //     navigate("/login");
  //   }
  // };

  const handleClick = async () => {
      localStorage.clear();
      navigate("/login");
    };

  return (
    <Button onClick={handleClick}>
      <RxExit />
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #82C0CC;
  border: none;
  cursor: pointer;
  svg {
  font-size: 1.5rem;
  color: #16697A;
    }
  &:hover {
    background-color: #EDE7E3;
  }
`;