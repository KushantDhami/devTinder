const mongoose = require("mongoose")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

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
               maxLength:200,
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



userSchema.methods.getJWT = async function(){
     const user = this
     const token = await jwt.sign({_id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:"7d"})
     return token;    
}

userSchema.methods.validatePassword = async function(passwordInputByUser){
     const user = this
     const hashedPassword = user.password
     const isValidPassword = await bcrypt.compare(passwordInputByUser,hashedPassword)
     return isValidPassword
}

const User = mongoose.model("User",userSchema)
module.exports = User

