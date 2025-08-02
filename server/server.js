const express = require('express')
const cors = require('cors');
const app = express()
require('dotenv').config();
const { connectDB } = require('./config/db/db.connection')
const userRoute = require('./routes/userRoute/userRoutes')
const adminRoute = require('./routes/adminRoute/adminRoute')
const cookieParser = require('cookie-parser')
const session = require('express-session');

app.use(express.json());
app.use(cookieParser())

app.use(cors({
  origin: ['https://little-hope-ecommerce-up2l.vercel.app'],
  credentials: true
}));

app.use(session({
  secret: process.env.SESSIONPASS,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 10 * 60 * 1000
  }
}));

connectDB()

app.get("/", (req, res) => {
  res.send("welcome to littlehope API")
})

app.use('/api/user', userRoute)
app.use('/api/admin', adminRoute)


app.listen(process.env.PORT, async () => {
  console.log(`server is running on port ${process.env.PORT}`)
})

