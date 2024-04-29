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
const FileInput = styled.input`
  display: block;
  margin: 20px auto;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const DisplayedImage = styled.img`
  max-width: 100%;
  height: auto;
  display: block;
  margin: 20px auto;
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
  const [uploadedImage, setUploadedImage] = useState();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setUploadedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setUploadedImage(null);
    }
  };



  const handleButtonClick = () => {
    setChat(null);
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
          <h2>To create a GIF return back to the application</h2>
          <h3>Upload your GIF to view the result</h3>
          <FileInput type="file" accept="image/gif" onChange={handleImageUpload} />
          {uploadedImage && <DisplayedImage src={uploadedImage} />}
          <ChatPlaceholder src="/logo.png" />
        </Placeholder>
        )}

    </Container>

  );
}

export default App;
