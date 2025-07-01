const express = require('express')
const cors = require('cors');
const app=express()
require('dotenv').config();
const {connectDB,getDB}=require('./config/db/db.connection')


app.use(express.json());

app.use(cors());

async function initializeDatabase() {
    try {
        await connectDB()
        console.log('database connected successfully')
    } catch (error) {
        console.log(`error while connecting to database : ${error}`)
    }
}



app.post('/auth/register',(req,res)=>{
    const formData=req.body
    console.log(formData)
     res.status(200).json({ msg: 'User registered successfully' });
})

app.listen(process.env.PORT||4000,async()=>{
    await initializeDatabase()
    console.log(`server is running on port ${process.env.PORT}`)
})

