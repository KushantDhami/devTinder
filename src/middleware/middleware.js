const adminAuth = (req,res,next)=>{
    console.log("Middleware for admin authorization")
    const token = "xyz"
    const auth = token === "xyz"
    if(!auth) 
    {
        res.status(404).send("you are not authorized")
    }
    else
    {
        next()
    }
}

const userAuth = (req,res,next)=>{
    console.log("Middleware for User authorization")
    const token = "xyz"
    const auth = token === "xyz"
    if(!auth) 
    {
        res.status(404).send("you are not authorized")
    }
    else
    {
        next()
    }
}

module.exports = {
    adminAuth,
    userAuth
}
