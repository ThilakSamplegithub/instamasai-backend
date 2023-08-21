const jwt=require("jsonwebtoken")
const { blackListModel } = require("../Models/blackList.model")
const authMiddleware=async(req,res,next)=>{
    try{
        const token=req.headers.authorization
      const blackListArr= await blackListModel.find()
        if(token){
            if(blackListArr.includes(token)){
                res.send(`please login again`)
            }else{
                jwt.verify(token,"masai",(err,decoded)=>{
                    if(err){
                        res.send(`please login again`)
                    }else{
                        console.log(decoded)
                        req.userId=decoded.userId
                        req.userName=decoded.user
                        next()
                    }
                })
            }
        }
    }catch(err){
        res.send(err.message)
    }
        const token=req.headers.authorization
        console.log(token)
       const blackListArr=  await blackListModel.find()

}
module.exports={authMiddleware}