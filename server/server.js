const express = require('express')
const cors = require('cors');
const cookieParser = require('cookie-parser')
require('dotenv').config();
const app = express()
const { connectDB } = require('./config/db/db.connection')
const userRoute = require('./routes/userRoute/userRoutes')
const adminRoute = require('./routes/adminRoute/adminRoute')




app.use(cors({
  origin: 'https://littlehope.online',
  credentials: true,
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


connectDB()

app.get("/", (req, res) => {
  res.send("welcome to littlehope API")
})

app.use('/api/user', userRoute)
app.use('/api/admin', adminRoute)


app.listen(process.env.PORT, async () => {
  console.log(`server is running on port ${process.env.PORT}`)
})

