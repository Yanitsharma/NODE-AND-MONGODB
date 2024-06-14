const express=require('express');
const router=express.Router();
const Person=require('./../Models/person');
const {jwtAuthMiddleware, generateToken}=require('./../jwt');
router.post('/signup',async (req,res)=>{
  try{

const data=req.body;
const newPerson=new Person(data);

const response= await newPerson.save()
  console.log('data saved');
  
const payload = {
  id: response.id,
  username: response.username
}
console.log(JSON.stringify(payload));
const token = generateToken(payload);
console.log("Token is : ", token);

res.status(200).json({response: response, token: token});
  }
catch(err){
  console.log(err);
  res.status(500).json({err:'internal server error'});
}
})

router.post('/login',async (req,res)=>{
  try{
    const {username, password} = req.body;

    // Find the user by username
    const user = await Person.findOne({username: username});

    // If user does not exist or password does not match, return error
    if( !user || !(await user.comparePassword(password))){
        return res.status(401).json({error: 'Invalid username or password'});
    }

    // generate Token 
    const payload = {
        id: user.id,
        username: user.username
    }
    const token = generateToken(payload);

    // resturn token as response
    res.json({token,user});
  }
catch(err){
  console.log(err);
  res.status(500).json({err:'internal server error'});
}

})
router.get('/:worktype',jwtAuthMiddleware,async (req,res)=>{
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