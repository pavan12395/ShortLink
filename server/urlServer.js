const express = require("express")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")
const path = require("path")
const UrlRouter = express.Router()
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const fs = require("fs");
const File = require("./models/FileModel")
const {hashString,storeFile,storeFileRecord,deleteFile,validateFile,listFiles} = require('./utils/file');
const {AUTHORIZATION,FILE,UTF8,SUCCESSFULL_FILE_UPLOAD,ERROR_STORING_FILE,DELETE_FILE_ROUTE,SUCCESSFUL_FILE_DELETE,LIST_FILES_ROUTE
,FETCH_SUCCESSFUL,ERROR_FETCH_FILE,INVALID_TOKEN,UPLOAD_URL_ROUTE} = require("./constants/constants");
async function checkToken(req,res,next)
{
    var accessToken = req.headers[AUTHORIZATION]
    if(accessToken===null || accessToken.length==0){return res.status(401).json({message:INVALID_TOKEN});}
    accessToken = accessToken.split(' ')[1]
    if(accessToken===null || accessToken.length==0){return res.status(401).json({message:INVALID_TOKEN});}

    else
    {
        try
        {
          const result = jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET_KEY)
          if(result)
          {
            const decodedToken = jwt.decode(accessToken)
            req.token = decodedToken
            return next()
          }
          else
          {
            return res.status(403)
          }
        }
        catch(err)
        {
            return res.status(403).json({message:err.message});
        }
    }
}

UrlRouter.post(UPLOAD_URL_ROUTE,checkToken,upload.single(FILE),validateFile,async (req,res,next)=>
{
    const sourceFileName = req.file.originalname
    const username = req.token.name
    const fileName = username+"_"+sourceFileName; 
    const fileBuffer = req.file.buffer;
    const fileContent = fileBuffer.toString(UTF8);
    try
    {
       const hashUrl = hashString(fileName);
       await storeFile(fileName,fileContent)
       await storeFileRecord(fileName,hashUrl) 
       return res.status(200).json({message:SUCCESSFULL_FILE_UPLOAD,url:hashUrl});
    }
    catch(err)
    {
        return res.status(500).json({message:ERROR_STORING_FILE,error:err.message});
    }
});

UrlRouter.delete(DELETE_FILE_ROUTE,checkToken,async (req,res,next)=>
{
    const fileName = req.params.file;
    try
    {
      await deleteFile(req.token.name+"_"+fileName)
    }
    catch(err)
    {
        return res.status(500).json({message:err.message});
    }
    return res.status(200).json({message:SUCCESSFUL_FILE_DELETE});
});

UrlRouter.get(LIST_FILES_ROUTE,checkToken,async (req,res,next)=>
{
    try
    {
        var files = await listFiles(req.token.name);
        files = files.map(((file)=>
        {
            const index = file.name.indexOf("_");
            file.name = file.name.substring(index+1);
            return file;
        }))
        return res.status(200).json({message:FETCH_SUCCESSFUL,files:files});
    }
    catch(err)
    {
      return res.status(500).json({message:ERROR_FETCH_FILE});
    }
});
module.exports = UrlRouter;
