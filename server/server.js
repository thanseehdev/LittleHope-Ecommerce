const express = require('express')
const cors = require('cors');
const app=express()
require('dotenv').config();
const {connectDB,getDB}=require('./config/db/db.connection')
const userRoute=require('./routes/userRoute/userRoutes')
const adminRoute=require('./routes/adminRoute/adminRoute')
const cookieParser = require('cookie-parser')


app.use(express.json());
app.use(cookieParser())

app.use(cors({
  origin: ' http://localhost:5173',
  credentials: true
}));


async function initializeDatabase() {
    try {
        await connectDB()
        console.log('database connected successfully')
    } catch (error) {
        console.log(`error while connecting to database : ${error}`)
    }
}


app.use('/api/auth',userRoute)
app.use('/api/admin',adminRoute)

app.listen(process.env.PORT||4000,async()=>{
    await initializeDatabase()
    console.log(`server is running on port ${process.env.PORT}`)
})

