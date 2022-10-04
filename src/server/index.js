const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./authRouter');
const cors = require("cors");
const PORT = process.env.PORT || 5000;

const app = express();
const corsOptions ={
  origin:'*', 
  credentials:true,          
  optionSuccessStatus:200,
}

app.use(cors(corsOptions));
app.use(express.json());
app.use('/auth', authRouter);

const start = async () => {
  try {
    await mongoose.connect('mongodb+srv://vladimir:hnpjQHlCdfLPDHPI@cluster0.znovbmi.mongodb.net/auth?retryWrites=true&w=majority');
    
    app.listen(PORT, () => console.log(`server started on ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

start();