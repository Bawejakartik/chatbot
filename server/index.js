const express = require("express");
require("dotenv").config();
const http = require("http");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const Authrouter = require("./routes/Authrouter");
const messageRouter = require("./routes/messageRoute");
const db = require("./config/database");
const { initSocket } = require("./socket/socket");
const { error } = require("console");
const passport = require("passport");
require('./config/passport');
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
  cookie:{secure:false},
  })
);
app.use(
  cors({
    origin: 
   [ "http://localhost:5173",
    "https://genuinechatapp.vercel.app/", // local testing
    "https://genuinechatapp-5wq0zq2da-kartiks-projects-786a5b7a.vercel.app"],
    credentials: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v8", Authrouter);
app.use("/api/v8/message", messageRouter);
app.get("/",(req,res)=>{
  res.send({
    activeStatus:true,
    error:false

  })
})
const server = http.createServer(app);


initSocket(server);

db.connect();
server.listen(PORT, () => {
  console.log("Server & Socket.io running on port", PORT);
});
