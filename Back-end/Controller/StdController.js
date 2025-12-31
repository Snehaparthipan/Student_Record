const Student =require("../Model/Student")

const postUser = async (req, res) => {
  try {
    const { name, grade, subject } = req.body;

    console.log("BODY:", req.body); // DEBUG

    if (!name || !grade || !subject) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const newUser = await Student.save({ name, grade, subject });

    res.status(201).json({
      message: "User created",
      data: newUser
    });
  } catch (error) {
    console.error("ERROR:", error.message);
    res.status(500).json({
      message: error.message
    });
  }
};
const getuser=async(req,res)=>{
    try{
        const getuser=await Student.find()
        res.status(200).json({message:"user get from DB",data:getuser})
    }
    catch(error){
        console.log(error)
        res.status(500).json({messsage:"error in getting user"})
    }
}
const putUser=async(req,res)=>{
    try{
        const putUser=await Student.findByIdAndUpdate(req.params.id,
            req.body,
            {new:true}
        )
        res.status(200).json({message:"data updated",data:putUser})
    }
    catch(error){
        console.log(error)
    }
}
const  deleteuser=async(req,res)=>{
    try{
        const deleteuser=await Student.findByIdAndDelete(req.params.id,
            req.body,
            {new:true}
        )
        res.status(200).json({message:"user get from DB",data:deleteuser})
    }
    catch(error){
        console.log(error)
    }
}

module.exports = {postUser,getuser,deleteuser,putUser}