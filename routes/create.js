const express = require("express")
const router = express.Router()

const { Blog } = require("../modals/schema")

router.get("/", async (req, res) => {
    const user = req.user
    try {
        const blogs = await Blog.find({  user })
        if (blogs.length != 0) {
            res.json({ blogs })

        }else{
            res.json("no posts exits")
        }
    } catch (error) {
        res.json({
            err: error.message
        })
    }
})

router.post("/create", async (req, res) => {
    const user = req.user
    const {title,description,author} = req.body
    console.log(req.body);
    try {
        await Blog.create({
            title : title,
            description : description,
            author : author,
            user : user
        })
        res.json({
            title : title,
            description : description,
            author : author,
            user : user
        })
    } catch (error) {
        res.json({
            err: error.message
        })
    }
})

module.exports = router