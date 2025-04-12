const express = require("express")
const {userAuth} = require("../middleware/middleware")
const connectionRequest = require("../models/connectionRequest")
const requestRoute = express.Router()
const User = require("../models/user")

requestRoute.post("/request/send/:status/:toUserId",userAuth, async (req,res)=>{
   try{
       const fromUserId = req.user 
       const toUserId = req.params.toUserId 
       const status = req.params.status
       
        const allowedStatus = ["ignored","interested"]
        if(!allowedStatus.includes(status))
        {
                throw new Error("It's not a valid status")
        }

        const toUser = await User.findById({_id:toUserId})
        if(!toUser)
        {
            return res.status(400).json(
                {message:"User Not Found"})
        }

       const existingRequest = await connectionRequest.findOne({
             $or:[
                 {fromUserId,toUserId},
                 {fromUserId:toUserId,toUserId:fromUserId}
                ] 
       })
       if(existingRequest)
       {
           return res.status(400).json(
            {message:"Connection Request Already Sent or Already Exists"})
       }

       const connection = new connectionRequest({
        fromUserId,
        toUserId,
        status
       })

       const data = await connection.save()

       res.json({message:`${req.user.firstName} has choose to ${status} ${toUser.firstName}`,data})
    }
    catch(error)
    {
        res.status(400).json({message:error.message,status:400})
    }
})

requestRoute.post("/request/review/:status/:requestId",userAuth,async (req,res)=>{
    try{
        const LoggedInUser = req.user 
        const {status,requestId} = req.params
        
        const allowedStatus = ["accepted","rejected"]
        if(!allowedStatus.includes(status))
        {
            return res.status(400).json({message:"status not allowed"})
        }


        const connectionRequestData = await connectionRequest.findOne(
            {   _id:requestId,
                toUserId:LoggedInUser._id,
                status:"interested"
            })
            console.log(connectionRequestData)
        if(!connectionRequestData)
        {
            return res.status(404).json({message:"Connection Request not found"})
        }

        connectionRequestData.status = status
        const data = await connectionRequestData.save()

        res.json({message:`Connection Request ${status}`,data})

    }
    catch(err)
    {
        res.status(400).json({message:`Error : ${err.message}`})
    }
})

module.exports = requestRoute