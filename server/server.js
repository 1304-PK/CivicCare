const express = require('express')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const pool = require('./db.js')
const multer = require('multer')
const bcrypt = require('bcrypt')
require('dotenv').config()

const app = express()

// Utility Functions

const Capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
}

// Middlewares

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        let filename = `${Date.now() + '-' + file.originalname.replace(/\s+/g, '_')}`
        cb(null, filename)
    }
})

const upload = multer({
    storage: storage                              
})
app.use(express.json())
app.use(cookieParser())
app.use('/uploads', express.static("uploads"))
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"],
    methods: ["GET", "POST"],
    credentials: true
}))

const authoriseUser = async (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ errMsg: "Unauthorized: token missing or invalid" })
    }
    const decoded = jwt.verify(token, process.env.JWT_KEY)
    const userId = decoded.userId
    const [rows] = await pool.execute(
        "SELECT id FROM users WHERE id = ?",
        [userId]
    )
    if (!rows.length) {
        return res.status(404).json({ errMsg: "User not found" })
    }              
    req.userId = userId
    next()
}

const redirectIfAuthenticated = async (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return next()
    }
    const decoded = jwt.verify(token, process.env.JWT_KEY)
    const userId = decoded.userId
    const [rows] = await pool.execute(
        "SELECT * FROM users WHERE id = ? LIMIT 1",
        [userId]
    );
    if (rows.length > 0) {
        return res.json({ redirect: 1 })
    }
    next()
}

// GET REQUESTS

app.get("/api/dashboard-info", authoriseUser, async (req, res) => {
    const userId = req.userId
    const [rows] = await pool.execute(
        "SELECT username FROM users WHERE id = ?",
        [userId]
    )
    const [complaint] = await pool.execute(
        "SELECT * FROM complaints WHERE user_id = ? ORDER BY created_at DESC LIMIT 1",
        [userId]
    )
    const username = rows[0].username
    res.json({username, complaint: complaint[0]})
})

app.get("/redirect", redirectIfAuthenticated, (req, res) => {
    res.json({})
})

app.get("/api/get-complaint-form", authoriseUser, (req, res) => {
    res.json({})
})

app.get("/get-complaints", authoriseUser, async(req, res) => {
    try{
        const userId = req.userId
    const [complaints] = await pool.execute(
      `SELECT *
       FROM complaints
       WHERE user_id = ?
       ORDER BY created_at DESC`,
      [userId]
    )
    res.json(complaints)
} catch(err){
    res.status(500).json({errMsg: err.message})
}
    
})

// POST REQUESTS

app.post("/auth-signup", async (req, res) => {
    const { username, pswd } = req.body
    const username_ = Capitalize(username)
    try {
        const [rows] = await pool.execute(
            "SELECT 1 AS `exists` FROM users WHERE username = ? LIMIT 1", [username_]
        )
        if (rows.length > 0) {
            return res.json({ exists: 1 })
        }
        const hashedPswd = await bcrypt.hash(pswd, 10)
        const [result] = await pool.execute(
            "INSERT INTO users (username, password) VALUES (?, ?)", [username_, hashedPswd], (err, result) => {
                if (err) throw err
            }
        )
        const token = jwt.sign(
            { userId: result.insertId },
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

app.post("/upload-complaint", authoriseUser, upload.single('file'), async (req, res) => {
    try{
        const userId = req.userId
        console.log(req.file)
        const {subject, description, address, state, city} = req.body
        const {path} = req.file

        const [result] = await pool.execute(
            `INSERT INTO complaints 
            (user_id, subject, description, address, city, state, file_path)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [userId, subject, description, address, city, state, path]
        )
        res.status(201).json({})
    } catch(err){
        res.status(500).json({errMsg: err.message})
    }
})

app.listen(3000, (err) => {
    if (err) {
        throw err
    }
    console.log("Server running at port 3000")
})