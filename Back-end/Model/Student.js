const mongoose=require("mongoose")
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  grade: { type: String, required: true },
  subject: { type: String, required: true }
},
{
    timestamps:true
});

module.exports=mongoose.model('Student',userSchema)