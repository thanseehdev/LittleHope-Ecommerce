const express = require('express')
const cors = require('cors');
const app=express()
require('dotenv').config();
const {connectDB,getDB}=require('./config/db/db.connection')
const authRoute=require('../server/routes/userRoute/authRoutes')


app.use(express.json());

app.use(cors({
  origin: ' http://localhost:5173'
}));


async function initializeDatabase() {
    try {
        await connectDB()
        console.log('database connected successfully')
    } catch (error) {
        console.log(`error while connecting to database : ${error}`)
    }
}


app.use('/api/auth',authRoute)

app.listen(process.env.PORT||4000,async()=>{
    await initializeDatabase()
    console.log(`server is running on port ${process.env.PORT}`)
})

