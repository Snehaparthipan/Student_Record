const express=require("express")
const {postUser,getuser,deleteuser,putUser}=require("../Controller/StdController")
const router=express.Router()
router.post("/users",postUser)
router.get("/all",getuser)
router.delete("/del/:id",deleteuser)
router.put("/new/:id",putUser)
module.exports=router