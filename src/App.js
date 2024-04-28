import React, { useState } from "react";
import styled from "styled-components";
import Menu from "./components/menu";
import Pages from "./components/pages";
import cookieManager from "./managers/cookieManager";

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
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  gap: 10px;
  color: rgba(0, 0, 0, 0.45);
  padding: 20px;

  span {
    font-size: 32px;
    color: #525252;
  }
`;

const CreateButton = styled.button`
  align-self: flex-end;
`;

const ChatPlaceholder = styled.img`
  width: 240px;
  height: 240px;
  border-radius: 50%;
  object-fit: contain;
`;


function App(props) {
  const { userInfo } = props;
  const [selectedChat, setChat] = useState();
  const [refreshContactList, toggleRefreshContactList] = useState(false);

  const [gifPrompt, setGifPrompt] = useState("");

  const handleButtonClick = () => {
    setChat(null);
  };

  const handleCreateClick = () => {
    // Handle create button click here
  };

  const handleLogout = () => {
    cookieManager.setUserInfo(null);
    alert("Logged out successfully, please refresh the page");
  };


  return (
    <Container>
      <Menu setChat={setChat}
       userInfo={userInfo}
       refreshContactList={refreshContactList} 
       handleButtonClick={handleButtonClick}
       handleLogout={handleLogout}
       />
       
      {selectedChat ? (
      <Pages 
      selectedChat={selectedChat} 
      userInfo={userInfo} 
      refreshContactList={() => 
        toggleRefreshContactList(!refreshContactList)

        }
      />
       ):(
        <Placeholder>
        <h1>Create GIF</h1>
        <ChatPlaceholder src="/logo.png" />
        <input 
          type="text" 
          value={gifPrompt} 
          onChange={e => setGifPrompt(e.target.value)} 
          placeholder="Prompt"
        />
        <CreateButton onClick={handleCreateClick}>Create</CreateButton>
      </Placeholder>
        )}

    </Container>

  );
}

export default App;
