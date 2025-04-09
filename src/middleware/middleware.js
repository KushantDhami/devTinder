const jwt = require("jsonwebtoken")
const User = require("../models/user")

const adminAuth = (req,res,next)=>{
    
}

const userAuth = async (req,res,next)=>{
    try{
        const cookies = req.cookies
        const token = cookies.token 
        
        if(!token)
        {
            throw new Error("Token does not exist")
        }   

            const decodedMessage = await jwt.verify(token,process.env.JWT_SECRET_KEY)

            const user = await User.findById(decodedMessage._id)
            if(!user)
            {
                throw new Error("User not found")
            }
            req.user = user
            next()
    }
    catch(err)
    {
        res.status(400).send("Error : " + err.message)
    }

}

module.exports = {
    adminAuth,
    userAuth
}
