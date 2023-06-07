require("dotenv").config()
const express = require("express")
const jwt = require("jsonwebtoken")
const AuthRouter = express.Router()
const bcrypt = require("bcrypt")
const User = require("./models/UserModel")
const {checkUserName,storeCredentials,generateAccessToken,findUsers,checkUsers} = require("./utils/auth")


AuthRouter.get("/hello",(req,res,next)=>
{
    res.status(200).json({message:"Hello Endpoint!"});
});

AuthRouter.post("/signup",async (req,res,next)=>
{
    const name = req.body.name;
    const hashPassword = bcrypt.hashSync(req.body.password,10)
    try
    {
      const result = await checkUserName(name);
      if(!result)
      {
         return res.status(400).json({message:"Username already Taken!"});
      }  
      storeCredentials(name,hashPassword)
      const accessToken = generateAccessToken(name);
      return res.status(201).json({message:"Successfully Created the User",accessToken:accessToken});
    }
    catch(err)
    {
        return res.status(500).json({message:err.message})
    }
});

AuthRouter.post("/login",async (req,res,next)=>
{
    const name = req.body.name
    const password = req.body.password
    try
    {
        const users = await findUsers(name)
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





module.exports = AuthRouter;