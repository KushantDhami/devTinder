const mongoose = require("mongoose")
const {Schema,model} = mongoose 

const connectionRequestSchema = new Schema({
     fromUserId:{
          type: Schema.Types.ObjectId,
          ref:"User",
          required:true
     },
     toUserId:{
          type: Schema.Types.ObjectId,
          ref:"User",
          required:true
     },
     status:{
          type:String,
          required:true,
          enum:
          {
               values:["ignored","interested","accepted","rejected"],
               message:'{VALUE} is not supported'
          }
     }
},
{
     timestamps:true
})

connectionRequestSchema.index({fromUserId:1,toUserId:1})

connectionRequestSchema.pre("save",function(next){
     const connectionRequest = this
     if(connectionRequest.fromUserId.equals(connectionRequest.toUserId))
     {
          throw new Error("You cannot send a connection request to yourself")
     }
     next()
})

const connectionRequestModel = new model("connectionRequest",connectionRequestSchema)

module.exports = connectionRequestModel
