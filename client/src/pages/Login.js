import React from 'react';
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const IconWrapper = styled.div`
  margin-right: 10px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 14px;
`;

const LoginButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
`;

const SignupLink = styled(Link)`
  margin-top: 10px;
  text-decoration: none;
  color: #007bff;
`;

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <InputContainer>
          <IconWrapper>
            <AiOutlineUser />
          </IconWrapper>
          <InputField type="text" placeholder="Username" />
        </InputContainer>
        <InputContainer>
          <IconWrapper>
            <AiOutlineLock />
          </IconWrapper>
          <InputField type="password" placeholder="Password" />
        </InputContainer>
        <LoginButton type="submit">Log In</LoginButton>
      </LoginForm>
      <SignupLink to="/">Don't have an account? Sign up</SignupLink>
    </LoginContainer>
  );
};

export default Login;
