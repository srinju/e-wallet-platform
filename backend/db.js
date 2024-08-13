
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin:Srinjoy%40123@cluster0.orud7zo.mongodb.net/User")

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        trim : true ,
        lowercase : true,
        minLength : 3,
        maxLength : 30
    },
    password : {
        type : String,
        required : true,
        minLength : 6
    },
    firstName : {
        type : String,
        required : true,
        trim : true,
        maxLength : 50
    },
    lastName : {
        type : String,
        required : true,
        trim : true,
        maxLength : 50
    }
});

//account schema that is in referene with the user .. every user will have an account with them 
const AccountSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId , //reference to user model
        ref : 'User',
        required : true
    },
    balance : {
        type : Number,
        required : true
    }
});

const Account = mongoose.model('Account' , AccountSchema);
const User = mongoose.model('User' , UserSchema);

module.exports = {
    User,
    Account
};