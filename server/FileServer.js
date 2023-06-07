const express = require("express")
const fs = require("fs")
const path  = require("path")
const FileRouter = express.Router()
const File = require("./models/FileModel")
const defaultIntervalInSeconds = parseInt(process.env.DEFAULT_INTERVAL,10);
const {cleanFiles,readFile,getFileName} = require("./utils/file");
FileRouter.get("/:hash",async (req,res)=>
{
    const fileHash = req.params.hash
    if(fileHash.length==0)
    {
        return res.status(400).json({message:"Param Missing!"});
    }
    var fileName = await getFileName(fileHash);
    if(fileName==null || fileName.length==0)
    {
        return res.status(404).json({message:"No File Found!"});
    }
    else
    {
        try
        {
            const fileContent = readFile(fileName)
            const index = fileName.indexOf("_");
            fileName = fileName.substring(index+1)
            return res.status(200).send(fileContent);
        }
        catch(err)
        {
            return res.status(500).json({message:"Error in Fetching file! : "+err.message});
        }
    }
});
// setInterval(cleanFiles,defaultIntervalInSeconds*1000);
module.exports = FileRouter