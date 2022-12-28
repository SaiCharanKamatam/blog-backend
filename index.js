const mongoose = require("mongoose")
const app = require("./app.js")

mongoose.set('strictQuery', false)
mongoose.connect("mongodb+srv://Blog:12345@cluster0.m6tjtyd.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log("db connected")
    app.listen(8001,()=> console.log("listening at 8001"))
}).catch((err)=>{
    console.log(err)
})