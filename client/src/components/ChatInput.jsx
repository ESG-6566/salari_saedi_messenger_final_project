import React, { useState } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import Smiley from "../assets/Smiley.svg"
import SendIcon from "../assets/PaperPlaneRight.svg"
import { Theme } from 'emoji-picker-react';

export default function ChatInput(/*{ handleSendMsg: handleSend }*/) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
  //in UI handleEmojiPickerhideShow
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  //in UI handleEmojiClick
  const handleEmojiClick = (emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  
  const sendChat = (event) => {
    alert(msg)
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
  }
  
  return (
    <Container>
      <div className="pickerStyle">
        {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick}
          
        />}
      </div>
      <div className="button-container">
        <div className="emoji">
          <EmojiButton onClick={handleEmojiPickerhideShow}>
            <img src={Smiley} alt=""/>
          </EmojiButton>
        </div>
      </div>
      <form className="input-container" onSubmit={(event) => {sendChat(event)}}>
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
      </form>
      <button type="submit" onClick={(event) => {sendChat(event)}}>
        <img src={SendIcon} alt=""/>
      </button>
    </Container>
  );
}

const EmojiButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  img{
    width: 2vw;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  //background-color: #489FB5;
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .pickerStyle{
    // position: fixed;
    // left: 10%;
    // bottom: 10%;
    margin-bottom: 400px;
  }
  Picker {
    position: absolute;
    top: -350px;
    background-color: #080420;
    box-shadow: 0 5px 10px #9a86f3;
    border-color: #9a86f3;
    .emoji-scroll-wrapper::-webkit-scrollbar {
      background-color: #080420;
      width: 5px;
      &-thumb {
        background-color: #9a86f3;
      }
    }
    .emoji-categories {
      button {
        filter: contrast(0);
      }
    }
    .emoji-search {
      background-color: transparent;
      border-color: #9a86f3;
    }
    .emoji-group:before {
      background-color: #080420;
    }
  }
  
  .button-container {
    width: 5vw;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    gap: 1rem;
    /* .emoji {
      //   .emoji-picker-react {
      // position: absolute;
      // position: fixed;
      // left: 30%;
      // bottom: 30%;
      // top: -350px;
      background-color: #080420;
      box-shadow: 0 5px 10px #9a86f3;
      border-color: #9a86f3;
      .emoji-scroll-wrapper::-webkit-scrollbar {
        background-color: #080420;
        width: 5px;
        &-thumb {
          background-color: #9a86f3;
        }
      }
      .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .emoji-group:before {
          background-color: #080420;
        }
      }
    } */
  }
  .input-container {
    height: 40%;
    //padding: 0.4rem;
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 7rem;
    background-color: #ffffff34;
  }
  input {
    width: 96%;
    height: 60%;
    background-color: transparent;
    color: white;
    border: none;
    padding-left: 1rem;
    font-size: 1.2rem;
    
    ::placeholder {
      color: #ffffff34;
      opacity: 1;
    }
    &::selection {
      background-color: #FFA62B;
    }
    &:focus {
      outline: none;
    }
  }
  button {
    cursor: pointer;
    padding: 0.3rem 1rem;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    
    border: none;

    img{
      width: 2vw;
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      padding: 0.3rem 1rem;
      svg {
        font-size: 1rem;
      }
    }
    svg {
      font-size: 2rem;
      color: white;
    }
  }
`;
