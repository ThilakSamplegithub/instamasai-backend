const jwt=require("jsonwebtoken")
const authMiddleware=(req,res,next)=>{
    const token=req.headers.authorization
    console.log(token)
    if(token){
        jwt.verify(token,"masai",(err,decoded)=>{
            if(err){
                res.send("You are not authorized")
            }else{
                console.log(decoded,"is decoded information")
                req.userId=decoded.userId
                req.userName=decoded.user
                next()
            }
            })   
    }else{
        res.send("No token")
    }
}
module.exports={authMiddleware}