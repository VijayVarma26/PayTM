const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://vijayvarmade:ZwVC2MeVvJ9ijv6j@cluster0.2ex95ch.mongodb.net/paytm")

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
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});


const Account = mongoose.model('Account', accountSchema);
const User = mongoose.model('User', userSchema)

module.exports = {
    User,
    Account
}