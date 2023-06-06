import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineCamera } from "react-icons/ai";

//setAvatarButton button functionality defining
export default function SetAvatarButton() {

const navigate = useNavigate();

const handleClick = async () => {
  navigate("/setAvatar");
  };

return (
  <Button onClick={handleClick}>
    <AiOutlineCamera/>
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