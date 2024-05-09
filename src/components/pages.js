import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SearchContainer, SearchInput } from "./menu";
import httpManager from "../managers/httpManager";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
  height: 100%;
  width: 100%;
  background: #f6f7f8;
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: row;
  background: #ededed;
  padding: 10px;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;
const ContactName = styled.span`
  font-size: 16px;
  color: black;
`;
const ChatBox = styled.div`
  display: flex;
  flex-direction: row;
  background: #f0f0f0;
  padding: 10px;
  align-items: center;
  bottom: 0;
`;
const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  background: #e5ddd6;
`;
const MessageDiv = styled.div`
  display: flex;
  justify-content: ${(props) => (props.isYours ? "flex-end" : "flex-start")};
  margin: 5px 15px;
`;
const Message = styled.div`
  background: ${(props) => (props.isYours ? "#daf8cb" : "white")};
  padding: 8px 10px;
  border-radius: 4px;
  max-width: 50%;
  color: #303030;
  font-size: 14px;
  img {
    max-width: 100%;
  }
`;

const AttachButton = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  opacity: 0.4;
  cursor: pointer;
`;

const Pages =(props)=>{
  const { selectedChat, userInfo, refreshContactList } = props;
  const [text, setText] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadError, setUploadError] = useState(null);



  useEffect(() => {
    setMessageList(selectedChat.channelData.messages);
  }, [selectedChat]);



  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

    if (file && !validImageTypes.includes(file.type)) {
      alert('Invalid file type. Please upload a GIF, JPEG, or PNG image.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('http://localhost:3001/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    console.log(data.path);
    setUploadedImage(data.path);
  };



  const onEnterPress = async (event) => {
    let channelId = selectedChat.channelData._id;
    if (event.key === "Enter") {
      if (!messageList || !messageList.length) {
        const channelUsers = [
          {
            email: userInfo.email,
            name: userInfo.name,
            picture: userInfo.picture,
          },
          {
            email: selectedChat.otherUser.email,
            name: selectedChat.otherUser.name,
            picture: selectedChat.otherUser.picture,
          },
        ];
        const channelResponse = await httpManager.createChannel({
          channelUsers,
        });
        channelId = channelResponse.data.responseData._id;
        
      }
      const messages = [...messageList];
      const msgReqData = {
        text: uploadedImage || text,
        senderEmail: userInfo.email,
        addedOn: new Date().getTime(),
      };
      const messageResponse = await httpManager.sendMessage({
        channelId,
        messages: msgReqData,
      });
      messages.push(msgReqData);
      setMessageList(messages);
      setText("");
      refreshContactList();

      
    }
  };
    return (
        <Container>
          <ProfileHeader>
          <ProfileImage src={selectedChat.otherUser.picture} />
          <ContactName>{selectedChat.otherUser.name}</ContactName>
      </ProfileHeader>
      <MessageContainer>
        {messageList?.map((messageData) => (
          <MessageDiv isYours={messageData.senderEmail === userInfo.email}>
            <Message isYours={messageData.senderEmail === userInfo.email}>
              {messageData.text.startsWith('/uploads/') ? (
          <img src={`http://localhost:3001${messageData.text}`} alt="Uploaded content" />
          ) : (
                messageData.text
              )}
            </Message>
          </MessageDiv>
        ))}
      </MessageContainer>
          <ChatBox>
            <SearchContainer>
              <input type="file" accept="image/gif" id="fileUpload" onChange={handleImageUpload} style={{ display: 'none' }} />
              <label htmlFor="fileUpload">
                <AttachButton src={"data.jpg"}/>
              </label>
              <SearchInput
                placeholder="Type a message or upload an image/ GIF and press enter"
                value={text}
                onKeyDown={onEnterPress}
                onChange={(e) => setText(e.target.value)}
              />
            </SearchContainer>
          </ChatBox>
        </Container>
      );
    }
    
    export default Pages;