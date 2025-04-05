const express = require("express")
const app = express()
const port = 3000

app.use((req,res)=>{
    res.send("Hello from the Server")
})

app.listen(port,()=>{
    console.log(`Server Is Listing on Port ${port}`)
})