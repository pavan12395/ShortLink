require("dotenv").config()
const express = require("express")
const jwt = require("jsonwebtoken")
const app = express()
const bcrypt = require("bcrypt")
const connectDB = require("./db")
const User = require("./models/UserModel")
connectDB()
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("/hello",(req,res,next)=>
{
    res.status(200).json({message:"Hello Endpoint!"});
});

app.post("/signup",(req,res,next)=>
{
    const name = req.body.name;
    const hashPassword = bcrypt.hashSync(req.body.password,10)
    try
    {
      storeCredentials(name,hashPassword)
      const accessToken = generateAccessToken(name);
      return res.status(201).json({message:"Successfully Created the User",accessToken:accessToken});
    }
    catch(err)
    {
        return res.status(500).json({message:err.message})
    }
});

app.post("/login",async (req,res,next)=>
{
    const name = req.body.name
    const password = req.body.password
    try
    {
        const users = await findUsers(name)
        console.log(users)
        const result = await checkUsers(users,password)
        if(result)
        {
            const accessToken = generateAccessToken(name)
            return res.status(200).json({message:"Successfully Logged In",accessToken:accessToken});
        }
        else
        {
            return res.status(401).json({message:"Incorrect name or password"});
        }
    }
    catch(err)
    {
        return res.status(500).json({message:err.message});
    }
});

async function checkUsers(users,password)
{
    if(users===null){return false;}
    for(let i=0;i<users.length;i++)
    {
        const result = await bcrypt.compare(password,users[i].password)
        if(result)
        {
            return true;
        }
    }
    return false;
}

function storeCredentials(name,hashPassword)
{
    User.create({name:name,password:hashPassword})
}
function generateAccessToken(name)
{
    const accessToken = jwt.sign({name:name},process.env.ACCESS_TOKEN_SECRET_KEY);
    return accessToken
}
async function findUsers(name)
{
    const users = await User.find({name:name},'password').exec()
    return users
}
app.listen(5000,()=>
{
    console.log("server listening at Port : 5000");
})