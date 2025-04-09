const validator = require("validator")

const ValidateSignUpData = (req)=>{
    const {firstName,lastName,emailId,password} = req.body;
    if(!firstName || !lastName) 
    {
        throw new Error("Please Enter Name First")
    }
    else if(!validator.isEmail(emailId))
    {
        throw new Error("Email Is not valid")
    }
    else if(!validator.isStrongPassword(password))
    {
        throw new Error("Please Enter A Strong Password")
    }
}

const ValidateLoginData = (emailId)=>{
    if(!validator.isEmail(emailId))
    {
        throw new Error("Email Is not valid")
    }
}


module.exports = {
    ValidateSignUpData,
    ValidateLoginData
}
