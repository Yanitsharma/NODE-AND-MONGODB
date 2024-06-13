const mongoose=require('mongoose');
require('dotenv').config();
const mongoURL=process.env.MONGODB_URL_LOCAL;

// const mongoURL="mongodb+srv://Yanit123:shiv12345@cluster0.qhrdc1p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(mongoURL,{
  useNewUrlParser:true,
  useUnifiedTopology:true,
})

const db=mongoose.connection;

db.on('connected',()=>{
  console.log('mongodb connection successfully');
})

db.on('error',(err)=>{
  console.log('mongodb connection error:',err);
})

db.on('disconnected',()=>{
  console.log('Mongodb disconnected');
})
module.exports=db;