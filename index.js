const dotenv = require('dotenv')
dotenv.config()
const express = require('express');
const app = express();
const mongoose = require('mongoose')

//import middleware(routes)
const authRoute = require('./routes/auth')
const postRoute = require('./routes/post')


mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
    .then(() => console.log(`connected to database `))
    .catch(err => console.log(err))

app.use(express.json())
app.use('/api/user', authRoute)
app.use('/api/posts', postRoute)


const Port = process.env.PORT || 3000
app.listen(Port, () => console.log(`server is connected on Port: ${Port}`))