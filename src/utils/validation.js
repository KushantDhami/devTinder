const validator = require("validator")

const validateSignUpData = (req)=>{
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

const validateLoginData = (emailId)=>{
    if(!validator.isEmail(emailId))
    {
        throw new Error("Email Is not valid")
    }
}

const validateEditProfileData = (req)=>{

    const AllowedEditFields = ["firstName",
                                "lastName",
                                "emailId",
                                "age",
                                "gender",
                                "photoUrl",
                                "about",
                                "skills"]

    const isEditAllowed = Object.keys(req.body).every((field)=>AllowedEditFields.includes(field))
    
    return isEditAllowed
}

const validatePasswordChangeData = (req)=>{
const AllowedEditFields = ["password"]
const isEditAllowed = Object.keys(req.body).every((field)=>AllowedEditFields.includes(field))

    if(!validator.isStrongPassword(req.body.password))
        {
            throw new Error("Please Enter A Strong Password")
        }
    
return isEditAllowed
}

module.exports = {
    validateSignUpData,
    validateLoginData,
    validateEditProfileData,
    validatePasswordChangeData
}
