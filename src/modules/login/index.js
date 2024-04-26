//https://www.npmjs.com/package/@react-oauth/google
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import App from "../../App";
import cookieManager from "../../managers/cookieManager";
import httpManager from "../../managers/httpManager";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #0a0e11;
  height: 100vh;
`;

const Header = styled.div`
  color: white;
  width: 100%;
  font-weight: bold;
  background-color: #56bca6;
  padding: 50px 50px 140px;
  font-size: 14px;
`;
const CardView = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 30px 50px;
  margin-left: auto;
  margin-right: auto;
  margin-top: -80px;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  gap: 40px;
  flex-wrap: wrap;
`;

const Instructions = styled.div`
  padding: 20px;
  font-size: 16px;

  ol {
    margin: 40px 0;
  }

  li {
    margin: 15px 0;
  }
`;

const Heading = styled.span`
  font-size: 24px;
  color: #525252;
`;


  const LoginComponent = () => {
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const userData = cookieManager.getUserInfo();
    console.log("===",userData);
    if (userData) setUserInfo(userData);
  }, []);

  const responseGoogle = async (response) => {
    const decodedToken = jwtDecode(response.credential);      
    await httpManager.createUser ({
      name: decodedToken.name,
      email: decodedToken.email,
      profilePic: decodedToken.picture
  });

    setUserInfo(decodedToken);
    cookieManager.setUserInfo(decodedToken);

  };



  return (
    <>
      {userInfo ? (
        <App userInfo={userInfo} />
      ) : (
        <Container>
          <Header>GIFCHAT</Header>
          <CardView>
            <Instructions>
              <Heading>Please sign in using your Google account</Heading>

              <GoogleLogin
                buttonText="Sign In with Google"
                cookiePolicy={"single_host_origin"}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
              />
            </Instructions>
          </CardView>
        </Container>
      )}
    </>
  );
};
export default LoginComponent;