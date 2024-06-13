const express=require('express');
const router=express.Router();
const MenuItems=require('./../Models/MenuItems');

router.post('/',async (req,res)=>{
  try{

const data=req.body;
const newMenuItem=new MenuItems(data);

const response= await newMenuItem.save()
  console.log('data saved');
  res.status(200).json(response);
}

catch(err){
  console.log(err);
  res.status(500).json({err:'internal server error'});
}
})

router.get('/',async (req,res)=>{
  try{
   const data= await MenuItems.find()
     console.log('data fetched');
     res.status(200).json(data);

  }
catch(err){
  console.log(err);
  res.status(500).json({err:'internal server error'});
}

})

 




module.exports=router;