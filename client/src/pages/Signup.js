import React from 'react';
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const SignUpForm = styled.form`
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

const SignUpButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
`;

const LoginLink = styled(Link)`
  margin-top: 10px;
  text-decoration: none;
  color: #007bff;
`;

const SignUp = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign up logic here
  };

  return (
    <SignUpContainer>
      <SignUpForm onSubmit={handleSubmit}>
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
        <SignUpButton type="submit">Sign Up</SignUpButton>
      </SignUpForm>
      <LoginLink to="/login">Already have an account? Login</LoginLink>
    </SignUpContainer>
  );
};

export default SignUp;
