const fs = require("fs");
const File = require("../models/FileModel")
const crypto = require("crypto")
const path = require("path")


const defaultExpiryInSeconds = parseInt(process.env.DEFAULT_EXPIRY, 10);
const allowedExtensions = process.env.ALLOWED_EXTENSIONS.split(',');
const max_file_size = parseInt(process.env.MAX_SIZE);
const util = require('util');
const { validateHeaderValue } = require("http");


async function storeFile(fileName,fileContent)
{
  try
  {
    fs.writeFileSync("uploads/"+fileName,fileContent)
  }
  catch(err)
  {
    throw new Error("Error storing file :"+err.message)
  }
}
async function storeFileRecord(fileName,hashUrl)
{
  try
  {
    File.create({name:fileName,shortlink:hashUrl});
  }
  catch(err)
  {
    throw new Error("Error storing file metadata to Database : "+err.message)
  }
}
async function deleteFileRecord(fileName)
{
   try
   {
    await File.deleteOne({name:fileName});
   }
   catch(err)
   {
    throw new Error("Error deleting the File "+fileName+" : "+err.message);
   }
}
async function deleteFile(fileName)
{
  const filePath = path.join(__dirname,"..",'uploads',fileName);
   try
   {
      if(fs.existsSync(filePath))
      {
         fs.unlinkSync(filePath)
         deleteFileRecord(fileName)
         console.log("Deleted File Successfully");
      }
      else
      {
         throw new Error("File Doesnt Exist");
      }
   }
   catch(err)
   {
     throw new Error("Error in Deleting File "+filePath+" : "+err.message);
   }
}
function hashString(inputString) {
  const hash = crypto.createHash('md5').update(inputString).digest('hex');
  return hash.substring(0, 4);
}
function readFile(fileName)
{
    const filePath = path.join(__dirname, "..",'uploads', fileName);
    const fileBuffer = fs.readFileSync(filePath)
    return fileBuffer.toString('utf8');
}
async function getFiles()
{
    const expiryTimestamp = Date.now() - (defaultExpiryInSeconds * 1000);
    const expiredFiles = await File.find({ createdAt: { $lt: new Date(expiryTimestamp)} },'name');
    return expiredFiles
}
async function cleanFiles()
{
    try
    {
        const expiredFiles = await getFiles();
        if(expiredFiles==null || expiredFiles.length ==0){return;}
        for(let i=0;i<expiredFiles.length;i++)
        {
            try
            {
                await deleteFile(expiredFiles[i].name)
                console.log("Janitor:File Expired: "+expiredFiles[i].name)

            }
            catch(err)
            {
                console.log("Janitor:Error occured deleting the file : "+expiredFiles[i].name)
            }
     }
    }
    catch(err)
    {
        console.log("Janitor:Error Fetching Files!",err.message);
        return;
    }
}

function validateFile(req,res,next)
{
    const file = req.file;
    const file_size = file.size;
    var index = file.originalname.lastIndexOf(".");
    var extension = file.originalname.substring(index+1);
    if(allowedExtensions.includes(extension) && file_size<=max_file_size)
    {
        return next();
    }
    else if(file_size>max_file_size)
    {
        return res.status(413).json({message:"File Size more then the Max size of "+max_file_size});
    }
    else
    {
        return res.status(415).json({message:"File Extension not allowed!"});
    }
} 

async function getFileName(fileHash)
{
    const file = await File.findOne({shortlink:fileHash},'name');
    if(file==null)
    {
       throw new Error("File not found!");
    }
    return file.name;
}

async function listFiles(userName)
{
  try
  {
    const files = await File.find({ name: { $regex: `^${userName}_`, $options: 'i' } }).select('name shortlink');
    return files;
  }
  catch(err)
  {
    throw new Error("Error occured when listing files! "+err.message);
  }
}

module.exports = {storeFileRecord,storeFile,deleteFile,deleteFileRecord,cleanFiles,getFiles,hashString,readFile,validateFile,getFileName,listFiles}