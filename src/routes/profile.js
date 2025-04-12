const express = require("express")
const {userAuth} = require("../middleware/middleware") 
const bcrypt = require("bcrypt")
const {validateEditProfileData,validatePasswordChangeData} = require("../utils/validation")
     
const profileRoute = express.Router()


profileRoute.get("/profile/view",userAuth,async (req,res)=>{
    try{   
      const user = req.user
      res.send(user)
    }
    catch(err)
    {
      res.status(400).send("Something went wrong : " + err.message)
    }
  })

profileRoute.patch("/profile/edit",userAuth, async (req,res) =>{
    try{
        isValid = validateEditProfileData(req)
        if(!isValid)
        {
            throw new Error("Invalid Edit Request")
        }

        const LoggedInUser = req.user
        const dataToBeUpdate = req.body

        Object.keys(dataToBeUpdate).forEach((key)=> (LoggedInUser[key] = dataToBeUpdate[key]) )
       
        await LoggedInUser.save()
    
        res.json({message:`${LoggedInUser.firstName} Your Profile Updated Successfully `,data:LoggedInUser })
    }
    catch(err)
    {
        res.status(400).send("Error : " + err.message)
    }
})

profileRoute.patch("/profile/password",userAuth,async (req,res)=>{
    try{
        if(!validatePasswordChangeData(req))
        {
            throw new Error("Invalid Password Change Request")
        }
        const LoggedInUser = req.user
        const newPassword = req.body.password
        const newHashedPassword = await bcrypt.hash(newPassword,10)
        
        LoggedInUser.password = newHashedPassword
        await LoggedInUser.save()

        res.json({message:"Password Saved Successfully ",data:newPassword})
    }
    catch(err)
    {
        res.status(400).json({message:"Error In Changing Password",error:err.message})
    }
})

module.exports = profileRoute