const express = require('express');
const app = express();
const cors = require('cors');


const cookieParser = require("cookie-parser");

require('dotenv').config()

const PORT = 4000;

app.use(cors({
  origin: 'http://localhost:3000', // Your React app's URL
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());
require('./DBCon/conn');

const gymroutes = require('./Routes/gym');
const Membershiproutes = require('./Routes/membership');
const Memberroutes = require('./Routes/member');



app.use('/auth',gymroutes);
app.use('/plans',Membershiproutes);
app.use('/members',Memberroutes);

app.listen(PORT,()=>{
    console.log("server is running on Port 4000")
})