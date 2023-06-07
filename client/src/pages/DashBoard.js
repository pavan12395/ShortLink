import React, { useEffect, useState} from 'react';
import { AiOutlineUpload, AiOutlineDownload, AiOutlineDelete } from 'react-icons/ai';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import { FiLink } from 'react-icons/fi';
import NavBar from '../components/NavBar';
const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  transform : scale(1.1)
`;

const UploadButton = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: green;
  color: white;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
`;
const FileButton = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #87CEEB;
  color: white;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const FileList = styled.ul`
  list-style: none;
  margin: 20px;
  padding: 0;
  width: 400px;
`;

const FileItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const FileName = styled.span`
  margin-right: 10px;
`;

const IconButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
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
  max-width: 400px; /* Set the maximum width of the modal content */
  word-wrap: break-word; /* Wrap long text */
  text-align: center; /* Center-align the content */
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

const FileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;



async function getListOfFiles() {
    const url = 'http://localhost:5000/file/listfiles';
    const headers = {
      'Authorization': "Bearer "+localStorage.getItem("accessToken")
    };  
    const response = await fetch(url, { headers });
    if (response.ok){
        const data = await response.json();
        return data.files;
    }
    else
    {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }
}

async function uploadFile(file)
{
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch('http://localhost:5000/file', {
        method: 'POST',
        headers: {
        'Authorization': "Bearer "+localStorage.getItem("accessToken"),
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        return data.url;
        // Do something with the response if needed
      } else {
        const errData = await response.json();
        throw new Error(errData.message);
      }
}
async function downloadFile(file)
{
    const shortLink = file.shortlink;
    var url = "http://localhost:5000/downloads/"+shortLink;
    const headers = {
        'Authorization': "Bearer "+localStorage.getItem("accessToken"),
        'Content-Type': 'application/octet-stream',
    }
    const response = await fetch(url,headers);
    const blob = await response.blob();
      url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download',file.name);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    if(!response.ok)
    {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }
}
async function deleteFile(file)
{
     const url = "http://localhost:5000/file/"+file;
     const headers = {
        'Authorization': "Bearer "+localStorage.getItem("accessToken")
     }
     const request = {
        method : "DELETE",
        headers : headers
     }
     const response = await fetch(url,request);
     if(!response.ok)
     {
        const errorData = await response.json();
        throw new Error(errorData.message);
     }
}

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [statusCode, setStatusCode] = useState(0);
  const navigate = useNavigate();
  useEffect(()=>
  {
     var accessToken = localStorage.getItem("accessToken");
     if(accessToken==null || accessToken.length == null)
     {
        alert("Forbidden Page : User is Not Auhthenticated!");
        navigate("/");
        return;
     }
     getListOfFiles().then((fetchedFiles) =>
     {
        setFiles(fetchedFiles)
     }).catch((err)=>
     {
        setErrorMessage({message:err.message,error:false});
        setStatusCode("");
        setShowModal(true);
     });
  },[])
  const handleFileUpload = async(e) => {
    e.preventDefault();
    uploadFile(inputFile).then((url)=>
    {
        const new_file = {name : inputFile.name,shortlink : url};
        setErrorMessage({message:"Access the link at localhost:5000/"+url,erorr:true});
        setStatusCode("");
        setShowModal(true);
        setFiles([...files,new_file]);
    }).catch((err)=>
    {
        setErrorMessage({message:err.message,error:false});
        setStatusCode("");
        setShowModal(true);
    });
  };

  const handleRemoveFile = (file) => {
    deleteFile(file.name).then(()=>
    {
        setFiles((prevFiles) => prevFiles.filter((f) => f !== file));
    }).catch((err)=>
    {
        setErrorMessage({message:err.message,error:false});
        setStatusCode("");
        setShowModal(true);
    })
  };
  const handleDownloadFile = (file)=>
  {
     downloadFile(file).catch((err)=>
     {
        setErrorMessage({message:err.message,error:false});
        setStatusCode("");
        setShowModal(true);
     })
  }
  const closeModal = () => {
    setShowModal(false);
    setInputFile(null);
  };
  const [inputFile,setInputFile] = useState(null);
  const fileChangeHandler = (e)=>
  {
    e.preventDefault();
    const file = e.target.files[0];
    setInputFile(file);
  }
  return (
    <>
    <NavBar/>  
    <DashboardContainer>
      <ButtonContainer>
        <FileContainer>
        <FileButton>
          <label>Choose File!</label>
          <input type="file" onChange={fileChangeHandler} style={{ display: 'none' }} ref={inputFile}/>
        </FileButton>
        <FileName>{inputFile!=null ? inputFile.name : ""}</FileName>
        </FileContainer>
        <UploadButton onClick={handleFileUpload}>
          <AiOutlineUpload />
        </UploadButton>
      </ButtonContainer>
      <FileList>
        {files.map((file, index) => (
          <FileItem key={index}>
            <FileName>{file.name}</FileName>
            <div>
              <IconButton onClick={() => handleRemoveFile(file)}>
                <AiOutlineDelete />
              </IconButton>
              <IconButton onClick={()=> handleDownloadFile(file)}>
                <AiOutlineDownload />
              </IconButton>
              <IconButton onClick={() => window.open(`http://localhost:5000/${file.shortlink}`, '_blank')}>
            <FiLink />
            </IconButton>
            </div>
          </FileItem>
        ))}
      </FileList>
      {showModal && (
        <Modal>
          <ModalContent>
            <ModalCloseButton onClick={closeModal}>×</ModalCloseButton>
            <ModalTitle>Message!</ModalTitle>
                {              
                   errorMessage.error ? 
                   <ModalMessage>
                    Error Message: {errorMessage.message} (Status Code: {statusCode}) 
                   </ModalMessage>
                   :
                   <ModalMessage> 
                   <p>{errorMessage.message}</p>
                   </ModalMessage>
                }
          </ModalContent>
        </Modal>
      )}
    </DashboardContainer>
    </>
  );
};

export default Dashboard;
