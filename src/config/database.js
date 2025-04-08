const mongoose = require("mongoose")

const connectDB = async ()=>{
     await mongoose.connect("YOUR API OF MONGOATLASS")
} 

module.exports = connectDB

