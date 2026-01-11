const express = require('express')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config()

const app = express()
const users = []
// Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
}))

app.post("/auth-signup", (req, res) => {
    const {username, pswd} = req.body
    users.push({username, pswd})
    const token = jwt.sign(
        {username},
        process.env.JWT_KEY,
        {expiresIn: "1h"}
    )
    res.cookie("token", token, {
        sameSite: 'lax',
        httpOnly: true,
        maxAge: 1000*60*60
    })
    res.send()
})

app.listen(3000, (err) => {
    if (err){
        throw err
    }
    console.log("Server running at port 3000")
})