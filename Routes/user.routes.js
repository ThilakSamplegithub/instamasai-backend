const {Router}=require("express")
const userRouter=Router()
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const {userModel}=require("../Models/user.model")
userRouter.post("/register",async(req,res)=>{
try{
const {name,email,gender,is_married,password,age,city}=req.body
const user=await userModel.findOne({email})
if(!user){
bcrypt.hash(password,5,async(err,hashed)=>{
   try{
    if(err){
        res.status(200).send(`Not hashed Properly`)
    }else{
        console.log(hashed)
        const newUser=await userModel.create({email,password:hashed,gender,name,age,city,is_married})
      return res.status(200).json({newUser})
    }
   }catch(err){
    res.status(200).send({err:err.message})
   }
})
}else{
    res.send(`User already exist, please login`)
}
}catch(err){
    res.status(400).send({err:err.message})
}
})
userRouter.post("/login",async(req,res)=>{
   try{
    const {email,password}=req.body
    const user= await userModel.findOne({email})
if(user){
 bcrypt.compare(password,user.password,(err,result)=>{
    if(err){
        res.send({msg:`Wrong password`})
    }else{
        console.log(result)
      const token=jwt.sign({userId:user._id,user:user.name},"masai",{expiresIn:"7d"})
      res.send({msg:`logged in sucessfully`,token})
    }
 })
}else{
  res.status(200).send(`User doesn't exists`)
}
   }catch(err){
    res.send({err:err.message})
   }
})
module.exports={userRouter}