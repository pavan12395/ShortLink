const express = require("express");
const { getFileName } = require("./utils/file");
const fs = require("fs");
const path = require("path")
const DownloadRouter = express.Router()
const {DOWNLOAD_ROUTE,FILE_NOT_FOUND,UPLOADS_DIR,CONTENT_DIPOSITION,CONTENT_TYPE,
OCTET_STREAM} = require("./constants/constants")

DownloadRouter.get(DOWNLOAD_ROUTE,async (req,res,next)=>
{
    var fileHash = req.params.hash;
    try
    {
        var fileName =await getFileName(fileHash);
    }
    catch(err)
    {
        return res.status(404).json({message:FILE_NOT_FOUND});
    }
    var filePath = path.join(__dirname,UPLOADS_DIR,fileName);
    if (fs.existsSync(filePath)) {
    // Set appropriate headers for file download
    res.setHeader(CONTENT_DIPOSITION, `attachment; filename=${fileName}`);
    res.setHeader(CONTENT_TYPE, OCTET_STREAM);

    // Pipe the file to the response for download
    fs.createReadStream(filePath).pipe(res);
  } else {
    // File not found
    res.status(404).json({ error: FILE_NOT_FOUND});
  }
})

module.exports = DownloadRouter;