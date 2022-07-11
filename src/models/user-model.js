const mongoose = require('mongoose');
const {generateTrx, generateRef} = require("../utils/fakeTrx")

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true,
        unique:true
    }, 
    password: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        default: 0.00
    },
    trxAddress: {
        type: String,
        unique: true
    },
    withdrawalAddress: {
        type: String
    },
    refCode: {
        type: String,
        unique: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

UserSchema.pre("save", function(next) {
    const user = this;
    user.trxAddress = generateTrx(); 
    next();
})

UserSchema.pre("save", function(next) {
    const user = this;
    user.refCode = generateRef(); 
    next();
})

const User = mongoose.model('User', UserSchema);

module.exports = { User };
