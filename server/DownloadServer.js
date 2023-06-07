const express = require("express");
const { getFileName } = require("./utils/file");
const fs = require("fs");
const path = require("path")
const DownloadRouter = express.Router()

DownloadRouter.get("/:hash",async (req,res,next)=>
{
    var fileHash = req.params.hash;
    try
    {
        var fileName =await getFileName(fileHash);
    }
    catch(err)
    {
        return res.status(404).json({message:"File Not found!"});
    }
    var filePath = path.join(__dirname,"uploads",fileName);
    if (fs.existsSync(filePath)) {
    // Set appropriate headers for file download
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.setHeader('Content-Type', 'application/octet-stream');

    // Pipe the file to the response for download
    fs.createReadStream(filePath).pipe(res);
  } else {
    // File not found
    res.status(404).json({ error: 'File not found.' });
  }
})

module.exports = DownloadRouter;