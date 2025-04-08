const express = require("express");
const connectDB = require("./config/Database");
const User = require("./models/user")
const app = express();
const PORT = 7777;

app.use(express.json())
  
app.post("/signup",async (req,res)=>{
  const data = req.body
  const user = new User(data)
  try{
    await user.save()
    res.send("Data saved successfully")
  }
  catch(err)
  {
    res.status(400).send("Error in saving data "+err.message)
  }
})

app.get("/feed",async (req,res)=>{
  try{
    const users = await User.find({});
    res.send(users)
  }
  catch(err)
  {
    res.status(400).send("Something went wrong" + err)
  }
})

app.get("/user",async (req,res)=>{
  try{
    const userEmail = req.body.emailId
    const user = await User.findOne({emailId : userEmail})
    res.send(user)
  }
  catch(err)
  {
    res.status(400).send("Something went wrong" + err)
  }
})

app.delete("/user",async (req,res)=>{
  try{
    const userId = req.body.userId
    await User.findByIdAndDelete(userId)
    res.send("User Deleted Successfully ")
  }
  catch(err)
  {
    res.status(400).send("Something went wrong" + err)
  }
})

app.patch("/user/:userId",async (req,res)=>{
  try{
    const userId = req.params?.userId
    const data = req.body

    const ALLOWED_UPDATES = ["photoUrl","about","skills","password","age"]
    const isUpdateAllowed = Object.keys(data).every((key)=>ALLOWED_UPDATES.includes(key))

    if(!isUpdateAllowed)
    {
      throw new Error("Update Not Allowed")
    }

    if(data?.skills.length > 15)
    {
      throw new Error("Skills Length Exceeded")
    }

    const update = await User.findOneAndUpdate({_id:userId},data,{runValidators:true})
    res.send("Data Updated Successfully \n" + update)
  }
  catch(err)
  {
    res.status(400).send("Something went wrong" + err)
  }
})

app.get("/",(req,res)=>{
  res.send("Hello World")
})

connectDB().then(()=>{
    console.log("Database Connected Successfully ")
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
}).catch((err)=>{
  console.log("Error In connecting to database ",err)
})