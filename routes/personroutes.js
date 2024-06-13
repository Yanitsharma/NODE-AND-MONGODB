const express=require('express');
const router=express.Router();
const Person=require('./../Models/person');

router.post('/',async (req,res)=>{
  try{

const data=req.body;
const newPerson=new Person(data);

const response= await newPerson.save()
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
   const data= await Person.find()
     console.log('data fetched');
     res.status(200).json(data);

  }
catch(err){
  console.log(err);
  res.status(500).json({err:'internal server error'});
}

})
router.get('/:worktype',async (req,res)=>{
  try{
      const workType=req.params.worktype;
      if(workType=='chef'||workType=='waiter'||workType=='worker'){
       const data= await Person.find({work:workType});
     console.log('data fetched');
     res.status(200).json(data);
      }

  }
catch(err){
  console.log(err);
  res.status(500).json({err:'internal server error'});
}

})

router.put('/:id',async (req,res)=>{
  try{
    const personId=req.params.id;
    const updatedPerson=req.body;
    const response = await Person.findByIdAndUpdate(personId,updatedPerson,{
   new:true,
   runValidators:true,
    })
    if(!response){
      return res.status(404).json({error:'person not found'});
    }
    console.log('data updated');
    res.status(200).json(response);
  }
catch(err){
  console.log(err);
  res.status(500).json({err:'internal server error'});
}

})
router.delete('/:id',async (req,res)=>{
  try{
    const personId=req.params.id;
    const response = await Person.findByIdAndDelete(personId)
    if(!response){
      return res.status(404).json({error:'person not found'});
    }
    console.log('data deleted');
    res.status(200).json({message:'item deleted successfully'});
  }
catch(err){
  console.log(err);
  res.status(500).json({err:'internal server error'});
}

})




module.exports=router;