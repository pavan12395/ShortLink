const jwt  = require("jsonwebtoken")
const User = require("../models/UserModel")
const bcrypt = require("bcrypt")
function storeCredentials(name,hashPassword)
{
    User.create({name:name,password:hashPassword})
}
function generateAccessToken(name)
{
    const accessToken = jwt.sign({name:name},process.env.ACCESS_TOKEN_SECRET_KEY);
    return accessToken
}
async function checkUserName(name)
{
    const users = await findUsers(name)
    return users===null || users.length===0;
}
async function findUsers(name)
{
    const users = await User.find({name:name},'password').exec()
    return users
}
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

module.exports = {checkUsers,findUsers,checkUserName,generateAccessToken,storeCredentials};