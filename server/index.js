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

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

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
