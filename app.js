const express = require("express")
const app = express()
const body_parser = require("body-parser")
const cors = require("cors")
const loginRouter = require("./routes/login")
app.use(cors())
app.use(body_parser.json())
const secret = "charan"
const jwt = require("jsonwebtoken")
const blogRouter = require("./routes/create")
app.use("/", loginRouter)


app.use("/blogs", (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization
        if (token) {
            jwt.verify(token, secret, function (err, decoded) {
                if (err) {
                    res.json({ err })
                } else {
                    req.user = decoded.data
                    next()
                }
            });
        }else{
            res.json("token is missing")
        }
    } else {
        res.json("not authenticated")
    }
})
app.use("/blogs",blogRouter)


module.exports = app