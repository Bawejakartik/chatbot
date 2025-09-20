const mongoose = require("mongoose");
require("dotenv").config();

exports.connect =() =>{

    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("Database connected successfully");

    })
    .catch((err)=>{
        console.error(err);
        
        console.log("database not connected ");

    })
}