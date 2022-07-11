const mongoose = require('mongoose');
const {generateTxId} = require("../utils/fakeTrx")

const TransactionSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ["withdrawal","deposit"]
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["pending", "unconfirmed", "confirmed", "cancelled", "reversed"]
    },
    referenceId: {
        type: String,
        required: true
    },
    txHash: {
        type: String,
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "user"},
    refBonus: {
        type: Number
    },
    address: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

TransactionSchema.pre("save", function(next) {
    const tx = this;
    tx.referenceId = generateTxId(); 
    next();
})

TransactionSchema.pre("save", function(next) {
    const tx = this;
    if(tx.type === "withdrawal") return next();
    tx.refBonus = tx.amount*0.05; 
    next();
})

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = { Transaction };
