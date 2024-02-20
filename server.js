const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const GitHubStrategy = require('passport-github').Strategy
const session = require('express-session')
require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

const employeeRoutes = require('./routes/employee')

mongoose.connect(process.env.DATABASE_URI)

const db = mongoose.connection

db.on('error', console.error.bind(console, 'Connection error'))
db.once('open', () => {
    console.log('Connected to database');
})

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile)
}))

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((obj, done) => {
    done(null, obj)
})

app.use(bodyParser.json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))
    .use(passport.initialize())
    .use(passport.session())


    // .use((req, res, next) => {
    //     res.setHeader("Access-Control-Allow-Origin", "*");
    //     res.setHeader(
    //         "Access-Control-Allow-Headers",
    //         "Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization"
    //     );
    //     res.setHeader(
    //         "Access-Control-Allow-Methods",
    //         "GET,POST,PUT,DELETE,OPTIONS"
    //     );
    //     next();
    // })
    // .use(cors({ methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"] }))
    // .use(cors({ origin: "*" }))

app.use('/', require('./routes'))
app.use('/api/employees', employeeRoutes)

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server runnin' on port: ${port}`)
})