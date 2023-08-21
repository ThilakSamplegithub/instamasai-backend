const mongoose=require("mongoose")
const blackListSchema=mongoose.Schema({
    blackListArr:{type:[String],default:[]}
})
 const blakcListModel= mongoose.model("blackList",blackListSchema)
 module.exports={blakcListModel}