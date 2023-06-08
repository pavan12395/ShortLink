const express = require("express")
const https = require('https');
const connectDB = require("./db")
const AuthServer = require("./authServer")
const UrlServer = require("./urlServer")
const FileServer = require("./FileServer")
const cors = require("cors");
const DownloadServer = require("./DownloadServer")
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
        origin:"http://localhost:3000",
    }
));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.get('/cors', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.send({ "msg": "This has CORS enabled 🎈" })
    })
app.use('/auth',AuthServer)
app.use('/file',UrlServer)
app.use('/downloads',DownloadServer)
app.use('/',FileServer)

https.createServer(null, app).listen(5000,()=>
{
    console.log("Server listening at Port : 5000");
});