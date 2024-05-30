import React, { useState, useEffect } from "react";
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
  overflow: hidden;
`;

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

const MenuContainer = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
  flex: 1;

  @media (min-width: 768px) {
    display: block;
  }
`;

const ContentContainer = styled.div`
  display: ${props => props.isOpen ? 'none' : 'block'};
  flex: 2;

  @media (min-width: 768px) {
    display: block;
  }
`;

const BackButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;


function App(props) {
  const { userInfo } = props;
  const [selectedChat, setChat] = useState();
  const [refreshContactList, toggleRefreshContactList] = useState(false);
  const [uploadedImage, setUploadedImage] = useState();
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [message, setMessage] = useState(''); 

  useEffect(() => {
  window.scrollTo(0, 0); // scroll to top
  document.body.style.overflow = 'hidden'; // prevent scrolling
  return () => {
    document.body.style.overflow = 'unset'; // allow scrolling when component unmounts
  };
}, []); 
 
  <button onClick={() => setIsMenuOpen(true)}>Open Menu</button>

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      // Create a new Blob object from the result
      const blob = new Blob([new Uint8Array(reader.result)], { type: file.type });
      // Create a URL representing the Blob
      const url = URL.createObjectURL(blob);
      setUploadedImage(url);
    };

    if (file) {
      // Read the file as a Blob
      reader.readAsArrayBuffer(file);
    } else {
      setUploadedImage(null);
    }
  };



  const handleButtonClick = () => {
    setChat(null);
    setIsMenuOpen(false);

  };


  const handleLogout = () => {
    cookieManager.setUserInfo(null);
    alert("Logged out successfully, please refresh the page");
  };

  const convertToGif = () => {
    var text = document.getElementById("text").value;
    fetch('https://471d05486ba8cfdd62625ef7d142b83d.loophole.site/convert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({text: text}),
    })
    .then(response => response.blob())
    .then(blob => {
      var url = window.URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'output.gif';
      document.body.appendChild(a); // we need to append the element to the dom -> invisible
      a.click();
      a.remove();  //afterwards we remove the element again         
    })
    .catch((error) => console.error('Error:', error));
  }

  const createTxtFile = () => {
    var text = document.getElementById("text").value;
    fetch('https://471d05486ba8cfdd62625ef7d142b83d.loophole.site/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({text: text}),
    })
    .then(response => response.json())
    .then(data => setMessage(data.message)) // Change this line
    .catch((error) => console.error('Error:', error));
  }

  const executeBatFile = () => {
    fetch('https://471d05486ba8cfdd62625ef7d142b83d.loophole.site/execute', {
      method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
      setMessage(data.message); // Add this line
      document.getElementById('terminal').innerText = data.output;
    })
    .catch((error) => console.error('Error:', error));
  }
  


  return (
    <Container>
    <MenuContainer isOpen={isMenuOpen}>
      <Menu 
        setChat={(chat) => { setChat(chat); setIsMenuOpen(false)}}
        userInfo={userInfo}
        refreshContactList={refreshContactList} 
        handleButtonClick={handleButtonClick}
        handleLogout={handleLogout}
      />
    </MenuContainer>
    <ContentContainer isOpen={isMenuOpen}>
      <BackButton onClick={() => setIsMenuOpen(true)}>Back</BackButton>
      {selectedChat ? (
        <Pages 
          selectedChat={selectedChat} 
          userInfo={userInfo} 
          refreshContactList={() => {
            toggleRefreshContactList(!refreshContactList);
          }}
        />
      ) : (
        <Placeholder>
          <h2>Create and view you GIF</h2>
          
          <ChatPlaceholder src="/logo.png" />
          <h3>Write prompt and wait for messages:</h3>
          <textarea id="text" placeholder="Enter text"></textarea>
          <button onClick={createTxtFile}>Send prompt</button>
          <button onClick={executeBatFile}>Run and execute</button>
          <button onClick={convertToGif}>Download GIF</button>
          <div id="terminal"></div>
          <p>{message}</p>
          <h3>Upload your GIF to view the result</h3>
          <FileInput type="file" accept="image/gif" onChange={handleImageUpload} />
          {uploadedImage && <DisplayedImage src={uploadedImage} />}
        </Placeholder>
      )}
    </ContentContainer>
  </Container>
  );
}

export default App;
