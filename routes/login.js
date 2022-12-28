const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const secret = "charan"
const { User } = require("../modals/schema")
const jwt = require("jsonwebtoken")

router.post("/signup", async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(req.body);
        const user = await User.find({ email })
        if (user.length == 0) {

            bcrypt.hash(password, 10, async (err, hash) => {
                if (err) {
                    return res.json(err)
                } else {
                    await User.create({
                        email: email,
                        password: hash
                    })
                }
                res.json({
                    email: email,
                    password: hash
                })
            });

        } else {
            res.json({
                message: "user already exists"
            })
        }
    } catch (error) {
        res.json({
            err: error.message
        })
    }
})


router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        
        if (user.length != 0) {

            bcrypt.compare(password, user.password, function (err, result) {
                // result == true
                if (err) {
                    return res.json( "aaaa" )
                } else {
                    if (result) {
                        const token = jwt.sign({
                            exp: Math.floor(Date.now() / 1000) + (60 * 60),
                            data: user._id
                        }, secret);

                        res.json({
                            token
                        })

                    } else {
                        res.json({
                            message: "password invalid"
                        })
                    }
                }
            });


        } else {
            res.json({
                message: "user doesn't exists"
            })
        }
    } catch (error) {
        res.json({
            err: error.message
        })
    }

})




module.exports = router