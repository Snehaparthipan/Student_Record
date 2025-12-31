const connectDB=require("./Config/db")
const express=require("express")
const cors=require("cors")
const userroutes=require("./Router/Router")
const app=express()
const PORT=5000
app.use(cors())
app.use(express.json())
connectDB()
app.use('/api',userroutes)
app.listen(PORT,()=>{
    console.log("server run")
}
)