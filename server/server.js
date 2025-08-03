const express = require('express')
const cors = require('cors');
const app = express()
require('dotenv').config();
const { connectDB } = require('./config/db/db.connection')
const userRoute = require('./routes/userRoute/userRoutes')
const adminRoute = require('./routes/adminRoute/adminRoute')
const cookieParser = require('cookie-parser')
const session = require('express-session');
const MongoStore = require('connect-mongo');

app.use(express.json());
app.use(cookieParser())

app.use(cors({
  origin: ['https://littlehope.online'],
  credentials: true
}));


app.use(session({
  secret: process.env.SESSIONPASS,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    collectionName: 'sessions',
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
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

