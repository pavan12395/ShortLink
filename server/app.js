require("dotenv").config()
const express = require("express")
const https = require('https');
const connectDB = require("./db")
const AuthServer = require("./authServer")
const UrlServer = require("./urlServer")
const FileServer = require("./FileServer")
const cors = require("cors");
const DownloadServer = require("./DownloadServer")
const {AUTH_SERVER_ROUTE,URL_SERVER_ROUTE,DOWNLOAD_SERVER_ROUTE,FILE_SERVER_ROUTE} = require("./constants/constants");
connectDB()
const app = express();
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Request-Private-Network', true);
    res.setHeader('Access-Control-Allow-Private-Network',true);
    next();
});
app.use(cors(
    {
        origin:"*",
    }
));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.get('/cors', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.send({ "msg": "This has CORS enabled 🎈" })
    })
app.use(AUTH_SERVER_ROUTE,AuthServer)
app.use(URL_SERVER_ROUTE,UrlServer)
app.use(DOWNLOAD_SERVER_ROUTE,DownloadServer)
app.use(FILE_SERVER_ROUTE,FileServer)

app.listen(5000,()=>
{
    console.log("Server listening on Port : 5000");
});