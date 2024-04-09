import React, { useState } from "react";
import styled from "styled-components";
import Menu from "./components/menu";
import Pages from "./components/pages";

const Container = styled.div`
  background: #f8f9fb;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: row;

  `

  const Placeholder = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  gap: 10px;
  color: rgba(0, 0, 0, 0.45);

  span {
    font-size: 32px;
    color: #525252;
  }
`;

const ChatPlaceholder = styled.img`
  width: 240px;
  height: 240px;
  border-radius: 50%;
  object-fit: contain;
`;


function App() {
  const [selectedChat, setChat] = useState();
  return (
    <Container>
      <Menu/>
      {selectedChat ? (
      <Pages/>
       ):(
         <Placeholder>
        <ChatPlaceholder src = "/logo.png"/>fgwefge

        </Placeholder>
        )}
    </Container>

  );
}

export default App;
