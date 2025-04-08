const mongoose = require("mongoose")

const connectDB = async ()=>{
     await mongoose.connect("mongodb+srv://kushantdhami:devtinder@cluster0.7ieygp7.mongodb.net/devtinder")
} 

module.exports = connectDB

