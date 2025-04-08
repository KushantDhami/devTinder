const express = require("express");
const connectDB = require("./config/Database");
const User = require("./models/user")
const app = express();
const PORT = 7777;

app.use(express.json())
  
app.post("/signup",async (req,res)=>{
  console.log(req.body)
  const data = req.body
  const user = new User(data)
  try{
    await user.save()
    res.send("Data saved successfully")
  }
  catch(err)
  {
    console.log("Error in saving data ",err.message)
    res.status(400).send("Error in saving data")
  }
})

app.get("/feed",async (req,res)=>{
  try{
    const users = await User.find({});
    res.send(users)
  }
  catch(err)
  {
    res.status(400).send("Something went wrong",err)
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
    res.status(400).send("Something went wrong",err)
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
    res.status(400).send("Something went wrong",err)
  }
})

app.patch("/user",async (req,res)=>{
  try{
    const userId = req.body.userId
    const data = req.body
   
    const update = await User.findOneAndUpdate({_id:userId},data)
    res.send("Data Updated Successfully \n" + update)
  }
  catch(err)
  {
    res.status(400).send("Something went wrong",err)
  }
})

connectDB().then(()=>{
    console.log("Database Connected Successfully ")
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
}).catch((err)=>{
  console.log("Error In connecting to database ",err)
})