const express = require("express");
const connectDB = require("./config/Database");
const User = require("./models/user")
const {ValidateSignUpData,ValidateLoginData} = require("./utils/validation")
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const {userAuth} = require("./middleware/middleware") 

const app = express();
const PORT = 7777;

app.use(express.json())
app.use(cookieParser())

app.post("/signup",async (req,res)=>{
  const {firstName, lastName, emailId, password} = req.body
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = new User({
    firstName,
    lastName,
    emailId,
    password: hashedPassword
  })
  try{
    ValidateSignUpData(req)
    await user.save()
    res.send("Data saved successfully")
  }
  catch(error)
  {
    res.status(400).send("Error : " + error.message)
  }
})

app.post("/login", async (req,res)=>{
  try{
    const {emailId,password} = req.body;
    ValidateLoginData(emailId)

    const user = await User.findOne({emailId})
    if(!user)
    {
      throw new Error("Invalid credentials")
    }

    const isValidPassword = await bcrypt.compare(password,user.password)
    if(isValidPassword)
    {
      const token = await jwt.sign({_id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:"7d"})
      res.cookie("token",token)
      res.send("Login successfully")
    }
    else
    {
      throw new Error("Invalid credentials")
    }
  }
  catch(err)
  {
    res.status(400).send("Something went wrong " + err)
  }
})

app.get("/profile",userAuth,async (req,res)=>{
  try{   
    const user = req.user
    res.send(user)
  }
  catch(err)
  {
    res.status(400).send("Something went wrong : " + err.message)
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