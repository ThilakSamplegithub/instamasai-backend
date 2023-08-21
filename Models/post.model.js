const mongoose=require("mongoose")
const postSchema=mongoose.Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    device:{type:String,required:true},
    no_of_comments:{type:Number,required:true},
    userId:{type:String},
    user:{type:String}
},{versionKey:false})
const postModel=mongoose.model("instaPost",postSchema)
console.log(postModel)
module.exports={postModel}