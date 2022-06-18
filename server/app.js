const express = require("express");
const app = express();
const helmet = require("helmet");
const msgRoutes =require("./api/routes/messages")
const conversationsRoutes =require("./api/routes/conversations")
const cors = require('cors')
/*const corsOptions = {
  origin:"*",
 
}*/


app.use(express.json());
app.use(helmet());
app.use(cors())
/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/
app.use("/conversations", conversationsRoutes)
app.use("/messages", msgRoutes)


app.use((error,req,res,next)=>{
 // const error =new Error("not Found")
  error.status(404)
  next(error)
})

app.use((error, req, res, next) => {
  return res.status(500).json({ error: error.toString() });
});

module.exports=app