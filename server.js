const express=require('express');
const db=require('./db');
const app=express();
require('dotenv').config();
const bodyParser=require('body-parser');
app.use(bodyParser.json());

app.get('/',(req,res)=>{
  res.send('server is ready');
})


const personroutes=require('./routes/personroutes');
const MenuItemsroutes=require('./routes/MenuItemsroutes');
//use the routers
app.use('/person',personroutes);
app.use('/MenuItems',MenuItemsroutes);

const port=process.env.PORT||3000
app.listen(port,()=>{
console.log(`server is running on ${port}`);
})







