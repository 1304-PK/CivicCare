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
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176"],
    methods: ["GET", "POST", "PATCH"],
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

const authoriseOfficer = async (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ errMsg: "Unauthorized: token missing or invalid" })
    }
    const decoded = jwt.verify(token, process.env.JWT_KEY)
    const userId = decoded.userId
    const [rows] = await pool.execute(
        "SELECT officer_id FROM officers WHERE officer_id = ?",
        [userId]
    )
    if (!rows.length) {
        return res.status(404).json({ errMsg: "Officer not found" })
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

app.get("/api/user-dashboard-info", authoriseUser, async (req, res) => {
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
    res.json({ username, complaint: complaint[0] })
})

app.get("/redirect", redirectIfAuthenticated, (req, res) => {
    res.json({})
})

app.get("/api/get-complaint-form", authoriseUser, (req, res) => {
    res.json({})
})

app.get("/get-complaints", authoriseUser, async (req, res) => {
    try {
        const userId = req.userId
        const [complaints] = await pool.execute(
            `SELECT *
       FROM complaints
       WHERE user_id = ?
       ORDER BY created_at DESC`,
            [userId]
        )
        res.json(complaints)
    } catch (err) {
        res.status(500).json({ errMsg: err.message })
    }

})

//--------

app.get("/api/officer-dashboard-info", authoriseOfficer, async (req, res) => {
    try{
        const userId = req.userId
    const [rows_] = await pool.execute(
        "SELECT city, state FROM officers WHERE officer_id = ?",
        [userId]
    )
    const city = rows_[0].city, state = rows_[0].state
    const [pending_] = await pool.execute(
        "SELECT complaint_id FROM complaints where city = ? AND state = ? AND status = ?",
        [city, state, "pending"]
    )
    const [resolved_] = await pool.execute(
        "SELECT complaint_id FROM complaints where city = ? AND state = ? AND status = ?",
        [city, state, "resolved"]
    )

    const pendingComplaints = pending_.length, resolvedComplaints = resolved_.length, totalComplaints = pending_.length + resolved_.length

    const [recent_] = await pool.execute(
        "SELECT complaint_id, subject, address, city, state, created_at FROM complaints where city = ? AND state = ? ORDER BY created_at LIMIT 3",
        [city, state]
    )
    res.json({
        stats: {
            pendingComplaints, resolvedComplaints, totalComplaints
        },
        recentComplaints: recent_,
        location: {
            city, state
        }
    })
} catch(err) {
    res.status(500).json({errMsg: err.message})
}
})

app.get("/api/get-area-complaints", authoriseOfficer, async (req, res) => {
    try    {
        const userId = req.userId
    const [rows] = await pool.execute(
        "SELECT city, state FROM officers WHERE officer_id = ?",
        [userId]
    )
    const city = rows[0].city, state = rows[0].state
    const [complaints] = await pool.execute(
        "SELECT complaint_id, subject, description, address, city, state, status, file_path FROM complaints WHERE city = ? AND state = ?",
        [city, state]
    )
    res.json({complaints: complaints})
} catch (err){
    res.status(500).json({errMsg: err.message})
}
})

app.get("/api/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "lax"
    })
    res.json({})
})

// POST REQUESTS

app.post("/auth-signup", async (req, res) => {
    const { username, pswd } = req.body
    try {
        const [rows] = await pool.execute(
            "SELECT 1 AS `exists` FROM users WHERE username = ? LIMIT 1", [username]
        )
        if (rows.length > 0) {
            return res.status(409).json({errMsg: "User already exists, Log In"})
        }
        const hashedPswd = await bcrypt.hash(pswd, 10)
        const [result] = await pool.execute(
            "INSERT INTO users (username, password) VALUES (?, ?)", 
            [username, hashedPswd]
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


app.post("/auth-login", async (req, res) => {
    try {
        const { role, username, pswd } = req.body
        let userId = null;
        if (role === 'citizen') {
            const [rows] = await pool.execute(
                "SELECT password, id FROM users WHERE username = ?",
                [username]
            )
            if (rows.length === 0) {
                return res.status(401).json({ errMsg: "Invalid Credentials" })
            }
            const isMatch = await bcrypt.compare(pswd, rows[0].password)
            if (!isMatch) {
                return res.status(401).json({ errMsg: "Invalid Credentials" })
            }
            userId = rows[0].id
        }
        else if (role === 'officer') {
            const [rows] = await pool.execute(
                "SELECT password, officer_id FROM officers WHERE username = ?",
                [username]
            )
            if (rows.length === 0) {
                return res.status(401).json({ errMsg: "Invalid Credentials" })
            }
            const isMatch = (pswd === rows[0].password)
            if (!isMatch) {
                return res.status(401).json({ errMsg: "Invalid Credentials" })
            }
            userId = rows[0].officer_id
        }
        const token = jwt.sign(
            { userId },
            process.env.JWT_KEY,
            { expiresIn: "1h" }
        )
        res.cookie("token", token, {
            sameSite: 'lax',
            httpOnly: true,
            maxAge: 1000 * 60 * 60
        })
        res.json({ role: role })
    } catch (err) {
        res.status(500).json({ errMsg: err.message })
    }
})

app.post("/upload-complaint", authoriseUser, upload.single('file'), async (req, res) => {
    try {
        const userId = req.userId
        const { subject, description, address, state, city } = req.body
        const { path } = req.file

        const [result] = await pool.execute(
            `INSERT INTO complaints 
            (user_id, subject, description, address, city, state, file_path)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [userId, subject.toLowerCase(), description.toLowerCase(), address.toLowerCase(), city.toLowerCase(), state.toLowerCase(), path]
        )
        res.status(201).json({})
    } catch (err) {
        res.status(500).json({ errMsg: err.message })
    }
})

// PATCH REQUESTS

app.patch("/api/update-complaint-status", authoriseOfficer, async (req, res) => {
    try{
        const {complaint_id, newStatus} = req.body
        const [result] = await pool.execute(
            "UPDATE complaints SET status = ? WHERE complaint_id = ?",
            [newStatus, complaint_id]
        )
        if (result.affectedRows === 0){
            return res.status(404).json({errMsg: "Complaint not found"})
        }
        const [getStatus] = await pool.execute(
            "SELECT status FROM complaints WHERE complaint_id = ?",
            [complaint_id]
        )
        const updatedStatus = getStatus[0].status
        res.json({updatedStatus: updatedStatus, complaintId: complaint_id})
    } catch (err){
        res.status(500).json({errMsg: err.message})
    }
})

app.listen(3000, (err) => {
    if (err) {
        throw err
    }
    console.log("Server running at port 3000")
})