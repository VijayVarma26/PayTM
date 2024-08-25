const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://vijayvarmade:ZwVC2MeVvJ9ijv6j@cluster0.2ex95ch.mongodb.net/todos")

const userSchema = mongoose.Schema({
    username : {
        type:String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: 3,
        maxlength: 20
    },
    password : {
        type:String,
        required: true,
        minlength: 6,
    },
    fistName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    }
})

const User = mongoose.model('User', userSchema)

model.exports = {
    User
}