const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId
const userSchema = mongoose.Schema({
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true
    }
})

const User = mongoose.model("User",userSchema)

const blogSchema = mongoose.Schema({
    title: {
        type : String,
        unique : true,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    author : {
        type : String
    },
    user : {
       type : ObjectId,
       ref : "User"
    }

})

const Blog = mongoose.model("Blogs",blogSchema)


module.exports = {User,Blog}