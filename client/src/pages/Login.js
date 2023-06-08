import axios from 'axios';
import React,{useRef,useState} from 'react';
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
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
const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
`;

const ModalCloseButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 20px;
  color: #aaa;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const ModalTitle = styled.h2`
  margin-top: 0;
`;

const ModalMessage = styled.p`
  margin-bottom: 0;
`;

const Login = () => {
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [statusCode, setStatusCode] = useState(0);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('https://localhost:5000/auth/login', {
            name: nameRef.current.value,
            password: passwordRef.current.value,
        });
  
        if (response.status == 200 ) {
          const data = response.data;
          localStorage.setItem('accessToken', data.accessToken);
          navigate('/dashboard');
        } else {
          const errorData = await response.data;
          setErrorMessage(errorData.message);
          setStatusCode(response.status);
          setShowModal(true);
        }
      } catch (error) {
        setErrorMessage(error.response ? error.response.data.message : error.message);
          setStatusCode("");
          setShowModal(true);
      }
  };
  const closeModal = () => {
    setShowModal(false);
    nameRef.current.value="";
    passwordRef.current.value="";
  };
  const nameRef = useRef();
  const passwordRef = useRef();
  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <InputContainer>
          <IconWrapper>
            <AiOutlineUser />
          </IconWrapper>
          <InputField type="text" placeholder="Username" ref={nameRef}/>
        </InputContainer>
        <InputContainer>
          <IconWrapper>
            <AiOutlineLock />
          </IconWrapper>
          <InputField type="password" placeholder="Password" ref={passwordRef}/>
        </InputContainer>
        <LoginButton type="submit">Log In</LoginButton>
      </LoginForm>
      <SignupLink to="/">Don't have an account? Sign up</SignupLink>
      {showModal && (
        <Modal>
          <ModalContent>
            <ModalCloseButton onClick={closeModal}>×</ModalCloseButton>
            <ModalTitle>Error</ModalTitle>
            <ModalMessage>
              Error Message: {errorMessage} (Status Code: {statusCode})
            </ModalMessage>
          </ModalContent>
        </Modal>
      )}
    </LoginContainer>
  );
};

export default Login;
