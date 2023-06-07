import React, { useState } from 'react';
import { AiOutlineUpload, AiOutlineDownload, AiOutlineDelete } from 'react-icons/ai';
import styled from 'styled-components';

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
  width: 200px;
  height: 40px;
  background-color: #007bff;
  color: #fff;
  border-radius: 4px;
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

const Dashboard = () => {
  const [files, setFiles] = useState([]);

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
  };

  const handleRemoveFile = (file) => {
    setFiles((prevFiles) => prevFiles.filter((f) => f !== file));
  };

  return (
    <DashboardContainer>
      <UploadButton>
        <AiOutlineUpload />
        <input type="file" multiple onChange={handleFileUpload} style={{ display: 'none' }} />
      </UploadButton>
      <FileList>
        {files.map((file, index) => (
          <FileItem key={index}>
            <FileName>{file.name}</FileName>
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
    </DashboardContainer>
  );
};

export default Dashboard;
