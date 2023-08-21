const { Router } = require("express");
const postRouter = Router();
const blakcListModel=require("../Models/blackList.model")
const postModel = require("../Models/post.model.js");
// console.log(postModel,"is functionn or not")
postRouter.post(`/add`, async (req, res) => {
  try {
    const { title, body, device, no_of_comments } = req.body;
    console.log(postModel)
    req.body.userId = req.userId;
    req.body.user = req.userName;
    console.log(req.body, "is req.body");
    const post = await postModel.create({
      title,
      body,
      device,
      no_of_comments,
      user: req.userName,
      userId: req.userId,
    });
    return res.status(200).json({ msg:post });
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});
postRouter.get("/",async(req,res)=>{
    try{
       const userPost= await postModel.find()
       console.log(userPost)
       return res.json({msg:userPost})
    }catch(err){
        res.send({err:err.message})
    }
})
postRouter.patch("/update/:id",async(req,res)=>{
    try{
        const {id}=req.params
const user=await findOne({_id:id})
     if(String(user.userId)===req.userId){
      const updatedPost=await postModel.updateOne({_id:id},{$set:req.body})
      res.status(200).send(`updated successfully`)
     }else{
        res.send(`you are not authorized to update`)
     }
    }catch(err){
        res.send({err:err.message})
    }
})
postRouter.delete("/delete/:id",async(req,res)=>{
    try{
        const {id}=req.params
const user=await findOne({_id:id})
     if(String(user.userId)===req.userId){
      const deletedPost=await postModel.deleteOne({_id:id})
      console.log(deletedPost)
      res.status(200).send(`deleted successfully`)
     }else{
        res.send(`you are not authorized to update`)
     }
    }catch(err){
        res.send({err:err.message})
    }
})
postRouter.get("/logout",async(req,res)=>{
    const token=req.headers.authorization
    console.log(blakcListModel)
//    await blakcListModel.updateOne()
    res.send("ok")
})
module.exports = { postRouter };
