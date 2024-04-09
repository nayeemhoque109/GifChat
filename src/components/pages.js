import styled from "styled-components";
import { SearchContainer, SearchInput } from "./menu";
import { messagesList } from "../menuOptions";


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
`;
const EmojiImage = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  opacity: 0.4;
  cursor: pointer;
`;
const pages =()=>{
    return (
        <Container>
          <ProfileHeader>
              <ProfileImage src= "/" />
              test
          </ProfileHeader> 
          <MessageContainer>
            {messagesList.map((messageData) => (
                <MessageDiv isYours={messageData.senderID === 0}>
                <Message isYours={messageData.senderID === 0}> 
                    {messageData.text}
                 </Message>
                </MessageDiv>
            ))}
          </MessageContainer>
          <ChatBox>
            <SearchContainer>
              <EmojiImage
                src={"/data.svg"}
              />
              <SearchInput
                placeholder="Type a message"
              />
            </SearchContainer>
          </ChatBox>
        </Container>
      );
    }
    
    export default pages;