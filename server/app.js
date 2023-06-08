const express = require("express")
const app = express()
const connectDB = require("./db")
const AuthServer = require("./authServer")
const UrlServer = require("./urlServer")
const FileServer = require("./FileServer")
const cors = require("cors");
const DownloadServer = require("./DownloadServer")
connectDB()

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(cors());
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
app.listen(5000,()=>
{
    console.log("Server listening at Port 5000")
})