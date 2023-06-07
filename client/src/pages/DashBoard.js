import React, { useEffect, useState,useRef} from 'react';
import { AiOutlineUpload, AiOutlineDownload, AiOutlineDelete } from 'react-icons/ai';
import styled from 'styled-components';

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
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
}

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [statusCode, setStatusCode] = useState(0);
  useEffect(()=>
  {
     getListOfFiles().then((fetchedFiles) =>
     {
        setFiles(fetchedFiles)
     }).catch((err)=>
     {
        setErrorMessage(err.message);
        setStatusCode("");
        setShowModal(true);
     });
  },[])
  const handleFileUpload = async(e) => {
  };

  const handleRemoveFile = (file) => {
    setFiles((prevFiles) => prevFiles.filter((f) => f !== file));
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const inputFileRef = useRef();
  return (
    <DashboardContainer>
      <ButtonContainer>
        <FileButton>
          <label>Choose File!</label>
          <input type="file" style={{ display: 'none' }} ref={inputFileRef}/>
        </FileButton>
        <UploadButton onClick={handleFileUpload}>
          <AiOutlineUpload />
        </UploadButton>
      </ButtonContainer>
      <FileList>
        {files.map((file, index) => (
          <FileItem key={index}>
            <FileName>{file}</FileName>
            <div>
              <IconButton onClick={() => handleRemoveFile(file)}>
                <AiOutlineDelete />
              </IconButton>
              <IconButton>
                <AiOutlineDownload />
              </IconButton>
            </div>
          </FileItem>
        ))}
      </FileList>
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
    </DashboardContainer>
  );
};

export default Dashboard;
