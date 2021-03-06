const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 255,
        min: 6,
        unique: true
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6,
        unique: true
    },
    password: {
        type: String,
        required: true,
        max: 1202,
        min: 6,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('User', userSchema)