require("dotenv").config()
const express = require("express")
const jwt = require("jsonwebtoken")
const AuthRouter = express.Router()
const bcrypt = require("bcrypt")
const User = require("./models/UserModel")
const {checkUserName,storeCredentials,generateAccessToken,findUsers,checkUsers} = require("./utils/auth")
const {SIGNUP_ROUTE,LOGIN_ROUTE,
HELLO_ROUTE,HELLO_MESSAGE,USERNAME_TAKEN_MESSAGE,SUCCESSFUL_CREATE_USER,SUCCESSFUL_LOGIN_USER,
INCORRECT_USERNAME_OR_PASSWORD} = require("./constants/constants");
AuthRouter.get(HELLO_ROUTE,(req,res,next)=>
{
    res.status(200).json({message:HELLO_MESSAGE});
});

AuthRouter.post(SIGNUP_ROUTE,async (req,res,next)=>
{
    const name = req.body.name;
    const hashPassword = bcrypt.hashSync(req.body.password,10)
    try
    {
      const result = await checkUserName(name);
      if(!result)
      {
         return res.status(400).json({message:USERNAME_TAKEN_MESSAGE});
      }  
      storeCredentials(name,hashPassword)
      const accessToken = generateAccessToken(name);
      return res.status(201).json({message:SUCCESSFUL_CREATE_USER,accessToken:accessToken});
    }
    catch(err)
    {
        return res.status(500).json({message:err.message})
    }
});

AuthRouter.post(LOGIN_ROUTE,async (req,res,next)=>
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
            return res.status(200).json({message:SUCCESSFUL_LOGIN_USER,accessToken:accessToken});
        }
        else
        {
            return res.status(401).json({message:INCORRECT_USERNAME_OR_PASSWORD});
        }
    }
    catch(err)
    {
        return res.status(500).json({message:err.message});
    }
});





module.exports = AuthRouter;