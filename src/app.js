const express = require("express");
const connectDB = require("./config/Database");
const User = require("./models/user")
const app = express();
const PORT = 7777;

app.use(express.json())

app.post("/signup",async (req,res)=>{
  console.log(req.body)
  const data = req.body
  const user = new User(data)
  try{
    await user.save()
    res.send("Data saved successfully")
  }
  catch(err)
  {
    console.log("Error in saving data ",err.message)
    res.status(400).send("Error in saving data")
  }
})




connectDB().then(()=>{
    console.log("Database Connected Successfully ")
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
}).catch((err)=>{
  console.log("Error In connecting to database ",err)
})