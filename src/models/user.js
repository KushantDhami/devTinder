const mongoose = require("mongoose")
const validator = require("validator")

const userSchema = mongoose.Schema({
          firstName : {
               type:String,
               required:true,
               maxLength:30
          },
          lastName : {
               type:String,
               maxLength:30,
               required:true
          },
          emailId : {
               type:String,
               required:true,
               unique:true,
               lowercase:true,
               trim:true,
               maxLength:50,
               validate(value){
                    if(!validator.isEmail(value))
                    {
                         throw new Error("Email is not valid " + value)
                    }
               }
          },
          password : {
               type:String,
               required:true,
               minLength:3,
               maxLength:15,
               validate(value){
                    if(!validator.isStrongPassword(value))
                    {
                         throw new Error("Enter A Strong Password " + value)
                    }
               }
          },
          age : {
               type:Number,
               min:18
          },
          gender : {
               type:String,
               lowercase:true,
               validate(value){
                    if(!["male","female","other"].includes(value))
                    {
                         throw new Error("Gender data is not valid")
                    }
               }
          },
          photoUrl : {
               type:String,
               default:"https://www.w3schools.com/w3images/avatar2.png",
               validate(value){
                    if(!validator.isURL(value))
                    {
                         throw new Error("URL is not valid " + value)
                    }
               }
          },
          about : {
               type:String,
               default:"Not much Information to show",
               maxLength:1000
          },
          skills : {
               type : [String]
          }
},{timestamps:true});

const User = mongoose.model("User",userSchema)

module.exports = User

