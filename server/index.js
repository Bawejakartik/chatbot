const express = require("express");
require("dotenv").config();
const app = express();
const db = require("./config/database");
const User = require("./model/user");
const Authrouter = require("./routes/Authrouter");
const cookieParser = require("cookie-parser");
const messageRouter = require("./routes/messageRoute")
const cors = require('cors');



app.use(express.urlencoded({extended:true})); 

app.use(express.json());
app.use(cookieParser());


const corsOption = {
  origin: "http://localhost:5173",
  credentials:true
}; 

app.use(cors(corsOption));

app.use("/api/v8",Authrouter);
app.use("/api/v8/message",messageRouter); 

const PORT = process.env.PORT;
db.connect();
 



app.listen(PORT,async(req , res ) =>{
    await console.log("Server started on the port ",PORT);

})