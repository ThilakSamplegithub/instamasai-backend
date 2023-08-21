const express=require("express")
require('dotenv').config()
const {userRouter}=require("./Routes/user.routes")
const {connection}=require("./Config/db")
const {authMiddleware}=require("./Middlewares/auth.middleware")
const {postRouter}=require("./Routes/post.routes")
const cors=require("cors")
const app=express()
app.use(express.json())
app.use(cors())
app.get("/",(req,res)=>{
    res.send("welcome")
})
app.use("/users",userRouter)
app.use(authMiddleware)
app.use("/posts",postRouter)
app.listen(process.env.PORT,async()=>{
    try{
await connection
console.log(process.env.PORT,"port is running")
    }catch(err){
        console.log(err.message)
    }
})