const mongoose = require("mongoose");

const FileModel = new mongoose.Schema({
    name:
    {
        type:String,
        required:true
    },
    shortlink:
    {
        type:String,
        required:true
    }
},{timestamps:{createdAt:'createdAt'}});


module.exports = mongoose.model('File',FileModel)