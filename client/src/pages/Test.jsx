import React, { useState } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";

export default function Contacts({ contacts, changeChat }) {
  const [currentSelected, setCurrentSelected] = useState(undefined);


  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return  (
    <Container>
      <div className="sss">
        <Picker onEmojiClick={console.log("emogiclicked")} />
      </div>
    </Container>
  )
}


const Container = styled.div`
  height: 100vh;
  width: 100vw;
  flex-direction: column;
  overflow: hidden;
  background-color: #489FB5;
  display: flex;
  align-items: center;
  justify-content: center;

  Picker{
    osition: fixed;
      left: 10%;
      bottom: 10%;
  }


  .sss{
    position: fixed;
      left: 10%;
      bottom: 10%;
  }

}
`;