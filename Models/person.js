const mongoose=require('mongoose');

const personSchema= new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  age:{
    type:Number,
  },
  work:{
   type:String,
   enum:['chef','waiter','worker'],
   required:true,
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  address:{
    type:String,
  },
  salary:{
    type:Number,
    required:true,
  },
});
// create a model Person from personSchema
const Person= mongoose.model('Person',personSchema);
module.exports=Person;