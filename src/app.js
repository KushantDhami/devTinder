const express = require("express");
const connectDB = require("./config/Database");
const cookieParser = require("cookie-parser")
const authRoute = require("./routes/auth")
const profileRoute = require("./routes/profile")
const requestRoute = require("./routes/request")
const userRoute = require("./routes/user")

const app = express();
const PORT = 7777;

app.use(express.json())
app.use(cookieParser())

app.use("/",authRoute)
app.use("/",profileRoute)
app.use("/",requestRoute)
app.use("/",userRoute)

app.get("/",(req,res)=>{
  res.send("Hello World")
})

connectDB().then(()=>{
    console.log("Database Connected Successfully ")
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
}).catch((err)=>{
  console.log("Error In connecting to database ",err)
})