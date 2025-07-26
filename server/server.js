const express = require('express')
const cors = require('cors');
const app=express()
require('dotenv').config();
const {connectDB,getDB}=require('./config/db/db.connection')
const userRoute=require('./routes/userRoute/userRoutes')
const adminRoute=require('./routes/adminRoute/adminRoute')
const cookieParser = require('cookie-parser')
const session = require('express-session');


app.use(express.json());
app.use(cookieParser())



app.use(cors({
  origin: ['http://localhost:5173', 'http://172.20.10.2:5173'],
  credentials: true
}));


app.use(session({
  secret: process.env.SESSIONPASS,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production', // set true only if using HTTPS
    maxAge: 10 * 60 * 1000 // e.g., 10 minutes session expiration
  }
}));

async function initializeDatabase() {
    try {
        await connectDB()
        console.log('database connected successfully')
    } catch (error) {
        console.log(`error while connecting to database : ${error}`)
    }
}


app.use('/api/user',userRoute)
app.use('/api/admin',adminRoute)

app.listen(process.env.PORT||4000,'0.0.0.0',async()=>{
    await initializeDatabase()
    console.log(`server is running on port ${process.env.PORT}`)
})

