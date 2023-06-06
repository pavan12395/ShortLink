const mongoose = require("mongoose")

function connectDB()
{
    console.log(process.env.MONGOOSE_CONNECTION_STRING)
    mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING)
    const db = mongoose.connection
    db.on("error",()=>
    {
        console.log("Error connecting to Database")
    });
    db.once("open",()=>
    {
        console.log("Successfully connected to the DB");
    });
    return db
}

module.exports = connectDB