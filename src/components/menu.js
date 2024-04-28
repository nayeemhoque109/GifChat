import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { menuOptions } from "../menuOptions";
import httpManager from "../managers/httpManager";
import utility from "../utility";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1.6;
  height: 100%;
  width: 100%;
  border-right: 1px solid #dadada;
`;

const ProfileInfoDiv = styled.div`
  display: flex;
  flex-direction: row;
  background: #ededed;
  padding: 10px;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  background: #f6f6f6;
  padding: 10px;
`;
export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  background: white;
  border-radius: 16px;
  width: 100%;
  padding: 5px 10px;
  gap: 10px;
`;
const SearchIcon = styled.img`
  width: 28px;
  height: 28px;
`;
export const SearchInput = styled.input`
  width: 100%;
  outline: none;
  border: none;
  font-size: 15px;
`;
const ProfileName = styled.div`
  width: 100%;
  outline: none;
  border: none;
  font-size: 15px;
  margin-left: 10px;
  background: #ededed;
  color: black;
`;
const Options = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #f2f2f2;
  background: white;
  cursor: pointer;

  :hover {
    background: #ebebeb;
  }
`;
const OptionsInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 12px;
`;

const OptionsName = styled.span`
  width: 100%;
  font-size: 16px;
  color: black;
`;

const MessageText = styled.span`
  width: 100%;
  font-size: 14px;
  margin-top: 3px;
  color: rgba(0, 0, 0, 0.8);
`;

const MessageTime = styled.span`
  font-size: 12px;
  margin-right: 10px;
  color: rgba(0, 0, 0, 0.45);
  white-space: nowrap;
`;

const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;
const ProfileIcon = styled(ProfileImage)`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  margin-left: 12px;
  margin-top: 15px;
  margin-bottom: 15px;
  object-fit: cover;
`;
const SearchResults = styled.div`
  width: 100%;
  height: 100px;
`;

const FriendComponent = (props) => {
  const { userData,setChat, userInfo } = props;
  const [searchResult, setSearchResult] = useState();

  const otherUser =
    userData.channelUsers?.find(
      (userObj) => userObj.email !== userInfo.email
    ) || userData;

  const lastMessage =
    userData.messages && userData.messages.length
      ? userData.messages[userData.messages.length - 1]
      : {};
      
    return (
        <Options onClick={() => setChat({ channelData: userData, otherUser })}>
            <ProfileIcon src={otherUser?.profilePic} />
      <OptionsInfo>
        <OptionsName>{otherUser?.name}</OptionsName>
        <MessageText>{lastMessage?.text}</MessageText>
      </OptionsInfo>
      <MessageTime>
        {" "}
        {lastMessage && new Date(lastMessage?.addedOn).getUTCDate()}
      </MessageTime>
        </Options>
    );
};



function Menu(props) {
  const { userInfo, refreshContactList,handleButtonClick,handleLogout } = props;
  const [searchString, setSearchString] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [menuOptions, setMenuOptions] = useState([]);

  const refreshContacts = async () => {
    const contactListData = await httpManager.getChannelList(userInfo.email);
    setMenuOptions(contactListData.data.responseData);
    setSearchString();
    setSearchResult();
  };

  useEffect(() => {
    refreshContacts();
  }, [refreshContactList]);




  const onSearchTextChanged = async (searchText) => {
    setSearchString(searchText);
    if (!utility.validateEmail(searchText)) return;

    const userData = await httpManager.searchUser(searchText);
    if (userData.data?.success) setSearchResult(userData.data.responseData);
  };


  return (
    <Container>

      <ProfileInfoDiv>
        <ProfileImage
          src={userInfo.picture}
        />
        <button onClick={handleLogout}>Logout</button>

        <ProfileName>{userInfo.name}</ProfileName>
      </ProfileInfoDiv>
      <SearchBox>
        <SearchContainer>
          <SearchIcon src={"/search-icon.svg"} />
          <SearchInput
            placeholder="Search or start new chat"
            value={searchString}
            onChange={(e) => onSearchTextChanged(e.target.value)}
          />
        </SearchContainer>
      </SearchBox>
      {searchResult && (
        <SearchResults>
          <FriendComponent userData={searchResult} setChat={props.setChat} />
        </SearchResults>
      )}
      <button onClick={handleButtonClick}>Create GIF</button>
      {menuOptions.map((userData) => (
        <FriendComponent
        userInfo={userInfo}
        userData={userData} 
        setChat={props.setChat}
        />
      ))}
    </Container>
  );
};
export default Menu;