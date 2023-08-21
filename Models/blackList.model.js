const mongoose=require("mongoose")
const blackListSchema=mongoose.Schema({
    blackListArr:{type:[String],default:[]}
})
 const blackListModel= mongoose.model("blackList",blackListSchema)
 module.exports={blackListModel}