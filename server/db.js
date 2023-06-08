const mongoose = require("mongoose")
const {OK_DB,ERR_DB,OPEN,ERROR} = require("./constants/constants");
function connectDB()
{
    mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING)
    const db = mongoose.connection
    db.on(ERROR,()=>
    {
        console.log(ERR_DB)
    });
    db.once(OPEN,()=>
    {
        console.log(OK_DB);
    });
    return db
}

module.exports = connectDB