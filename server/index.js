const express = require("express");
require("dotenv").config();
const app = express();
const db = require("./config/database");
const User = require("./model/user");
const Authrouter = require("./routes/Authrouter");


app.use(express.json());
app.use("/api/v8",Authrouter);

const PORT = process.env.PORT;
db.connect();
 
app.listen(PORT,async(req , res ) =>{
    await console.log("Server started on the port ",PORT);

})