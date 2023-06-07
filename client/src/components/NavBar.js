import {Navbar,Dropdown,Nav} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
export default function NavBar()
{
    const [name,setName] = useState();
    useEffect(()=>
    {
        const decodedToken = jwtDecode(localStorage.getItem("accessToken"));
        setName(decodedToken.name);
    },[]);
    return(
        <Navbar  style={{ backgroundColor: "#38024f",color:"white",padding: "5px",display:"flex",justifyContent:"space-around"}} className='nav-bar'>
                    <div style={{display:"flex",alignItems:"end",marginRight:"60vw"}}>
                    <h1>{name}</h1>
                    </div>
                </Navbar>
    )
    
}