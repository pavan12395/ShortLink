import React, { useEffect,useState} from 'react';
import styled from 'styled-components';
import { RiAccountCircleFill } from 'react-icons/ri';
import { RiLogoutCircleLine } from 'react-icons/ri';
import jwtDecode from 'jwt-decode';
import {useNavigate} from 'react-router-dom';
const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: #333;
  color: white;
  padding: 10px;
  width: 100%;
`;

const UserCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fff;
  color: #333;
  margin-right: 10px;
`;

const UserName = styled.span`
  font-weight: bold;
  transform : scale(1.3)
  margin-left: 2%;
  font-size: 125%;
  padding:1%;
`;

const IconButton = styled.div`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color:white;
  transform:scale(1.4)
`;

const Navbar = () => {
  const [name,setName] = useState();  
  const navigate = useNavigate();

  // Assuming you have the user name stored in a state variable called "userName"
  useEffect(()=>{
  const accessToken = localStorage.getItem("accessToken");
  const decodedToken = jwtDecode(accessToken);
  setName(decodedToken.name); // Replace with your actual user name
  // Get the first letter of the user name
  });
  const logOutHandler = (e)=>
  {
      e.preventDefault();
      localStorage.removeItem("accessToken");
      navigate("/");
  }
  return (
    <NavbarContainer>
        <RiAccountCircleFill size={30}/>
      <UserName>{name}</UserName>
      <IconButton className='logout-button' onClick={logOutHandler}>
      <RiLogoutCircleLine title="logout"/>
      </IconButton>
    </NavbarContainer>
  );
};

export default Navbar;
