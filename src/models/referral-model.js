const mongoose = require('mongoose');

const ReferralSchema = new mongoose.Schema({
    refCode: {
        type: String,
    },
    referredBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "user"},
    referred: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "user"},

}, {timestamps: true});

const Referral = mongoose.model('Referral', ReferralSchema);

module.exports = { Referral };
