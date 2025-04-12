const express = require("express")
const bcrypt = require("bcrypt")
const User = require("../models/user")
const {validateSignUpData,validateLoginData} = require("../utils/validation")

const authRoute = express.Router()


authRoute.post("/signup",async (req,res)=>{
    const {firstName, lastName, emailId, password} = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword
    })
    try{
      validateSignUpData(req)
      await user.save()
      res.send("Data saved successfully")
    }
    catch(error)
    {
      res.status(400).send("Error : " + error.message)
    }
  })

authRoute.post("/login", async (req,res)=>{
  try{
    const {emailId,password} = req.body;
    validateLoginData(emailId)

    const user = await User.findOne({emailId})
    if(!user)
    {
      throw new Error("Invalid credentials")
    }

    const isValidPassword = await user.validatePassword(password)
    if(isValidPassword)
    {
      const token = await user.getJWT()
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

authRoute.post("/logout", async (req,res)=>{
    res.cookie("token",null,
        {expires:new Date(Date.now())}
    )
    res.send("Logout Successful")
})

module.exports = authRoute