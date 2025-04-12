const express = require("express")
const userRoute = express.Router() 
const {userAuth} = require("../middleware/middleware")
const ConnectionRequest = require("../models/connectionRequest")
const User = require("../models/user")

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

userRoute.get("/user/request/recieved",userAuth,async (req,res)=>{
try{
    const LoggedInUser = req.user
    
    const connectionRequest = await ConnectionRequest.find({
        toUserId:LoggedInUser._id,
        status:"interested"
    }).populate("fromUserId",USER_SAFE_DATA)

    res.status(200).json({message:"Data fetched Successfully",data:connectionRequest})
}
catch(err)
{
    res.status(400).json({message:"Error : "+err.message})
}
})

userRoute.get("/user/connection",userAuth,async (req,res)=>{
    try{
       const LoggedInUser = req.user
       
       const connectionRequest = await ConnectionRequest.find({
        $or:[
            {fromUserId:LoggedInUser._id,status:"accepted"},
            {toUserId:LoggedInUser._id,status:"accepted"}
        ]
       }).populate("fromUserId",USER_SAFE_DATA).populate("toUserId",USER_SAFE_DATA)

       const data = connectionRequest.map((row)=>(
        row.fromUserId._id.toString() === LoggedInUser._id.toString() ? row.toUserId : row.fromUserId     ))
        

       res.status(200).json({message:"Data fetched Successfully",data:data})
    }
    catch(err)
    {
        res.status(400).json({message:"Error :" + err.message})
    }
})

userRoute.get("/feed",userAuth,async (req,res)=>{
    try{
        const LoggedInUser = req.user

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit
        const skip = (page - 1) * limit;


        const connectionRequest = await ConnectionRequest.find({
            $or:[
                {fromUserId:LoggedInUser._id},
                {toUserId:LoggedInUser._id}
            ]
        }).select("fromUserId toUserId")
        
        const hideUsersFromFeed = new Set()

        connectionRequest.forEach((req)=>{
            hideUsersFromFeed.add(req.fromUserId._id.toString())
            hideUsersFromFeed.add(req.toUserId._id.toString())
        })

        const users = await User.find({
            $and:[
                {_id :{ $nin: Array.from(hideUsersFromFeed)} },
                {_id : {$ne: LoggedInUser._id} }
            ]     
        }).select(USER_SAFE_DATA).skip(skip).limit(limit)
    
        res.status(200).json({message:"Data fetched Successfully", data : users})
    }
    catch(err)
    {
        res.status(400).json({message:"Error : "+ err.message})
    }
})

module.exports = userRoute