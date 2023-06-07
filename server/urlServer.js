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
async function checkToken(req,res,next)
{
    var accessToken = req.headers['authorization']
    if(accessToken===null || accessToken.length==0){return res.status(401).json({message:"Invalid Token!"});}
    accessToken = accessToken.split(' ')[1]
    if(accessToken===null || accessToken.length==0){return res.status(401).json({message:"Invalid Token!"});}

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

UrlRouter.post("/",checkToken,upload.single("file"),validateFile,async (req,res,next)=>
{
    const sourceFileName = req.file.originalname
    const username = req.token.name
    const fileName = username+"_"+sourceFileName; 
    const fileBuffer = req.file.buffer;
    const fileContent = fileBuffer.toString('utf8');
    console.log(sourceFileName+" and "+fileContent)
    try
    {
       const hashUrl = hashString(fileName);
       await storeFile(fileName,fileContent)
       await storeFileRecord(fileName,hashUrl) 
       return res.status(200).json({message:"Successfully uploaded file",url:hashUrl});
    }
    catch(err)
    {
        return res.status(500).json({message:"Error Storing file",error:err.message});
    }
});

UrlRouter.delete("/:file",checkToken,async (req,res,next)=>
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
    return res.status(200).json({message:"Successfully Deleted!"});
});

UrlRouter.get("/listfiles",checkToken,async (req,res,next)=>
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
        return res.status(200).json({message:"Fetched Successfully!",files:files});
    }
    catch(err)
    {
      return res.status(500).json({message:"Error Fetching files!"});
    }
});
module.exports = UrlRouter;
