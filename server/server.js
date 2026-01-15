const express = require('express')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mysql = require('mysql2')
const pool = require('./db.js')
const multer = require('multer')
const bcrypt = require('bcrypt')
require('dotenv').config()

const app = express()
const users = []

// Middlewares
const upload = multer({ dest: "uploads/" })
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST"],
    credentials: true
}))

const authoriseUser = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: token missing or invalid" })
    }
    const decoded = jwt.verify(token, process.env.JWT_KEY)
    const username = decoded.username
    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }

    req.user = user
    next()
}

const redirectIfAuthenticated = async (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return next()
    }
    const decoded = jwt.verify(token, process.env.JWT_KEY)
    const username = decoded.username
    const [rows] = await pool.execute(
        "SELECT username, password FROM users WHERE username = ? LIMIT 1",
        [username]
    );
    if (rows.length > 0) {
        return res.json({ redirect: 1 })
    }
    next()
}

app.get("/auth-user", authoriseUser, (req, res) => {
    res.json({ username: req.user })
})

app.get("/redirect", redirectIfAuthenticated, (req, res) => {
    res.json({})
})

app.post("/auth-signup", async (req, res) => {
    const { username, pswd } = req.body
    try {
        const [rows] = await pool.execute(
            "SELECT 1 AS `exists` FROM users WHERE username = ? LIMIT 1", [username]
        )
        if (rows.length > 0) {
            return res.json({ exists: 1 })
        }
        const hashedPswd = await bcrypt.hash(pswd, 10)
        const [result] = await pool.execute(
            "INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPswd]
        )
        const token = jwt.sign(
            { username },
            process.env.JWT_KEY,
            { expiresIn: "1h" }
        )
        res.cookie("token", token, {
            sameSite: 'lax',
            httpOnly: true,
            maxAge: 1000 * 60 * 60
        })

        res.json({})
    } catch (err) {
        res.status(422).json({ msg: err.message })
    }
})

app.post("/auth-login", (req, res) => {
    const { username, pswd } = req.body
    const userIndex = users.findIndex(u => u.username === username)
    if (!userIndex) {
        return res.status(404).json({ message: "User not found in Database" })
    }
    if (users[userIndex].pswd != pswd) {
        return res.status(401).json({ message: "Incorrect password" })
    }
    const token = jwt.sign(
        { username },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
    )
    res.cookie("token", token, {
        sameSite: 'lax',
        httpOnly: true,
        maxAge: 1000 * 60 * 60
    })
    res.send()
})

app.post("/upload-complaint", upload.single('file'), authoriseUser, (req, res) => {
    const user = req.user
    const index = users.findIndex(u => u.username === user)
    if (index === -1) {
        return res.status(404).json({ message: "User not found" })
    }
    users[index].complaints.push({
        ...req.body,
        filename: req.file.filename,
        filepath: req.file.path,
        filesize: req.file.size
    })
    console.log(users[index])
    res.send()
})

app.listen(3000, (err) => {
    if (err) {
        throw err
    }
    console.log("Server running at port 3000")
})